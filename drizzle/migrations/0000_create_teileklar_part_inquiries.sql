CREATE TABLE public.teileklar_part_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  vehicle text NOT NULL,
  part text NOT NULL,
  message text NOT NULL DEFAULT '',
  attachment_path text,
  attachment_name text,
  attachment_type text,
  attachment_size integer,
  status text NOT NULL DEFAULT 'neu'
);
GRANT ALL ON public.teileklar_part_inquiries TO service_role;
ALTER TABLE public.teileklar_part_inquiries ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.teileklar_part_inquiries IS 'Written only by the validated server function; no anon/authenticated access.';