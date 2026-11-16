CREATE TABLE public.slack_delivery_receipts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 team_id text NOT NULL,
 event_key text NOT NULL,
 flow_id text NOT NULL,
 actor_id text NOT NULL,
 channel_id text NOT NULL,
 thread_ts text,
 entity_table text CHECK (entity_table IS NULL OR entity_table IN ('inquiries','teileklar_part_inquiries')),
 entity_id uuid,
 outcome text NOT NULL DEFAULT 'accepted' CHECK (outcome IN ('accepted','ack','result','ignored','failed')),
 error_code text,
 UNIQUE(team_id,event_key)
);
GRANT SELECT ON public.slack_delivery_receipts TO authenticated;
GRANT ALL ON public.slack_delivery_receipts TO service_role;
ALTER TABLE public.slack_delivery_receipts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read Slack delivery receipts" ON public.slack_delivery_receipts FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE INDEX slack_delivery_receipts_created_idx ON public.slack_delivery_receipts(created_at DESC);
ALTER TABLE public.inquiries ADD COLUMN slack_channel_id text, ADD COLUMN slack_message_ts text;
ALTER TABLE public.teileklar_part_inquiries ADD COLUMN slack_channel_id text, ADD COLUMN slack_message_ts text;
COMMENT ON TABLE public.slack_delivery_receipts IS 'Zustell- und Rückmeldebelege ohne Nachrichtentext; bestehende Aufträge bleiben führend.';