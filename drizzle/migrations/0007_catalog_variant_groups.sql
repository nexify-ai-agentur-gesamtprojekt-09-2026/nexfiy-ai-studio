-- Ausführungen desselben Artikels (gleicher Name, gleiche Marke) werden im Katalog als ein Eintrag gezeigt.
-- Der Gruppenschlüssel wird von der Datenbank berechnet, damit Abgleich und Anzeige nie auseinanderlaufen.
ALTER TABLE public.teileklar_products
  ADD COLUMN variant_group text GENERATED ALWAYS AS (
    lower(regexp_replace(btrim(name), '\s+', ' ', 'g')) || '|' || lower(regexp_replace(btrim(brand), '\s+', ' ', 'g'))
  ) STORED;

CREATE INDEX teileklar_products_variant_group_idx
  ON public.teileklar_products (variant_group, has_image DESC, price_value, id)
  WHERE archived_at IS NULL;

-- Ein Eintrag je Artikelgruppe; Vertreter ist die Ausführung mit Foto, Bestand und niedrigstem Preis.
-- security_invoker: es gelten die Leserechte von teileklar_products (nur aktive Artikel).
CREATE VIEW public.teileklar_product_groups WITH (security_invoker = true) AS
SELECT DISTINCT ON (p.variant_group)
  p.variant_group,
  p.id,
  p.name,
  p.brand,
  p.category,
  p.price_value,
  p.image_path,
  p.image_alt,
  p.has_image,
  p.stock,
  p.delivery_note,
  g.variant_count,
  g.min_price,
  g.max_price,
  g.in_stock,
  g.search_keys
FROM public.teileklar_products p
JOIN (
  SELECT
    variant_group,
    count(*)::integer AS variant_count,
    min(price_value) AS min_price,
    max(price_value) AS max_price,
    bool_or(stock > 0) AS in_stock,
    string_agg(id || ' ' || ean || ' ' || oe_number, ' ') AS search_keys
  FROM public.teileklar_products
  WHERE archived_at IS NULL
  GROUP BY variant_group
) g USING (variant_group)
WHERE p.archived_at IS NULL
ORDER BY p.variant_group, p.has_image DESC, (p.stock > 0) DESC, p.price_value ASC NULLS LAST, p.id;

GRANT SELECT ON public.teileklar_product_groups TO anon, authenticated;
GRANT ALL ON public.teileklar_product_groups TO service_role;

-- Kategorien zählen Artikel, nicht einzelne Ausführungen.
CREATE OR REPLACE VIEW public.teileklar_categories WITH (security_invoker = true) AS
SELECT category, (count(DISTINCT variant_group))::integer AS product_count
FROM public.teileklar_products
WHERE archived_at IS NULL AND category <> ''
GROUP BY category;