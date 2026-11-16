REVOKE ALL ON public.inquiries FROM anon, authenticated;
GRANT SELECT ON public.inquiries TO authenticated;
GRANT UPDATE (status, updated_at) ON public.inquiries TO authenticated;

REVOKE ALL ON public.teileklar_part_inquiries FROM anon, authenticated;
GRANT SELECT ON public.teileklar_part_inquiries TO authenticated;
GRANT UPDATE (status, updated_at) ON public.teileklar_part_inquiries TO authenticated;

REVOKE ALL ON public.user_roles FROM anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;

REVOKE ALL ON public.teileklar_products FROM anon, authenticated;
GRANT SELECT ON public.teileklar_products TO anon, authenticated;

REVOKE ALL ON public.teileklar_categories FROM anon, authenticated;
GRANT SELECT ON public.teileklar_categories TO anon, authenticated;