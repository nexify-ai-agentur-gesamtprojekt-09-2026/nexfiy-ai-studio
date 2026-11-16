/**
 * Datenbanktests schreiben echte Zeilen. Sie laufen nur mit ausdrücklicher Kennzeichnung und ausschließlich gegen
 * eine lokale Datenbank, damit ein Lauf im Hauptstand niemals die Produktivdatenbank berührt.
 */
const LOCAL_HOSTS = ["localhost", "127.0.0.1"];

function isLocalUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    return LOCAL_HOSTS.includes(new URL(value).hostname);
  } catch {
    return false;
  }
}

export const ISOLATED_DB_SKIP_REASON = "nur isolierte Testdatenbank (NEXIFY_ISOLATED_TEST_DB=1 und lokale Datenbankadresse)";

export const isolatedTestDb =
  process.env["NEXIFY_ISOLATED_TEST_DB"] === "1" &&
  isLocalUrl(process.env["SUPABASE_URL"]) &&
  (process.env["PGHOST"] === undefined || LOCAL_HOSTS.includes(process.env["PGHOST"]));

export const skipWithoutIsolatedDb = !isolatedTestDb;
