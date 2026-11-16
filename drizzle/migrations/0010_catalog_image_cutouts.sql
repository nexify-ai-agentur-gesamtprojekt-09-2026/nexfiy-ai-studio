-- Freigestellte Fassung eines Produktfotos (durchsichtiger Grund) zusätzlich zum Original.
-- Sie gilt nur, solange sie aus dem aktuell gespeicherten Original erzeugt wurde (image_cutout_of = image_path);
-- ändert der Abgleich das Foto, wird automatisch wieder das Original gezeigt.
ALTER TABLE public.teileklar_products
  ADD COLUMN image_cutout_path text NOT NULL DEFAULT '',
  ADD COLUMN image_cutout_of text NOT NULL DEFAULT '';

CREATE OR REPLACE VIEW public.teileklar_product_groups WITH (security_invoker = true) AS
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
  g.search_keys,
  CASE WHEN p.image_cutout_path <> '' AND p.image_cutout_of = p.image_path THEN p.image_cutout_path ELSE '' END AS image_cutout
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