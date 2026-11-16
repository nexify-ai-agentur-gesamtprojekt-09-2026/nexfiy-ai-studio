-- Eine einzige Regel für den Artikelnamen ohne Größenangabe; Gruppenschlüssel und Anzeige nutzen sie gemeinsam.
-- Erkannt am Namensende: S … XXXL, 2XL … 6XL, ein- bis zweistellige Größen (42, 9,5, 39-42), „Größe 46“ und Kindergrößen („Kinder 140“).
-- Litermengen („5 L“) bleiben unberührt, weil vor der Angabe eine Ziffer steht.
CREATE FUNCTION public.teileklar_base_name(_name text)
RETURNS text
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
SET search_path = pg_catalog
AS $$
  SELECT regexp_replace(
    regexp_replace(btrim(_name), '\s+', ' ', 'g'),
    '(?<![0-9]) (Größe |Kinder )?(XXS|XS|S|M|L|XL|XXL|XXXL|[2-6]XL|[0-9]{1,2}([,.][05])?|[0-9]{1,2}-[0-9]{1,2})$|(?<![0-9]) Kinder [0-9]{3}$',
    ''
  )
$$;

DROP VIEW public.teileklar_product_groups;
DROP VIEW public.teileklar_categories;
ALTER TABLE public.teileklar_products DROP COLUMN variant_group;
ALTER TABLE public.teileklar_products
  ADD COLUMN variant_group text GENERATED ALWAYS AS (
    lower(public.teileklar_base_name(name)) || '|' || lower(regexp_replace(btrim(brand), '\s+', ' ', 'g'))
  ) STORED;

CREATE INDEX teileklar_products_variant_group_idx
  ON public.teileklar_products (variant_group, has_image DESC, price_value, id)
  WHERE archived_at IS NULL;

CREATE VIEW public.teileklar_product_groups WITH (security_invoker = true) AS
SELECT DISTINCT ON (p.variant_group)
  p.variant_group,
  p.id,
  CASE WHEN g.name_count > 1 THEN public.teileklar_base_name(p.name) ELSE p.name END AS name,
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
    count(DISTINCT name)::integer AS name_count,
    min(price_value) AS min_price,
    max(price_value) AS max_price,
    bool_or(stock > 0) AS in_stock,
    string_agg(id || ' ' || ean || ' ' || oe_number || ' ' || name, ' ') AS search_keys
  FROM public.teileklar_products
  WHERE archived_at IS NULL
  GROUP BY variant_group
) g USING (variant_group)
WHERE p.archived_at IS NULL
ORDER BY p.variant_group, p.has_image DESC, (p.stock > 0) DESC, p.price_value ASC NULLS LAST, p.id;

CREATE VIEW public.teileklar_categories WITH (security_invoker = true) AS
SELECT category, (count(DISTINCT variant_group))::integer AS product_count
FROM public.teileklar_products
WHERE archived_at IS NULL AND category <> ''
GROUP BY category;

GRANT SELECT ON public.teileklar_product_groups TO anon, authenticated;
GRANT ALL ON public.teileklar_product_groups TO service_role;
GRANT SELECT ON public.teileklar_categories TO anon, authenticated;
GRANT ALL ON public.teileklar_categories TO service_role;