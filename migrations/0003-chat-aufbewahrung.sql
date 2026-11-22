-- 0003-chat-aufbewahrung.sql — Zeitindex und Aufräumweg für den KI-Chat.
-- Anwenden: npx wrangler d1 execute nexify-main --remote --file migrations/0003-chat-aufbewahrung.sql
--
-- Warum: /api/chat zählt für Minuten-, Sitzungs- und Tageslimit die Nutzerzeilen der letzten
-- 24 Stunden und räumt alte Zeilen nach Zeit ab; beides braucht einen Index auf created_at.
--
-- Aufbewahrung (ersetzt den Hinweis "Loeschroutine" in 0002, die es nie gab):
--   automatisch  /api/chat löscht bei jeder gespeicherten Frage alle Zeilen, die älter sind als die
--                Frist (raeumeChatAuf in src/lib/chat-api.ts). Vorschlag: 30 Tage; mit dem Binding
--                CHAT_AUFBEWAHRUNG_TAGE=<Tage> anpassbar. Die Frist ist eine Inhaberentscheidung.
--   von Hand     npx wrangler d1 execute nexify-main --remote --command \
--                "DELETE FROM chat_nachrichten WHERE created_at < datetime('now','-30 days')"
--                (created_at ist ISO-8601 in UTC; für den Vergleich genügt die Datumsstelle.)
--   Auskunft/Löschung zu einer Sitzung:
--                "DELETE FROM chat_nachrichten WHERE session_id = '<Sitzungskennung>'"

CREATE INDEX IF NOT EXISTS chat_tenant_zeit ON chat_nachrichten (tenant, created_at);
