// @vitest-environment node
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { INQUIRY_CONSENT_VERSION } from "./inquiry-consent";
import { submitInquiry } from "./inquiry.functions";
import { deliverInquiryNotice, workspaceUrl } from "./inquiry-delivery.server";

const state = vi.hoisted(() => ({
  ip: "192.0.2.80",
  rpc: vi.fn(),
  deliver: vi.fn().mockResolvedValue(true),
}));

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({ validator: (validate: (input: unknown) => unknown) => ({
    handler: (handle: (args: { data: unknown }) => unknown) => (args: { data: unknown }) => handle({ data: validate(args.data) }),
  }) }),
}));
vi.mock("@tanstack/react-start/server", () => ({
  getRequest: () => new Request("http://localhost:8080/kontakt"),
  getRequestIP: () => state.ip,
  getRequestHost: () => "localhost:8080",
  getRequestProtocol: () => "http",
  setResponseHeader: vi.fn(),
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { rpc: state.rpc } }));
vi.mock("./inquiry-delivery.server", () => ({ deliverInquiryNotice: state.deliver, workspaceUrl: async () => "http://localhost:8080/arbeitsplatz" }));

const db = postgres({ host: process.env["PGHOST"], port: Number(process.env["PGPORT"] || 5432), database: process.env["PGDATABASE"], username: process.env["PGUSER"], password: process.env["PGPASSWORD"], max: 1 });
const url = process.env["SUPABASE_URL"];
const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
if (!url || !key) throw new Error("Isolierter Datenbank-Testzugang fehlt.");
const service = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const runId = crypto.randomUUID();
const testEmail = `nx-lead-${runId}@example.test`;
const idPart = parseInt(runId.slice(0, 4), 16);
afterAll(async () => { await db.end(); });
beforeEach(() => { state.ip = `2001:db8:${idPart.toString(16)}:${Math.floor(Math.random()*65535).toString(16)}::1`; state.deliver.mockClear(); state.rpc.mockReset(); });
beforeEach(() => {
  expect(vi.isMockFunction(deliverInquiryNotice)).toBe(true);
  expect(typeof workspaceUrl).toBe("function");
});

type Args = { p_ip_hash: string; p_fingerprint: string; p_kind: string; p_name: string; p_email: string; p_company: string; p_message: string; p_source_path: string; p_consent: boolean; p_consent_version: string };

async function draftTest(check: (tx: postgres.TransactionSql) => Promise<void>) {
  // Nur isolierte Entwurfsdaten: keine Rechteänderung, kein Löschen; Testzeilen bleiben nachvollziehbar.
  state.rpc.mockImplementation((name: string, args?: Args) => service.rpc(name, args));
  await db.begin(async tx => { await check(tx); });
}

async function serviceUpdate(table: string, values: Record<string, unknown>, column: string, value: string) {
  const result = await service.from(table).update(values).eq(column, value);
  if (result.error) throw new Error("Testdaten konnten nicht vorbereitet werden.");
}

function send(index: number, email = testEmail) {
  return submitInquiry({ data: { kind: "contact", name: "NX LEAD Prüfung", email, company: "", message: `NX-LEAD-01 ${runId} Prüfvorhaben Nummer ${index}.`, consent: true, website: "", sourcePath: "/kontakt" } });
}

