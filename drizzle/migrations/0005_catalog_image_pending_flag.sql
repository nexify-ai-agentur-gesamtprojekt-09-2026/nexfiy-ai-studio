DROP INDEX IF EXISTS public.teileklar_products_image_pending_idx;
ALTER TABLE public.teileklar_products
  ADD COLUMN image_pending boolean GENERATED ALWAYS AS (image_checked_src <> image_src) STORED;
CREATE INDEX teileklar_products_image_pending_idx ON public.teileklar_products (id) WHERE image_pending AND archived_at IS NULL;