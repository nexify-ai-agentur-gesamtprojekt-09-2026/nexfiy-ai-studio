CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL CHECK (kind IN ('contact', 'partner', 'appointment', 'voucher')),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 160),
  company text NOT NULL DEFAULT '' CHECK (char_length(company) <= 120),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 4000),
  source_path text NOT NULL DEFAULT '' CHECK (char_length(source_path) <= 200),
  status text NOT NULL DEFAULT 'neu' CHECK (status IN ('neu', 'in_bearbeitung', 'erledigt', 'archiviert')),
  slack_notified_at timestamptz,
  slack_error text
);
GRANT SELECT ON public.inquiries TO authenticated;
GRANT UPDATE (status, updated_at) ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update inquiry status" ON public.inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE INDEX inquiries_created_at_idx ON public.inquiries (created_at DESC);

ALTER TABLE public.teileklar_part_inquiries
  ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN slack_notified_at timestamptz,
  ADD COLUMN slack_error text;
ALTER TABLE public.teileklar_part_inquiries
  ADD CONSTRAINT teileklar_part_inquiries_status_check CHECK (status IN ('neu', 'in_bearbeitung', 'erledigt', 'archiviert'));
GRANT SELECT ON public.teileklar_part_inquiries TO authenticated;
GRANT UPDATE (status, updated_at) ON public.teileklar_part_inquiries TO authenticated;
CREATE POLICY "Admins read part inquiries" ON public.teileklar_part_inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update part inquiry status" ON public.teileklar_part_inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read part inquiry attachments" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'teileklar-attachments' AND public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.teileklar_products (
  id text PRIMARY KEY CHECK (char_length(id) BETWEEN 1 AND 80),
  name text NOT NULL,
  brand text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  price_value numeric(10, 2),
  ean text NOT NULL DEFAULT '',
  oe_number text NOT NULL DEFAULT '',
  condition text NOT NULL DEFAULT '',
  image_src text NOT NULL DEFAULT '',
  image_alt text NOT NULL DEFAULT '',
  specs jsonb NOT NULL DEFAULT '[]'::jsonb,
  status_label text NOT NULL DEFAULT '',
  delivery_note text NOT NULL DEFAULT '',
  stock integer NOT NULL DEFAULT 0,
  source text NOT NULL DEFAULT '',
  feed_created_at timestamptz,
  synced_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz
);
GRANT SELECT ON public.teileklar_products TO anon, authenticated;
GRANT ALL ON public.teileklar_products TO service_role;
ALTER TABLE public.teileklar_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active catalogue" ON public.teileklar_products FOR SELECT TO anon, authenticated USING (archived_at IS NULL);
CREATE INDEX teileklar_products_category_idx ON public.teileklar_products (category) WHERE archived_at IS NULL;
CREATE INDEX teileklar_products_name_idx ON public.teileklar_products (name) WHERE archived_at IS NULL;

CREATE OR REPLACE VIEW public.teileklar_categories WITH (security_invoker = true) AS
  SELECT category, count(*)::int AS product_count
  FROM public.teileklar_products
  WHERE archived_at IS NULL AND category <> ''
  GROUP BY category;
GRANT SELECT ON public.teileklar_categories TO anon, authenticated, service_role;