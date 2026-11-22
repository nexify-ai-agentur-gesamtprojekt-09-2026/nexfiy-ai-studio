-- 0002-chat.sql — Gegenstelle fuer den KI-Chat (Befund B-159).
-- Anwenden: npx wrangler d1 execute nexify-main --remote --file migrations/0002-chat.sql
-- Kein Loeschen: Nachrichten werden nur ergaenzt; Aufbewahrung regelt die Loeschroutine.

CREATE TABLE IF NOT EXISTS chat_nachrichten (
  id         TEXT PRIMARY KEY,
  tenant     TEXT NOT NULL,
  session_id TEXT NOT NULL,
  rolle      TEXT NOT NULL CHECK (rolle IN ('user', 'assistant')),
  inhalt     TEXT NOT NULL,
  ip_hash    TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS chat_session_zeit ON chat_nachrichten (session_id, created_at);
CREATE INDEX IF NOT EXISTS chat_ip_zeit ON chat_nachrichten (ip_hash, created_at);
