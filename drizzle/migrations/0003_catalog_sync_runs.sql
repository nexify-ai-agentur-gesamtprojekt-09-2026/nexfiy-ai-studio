CREATE TABLE public.teileklar_catalog_sync_runs (
  run_date date PRIMARY KEY,
  started_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  reported_total integer NOT NULL CHECK (reported_total >= 0),
  next_offset integer NOT NULL DEFAULT 0 CHECK (next_offset >= 0),
  received integer NOT NULL DEFAULT 0,
  rejected integer NOT NULL DEFAULT 0,
  archived integer NOT NULL DEFAULT 0,
  complete boolean,
  last_error text,
  finished_at timestamptz
);
REVOKE ALL ON public.teileklar_catalog_sync_runs FROM anon, authenticated;
GRANT ALL ON public.teileklar_catalog_sync_runs TO service_role;
ALTER TABLE public.teileklar_catalog_sync_runs ENABLE ROW LEVEL SECURITY;