describe("NX-LEAD-01 echter Eingang mit Datenbank und gemocktem Slack", () => {
  it("nimmt exakt fünf an und lehnt die sechste innerhalb einer Stunde ab", async () => {
    await draftTest(async tx => {
      const before = await tx`SELECT count(*)::integer AS count FROM public.inquiries`;
      for (let i = 1; i <= 5; i++) expect((await send(i)).ok).toBe(true);
      expect(await send(6)).toMatchObject({ ok: false, reason: "rate_limited" });
      const after = await tx`SELECT count(*)::integer AS count FROM public.inquiries`;
      expect(after[0]?.["count"] - before[0]?.["count"]).toBe(5);
      expect(state.deliver).toHaveBeenCalledTimes(5);
    });
  });
  it("speichert gleiche E-Mail und Nachricht innerhalb von zehn Minuten nur einmal und meldet einmal", async () => {
    await draftTest(async tx => {
      const before = await tx`SELECT count(*)::integer AS count FROM public.inquiries`;
      expect((await send(11, testEmail.toUpperCase())).ok).toBe(true);
      state.ip = "192.0.2.81";
      expect(await send(11, ` ${testEmail} `)).toMatchObject({ ok: false, reason: "duplicate" });
      const after = await tx`SELECT count(*)::integer AS count FROM public.inquiries`;
      expect(after[0]?.["count"] - before[0]?.["count"]).toBe(1);
      expect(state.deliver).toHaveBeenCalledTimes(1);
    });
  });
  it("setzt Einwilligungszeit und exakte Version serverseitig bei neuer Speicherung", async () => {
    await draftTest(async tx => {
      const before = Date.now();
      expect((await send(21)).ok).toBe(true);
      const rows = await tx`SELECT consent_version,consent_at,created_at FROM public.inquiries WHERE email=${testEmail} ORDER BY created_at DESC LIMIT 1`;
      expect(rows[0]?.["consent_version"]).toBe("inquiry-storage-2026-11-16-v1");
      expect(rows[0]?.["consent_version"]).toBe(INQUIRY_CONSENT_VERSION);
      expect(new Date(rows[0]?.["consent_at"]).getTime()).toBeGreaterThanOrEqual(before - 1000);
      expect(new Date(rows[0]?.["consent_at"]).getTime()).toBe(new Date(rows[0]?.["created_at"]).getTime());
    });
  });
  it("lässt nach Ablauf der rollierenden Stunde wieder eine Anfrage zu", async () => {
    await draftTest(async () => {
      for (let i = 31; i <= 35; i++) await send(i);
      const hash = state.rpc.mock.calls.find(call => call[0] === "accept_guarded_inquiry")?.[1]?.p_ip_hash;
      expect(typeof hash).toBe("string");
      await serviceUpdate("inquiry_rate_guards", { accepted_at: [new Date(Date.now() - 3601000).toISOString()] }, "ip_hash", hash);
      expect((await send(36)).ok).toBe(true);
      expect(state.deliver).toHaveBeenCalledTimes(6);
    });
  });
  it("lässt dieselbe Nachricht nach zehn Minuten wieder zu", async () => {
    await draftTest(async () => {
      await send(41);
      const args = state.rpc.mock.calls.find(call => call[0] === "accept_guarded_inquiry")?.[1];
      const accepted = await service.from("inquiry_duplicate_guards").select("inquiry_id").eq("fingerprint", args?.p_fingerprint).single();
      if (accepted.error || !accepted.data) throw new Error("Testvorgang fehlt");
      const expired = new Date(Date.now() - 601000).toISOString();
      await serviceUpdate("inquiry_duplicate_guards", { accepted_at: expired }, "fingerprint", args?.p_fingerprint);
      await serviceUpdate("inquiries", { created_at: expired }, "id", accepted.data["inquiry_id"]);
      expect((await send(41)).ok).toBe(true);
      expect(state.deliver).toHaveBeenCalledTimes(2);
    });
  });
  it("meldet kein Slack bei Speicherfehler und weist fehlende Einwilligung vorher ab", async () => {
    await draftTest(async () => {
      state.rpc.mockResolvedValue({ data: null, error: { message: "Testfehler" } });
      expect(await send(1)).toMatchObject({ ok: false, reason: "unavailable" });
      expect(state.deliver).not.toHaveBeenCalled();
      const result = await submitInquiry({ data: { kind: "contact", name: "NX LEAD Prüfung", email: "nx-lead-01-test@example.test", message: "Ein vollständig geprüftes Vorhaben.", consent: false } });
      expect(result).toMatchObject({ ok: false, errors: { consent: expect.any(String) } });
    });
  });
  it("erweitert keine bestehenden Rechte und hält neue Tabellen und Funktionen vollständig serverseitig", async () => {
    const roles = await db`SELECT rolname,has_table_privilege(rolname,'public.inquiries','SELECT') AS s,has_table_privilege(rolname,'public.inquiries','INSERT') AS i,has_table_privilege(rolname,'public.inquiries','UPDATE') AS u,has_table_privilege(rolname,'public.inquiries','DELETE') AS d FROM pg_roles WHERE rolname IN ('anon','authenticated') ORDER BY rolname`;
    expect(roles.map(row => ({ role: row["rolname"], select: row["s"], insert: row["i"], update: row["u"], delete: row["d"] }))).toEqual([
      { role: "anon", select: false, insert: false, update: false, delete: false },
      { role: "authenticated", select: true, insert: false, update: false, delete: false },
    ]);
    const guards = await db`SELECT r.rolname,c.relname,c.relrowsecurity,has_table_privilege(r.rolname,c.oid,'SELECT,INSERT,UPDATE,DELETE') AS access FROM pg_roles r CROSS JOIN pg_class c WHERE r.rolname IN ('anon','authenticated') AND c.oid IN ('public.inquiry_guard_secret'::regclass,'public.inquiry_rate_guards'::regclass,'public.inquiry_duplicate_guards'::regclass)`;
    expect(guards).toHaveLength(6);
    expect(guards.every(row => row["access"] === false && row["relrowsecurity"] === true)).toBe(true);
    const functions = await db`SELECT r.rolname,p.proname,has_function_privilege(r.rolname,p.oid,'EXECUTE') AS access FROM pg_roles r CROSS JOIN pg_proc p WHERE r.rolname IN ('anon','authenticated') AND p.proname IN ('get_inquiry_guard_salt','accept_guarded_inquiry')`;
    expect(functions).toHaveLength(4);
    expect(functions.every(row => row["access"] === false)).toBe(true);
  });
  it("begrenzt zwölf parallele unterschiedliche Nachrichten derselben IP auf fünf", async () => {
    await draftTest(async () => {
      const results = await Promise.all(Array.from({ length: 12 }, (_, i) => send(100 + i)));
      expect(results.filter(row => row.ok)).toHaveLength(5);
      expect(results.filter(row => !row.ok && row.reason === "rate_limited")).toHaveLength(7);
      expect(state.deliver).toHaveBeenCalledTimes(5);
    });
  });
  it("speichert zehn parallele Dubletten von verschiedenen IPs einmal", async () => {
    await draftTest(async () => {
      const salt = await service.rpc("get_inquiry_guard_salt");
      if (salt.error || !salt.data) throw new Error("Testschutz fehlt");
      const { inquiryGuardHashes } = await import("./inquiry-guard.server");
      const results = await Promise.all(Array.from({ length: 10 }, async (_, index) => {
        const hashes = await inquiryGuardHashes(salt.data, `2001:db8:${idPart.toString(16)}::${index + 100}`, testEmail, `Parallel ${runId}`);
        return service.rpc("accept_guarded_inquiry", { p_ip_hash: hashes.ipHash, p_fingerprint: hashes.fingerprint, p_kind: "contact", p_name: "NX LEAD Parallel", p_email: testEmail, p_company: "", p_message: `Parallel ${runId}`, p_source_path: "/kontakt", p_consent: true, p_consent_version: INQUIRY_CONSENT_VERSION });
      }));
      expect(results.every(row => !row.error)).toBe(true);
      expect(results.filter(row => row.data?.[0]?.outcome === "accepted")).toHaveLength(1);
      expect(results.filter(row => row.data?.[0]?.outcome === "duplicate")).toHaveLength(9);
    });
  });
  it("zählt reale Datenbankzeitgrenzen exakt unter der bestehenden Admin-RLS", async () => {
    const { readFile } = await import("node:fs/promises");
    const { homedir } = await import("node:os");
    const session = JSON.parse(await readFile(`${homedir()}/.cache/lovable-auth/session.json`, "utf8"));
    const publicKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!publicKey) throw new Error("Testanmeldung fehlt");
    const client = createClient<import("@/integrations/supabase/types").Database>(url, publicKey, { global: { headers: { Authorization: `Bearer ${session.session.access_token}` } }, auth: { persistSession: false } });
    const end = new Date(Date.UTC(2010, 0, 8) + idPart * 1000000);
    const start = new Date(end.getTime() - 7 * 86400000);
    const { countInquiryWeek } = await import("./inquiry-metrics");
    const before = await countInquiryWeek(client, end);
    const rows = await service.from("inquiries").insert([
      { kind: "contact", company: "", name: "NX LEAD Grenze", email: testEmail, message: "Zeitgrenze innerhalb des Fensters.", created_at: start.toISOString() },
      { kind: "contact", company: "", name: "NX LEAD Grenze", email: testEmail, message: "Zeitgrenze vor dem Fenster.", created_at: new Date(start.getTime() - 1000).toISOString() },
      { kind: "contact", company: "", name: "NX LEAD Grenze", email: testEmail, message: "Zeitgrenze am Ende ausgeschlossen.", created_at: end.toISOString() },
      { kind: "partner", name: "NX LEAD Grenze", email: testEmail, company: "Testbetrieb", message: "Partnerfrage innerhalb des Fensters.", created_at: new Date(start.getTime() + 3600000).toISOString() },
    ]);
    if (rows.error) throw new Error("Testfenster konnte nicht vorbereitet werden");
    expect(await countInquiryWeek(client, end)).toMatchObject({ contact: before.contact + 1, teileklar: before.teileklar + 1 });
  });
});