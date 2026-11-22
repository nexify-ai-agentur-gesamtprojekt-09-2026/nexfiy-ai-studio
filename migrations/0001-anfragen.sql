-- 0001-anfragen.sql — Eingang der oeffentlichen Anfrageformulare (A-36: Empfaenger UND Speicher belegt).
-- Anwenden: npx wrangler d1 execute nexify-main --remote --file migrations/0001-anfragen.sql
-- Kein Loeschen: Datensaetze werden nur ergaenzt, eine Archivierung regelt die Aufbewahrung.

CREATE TABLE IF NOT EXISTS anfragen (
  nummer              TEXT PRIMARY KEY,
  tenant              TEXT NOT NULL,
  art                 TEXT NOT NULL,
  dedup_key           TEXT NOT NULL,
  name                TEXT NOT NULL,
  email               TEXT NOT NULL,
  unternehmen         TEXT,
  nachricht           TEXT NOT NULL,
  ip_hash             TEXT,
  herkunft            TEXT,
  notification_status TEXT NOT NULL DEFAULT 'ausstehend',
  notification_id     TEXT,
  empfangen_am        TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS anfragen_dedup ON anfragen (dedup_key);
CREATE INDEX IF NOT EXISTS anfragen_ip_zeit ON anfragen (ip_hash, empfangen_am);
