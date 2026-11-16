ALTER TABLE public.inquiries ADD COLUMN consent_version text, ADD COLUMN consent_at timestamptz;
ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_consent_evidence_check CHECK ((consent_version IS NULL AND consent_at IS NULL) OR (consent_version IS NOT NULL AND consent_at IS NOT NULL AND char_length(consent_version) BETWEEN 1 AND 100));
CREATE INDEX inquiries_kind_created_at_idx ON public.inquiries (kind, created_at);
CREATE INDEX inquiries_email_created_at_idx ON public.inquiries (email, created_at);
CREATE INDEX teileklar_inquiries_created_at_idx ON public.teileklar_part_inquiries (created_at);

CREATE TABLE public.inquiry_guard_secret (singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton), salt text NOT NULL CHECK (char_length(salt) = 64));
REVOKE ALL ON public.inquiry_guard_secret FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.inquiry_guard_secret TO service_role;
ALTER TABLE public.inquiry_guard_secret ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.inquiry_rate_guards (ip_hash text PRIMARY KEY CHECK (ip_hash ~ '^[0-9a-f]{64}$'), accepted_at timestamptz[] NOT NULL DEFAULT '{}'::timestamptz[], CONSTRAINT inquiry_rate_guards_max_five CHECK (cardinality(accepted_at) <= 5));
REVOKE ALL ON public.inquiry_rate_guards FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.inquiry_rate_guards TO service_role;
ALTER TABLE public.inquiry_rate_guards ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.inquiry_duplicate_guards (fingerprint text PRIMARY KEY CHECK (fingerprint ~ '^[0-9a-f]{64}$'), accepted_at timestamptz NOT NULL, inquiry_id uuid NOT NULL REFERENCES public.inquiries(id));
REVOKE ALL ON public.inquiry_duplicate_guards FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.inquiry_duplicate_guards TO service_role;
ALTER TABLE public.inquiry_duplicate_guards ENABLE ROW LEVEL SECURITY;

CREATE FUNCTION public.get_inquiry_guard_salt() RETURNS text LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog AS $function$
DECLARE v_salt text;
BEGIN
  INSERT INTO public.inquiry_guard_secret(singleton, salt) VALUES (true, encode(extensions.gen_random_bytes(32), 'hex')) ON CONFLICT (singleton) DO NOTHING;
  SELECT salt INTO STRICT v_salt FROM public.inquiry_guard_secret WHERE singleton = true;
  RETURN v_salt;
END;
$function$;
REVOKE ALL ON FUNCTION public.get_inquiry_guard_salt() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_inquiry_guard_salt() TO service_role;

CREATE FUNCTION public.accept_guarded_inquiry(p_ip_hash text, p_fingerprint text, p_kind text, p_name text, p_email text, p_company text, p_message text, p_source_path text, p_consent boolean, p_consent_version text) RETURNS TABLE(outcome text, inquiry_id uuid, retry_after_seconds integer) LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog SET lock_timeout = '5s' AS $function$
DECLARE
  v_ip_lock bigint := hashtextextended('inquiry-ip:' || p_ip_hash, 0);
  v_duplicate_lock bigint := hashtextextended('inquiry-duplicate:' || p_fingerprint, 0);
  v_now timestamptz;
  v_recent timestamptz[];
  v_id uuid;
BEGIN
  IF p_ip_hash IS NULL OR p_ip_hash !~ '^[0-9a-f]{64}$' OR p_fingerprint IS NULL OR p_fingerprint !~ '^[0-9a-f]{64}$' OR p_consent IS DISTINCT FROM true OR p_consent_version IS NULL OR char_length(p_consent_version) NOT BETWEEN 1 AND 100 THEN
    RAISE EXCEPTION 'Invalid guarded inquiry' USING ERRCODE = '22023';
  END IF;
  PERFORM pg_advisory_xact_lock(least(v_ip_lock, v_duplicate_lock));
  IF v_ip_lock <> v_duplicate_lock THEN PERFORM pg_advisory_xact_lock(greatest(v_ip_lock, v_duplicate_lock)); END IF;
  v_now := clock_timestamp();
  IF EXISTS (SELECT 1 FROM public.inquiry_duplicate_guards d WHERE d.fingerprint = p_fingerprint AND d.accepted_at > v_now - interval '10 minutes') OR EXISTS (SELECT 1 FROM public.inquiries i WHERE i.email = p_email AND i.message = p_message AND i.created_at > v_now - interval '10 minutes') THEN
    RETURN QUERY SELECT 'duplicate'::text, NULL::uuid, 0;
    RETURN;
  END IF;
  SELECT coalesce(array_agg(t ORDER BY t), '{}'::timestamptz[]) INTO v_recent FROM public.inquiry_rate_guards g CROSS JOIN LATERAL unnest(g.accepted_at) t WHERE g.ip_hash = p_ip_hash AND t > v_now - interval '1 hour';
  IF cardinality(v_recent) >= 5 THEN
    RETURN QUERY SELECT 'rate_limited'::text, NULL::uuid, greatest(1, ceil(extract(epoch FROM v_recent[1] + interval '1 hour' - v_now))::integer);
    RETURN;
  END IF;
  v_id := gen_random_uuid();
  INSERT INTO public.inquiries(id, created_at, kind, name, email, company, message, source_path, consent_version, consent_at) VALUES (v_id, v_now, p_kind, p_name, p_email, p_company, p_message, p_source_path, p_consent_version, v_now);
  INSERT INTO public.inquiry_rate_guards(ip_hash, accepted_at) VALUES (p_ip_hash, array_append(v_recent, v_now)) ON CONFLICT (ip_hash) DO UPDATE SET accepted_at = EXCLUDED.accepted_at;
  INSERT INTO public.inquiry_duplicate_guards(fingerprint, accepted_at, inquiry_id) VALUES (p_fingerprint, v_now, v_id) ON CONFLICT (fingerprint) DO UPDATE SET accepted_at = EXCLUDED.accepted_at, inquiry_id = EXCLUDED.inquiry_id;
  RETURN QUERY SELECT 'accepted'::text, v_id, 0;
END;
$function$;
REVOKE ALL ON FUNCTION public.accept_guarded_inquiry(text,text,text,text,text,text,text,text,boolean,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.accept_guarded_inquiry(text,text,text,text,text,text,text,text,boolean,text) TO service_role;
COMMENT ON TABLE public.inquiry_guard_secret IS 'Server-only salt. Never returned to visitors or written to logs.';
COMMENT ON TABLE public.inquiry_rate_guards IS 'Server-only pseudonymous protection metadata; at most five recent accepted timestamps per checksum. No raw IP addresses. Expired records remain until separately approved retention work.';
COMMENT ON TABLE public.inquiry_duplicate_guards IS 'Server-only keyed email/message checksum for rolling ten-minute deduplication; no message content. Expired records remain until separately approved retention work.';
COMMENT ON COLUMN public.inquiries.consent_version IS 'Server-controlled wording version for new inquiries; NULL means historical consent evidence is unknown.';