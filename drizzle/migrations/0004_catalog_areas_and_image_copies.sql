ALTER TABLE public.teileklar_products
  ADD COLUMN source_category text NOT NULL DEFAULT '',
  ADD COLUMN image_path text NOT NULL DEFAULT '',
  ADD COLUMN image_checked_src text NOT NULL DEFAULT '',
  ADD COLUMN image_checked_at timestamptz,
  ADD COLUMN has_image boolean GENERATED ALWAYS AS (image_path <> '') STORED;

UPDATE public.teileklar_products SET source_category = category WHERE source_category = '';

CREATE INDEX teileklar_products_listing_idx ON public.teileklar_products (has_image DESC, name, id) WHERE archived_at IS NULL;
CREATE INDEX teileklar_products_image_pending_idx ON public.teileklar_products (id) WHERE image_checked_src <> image_src;