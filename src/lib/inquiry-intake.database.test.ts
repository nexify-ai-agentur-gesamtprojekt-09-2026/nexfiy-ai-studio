// @vitest-environment node
import postgres from "postgres";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { INQUIRY_CONSENT_VERSION } from "./inquiry-consent";
import { submitInquiry } from "./inquiry.functions";

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
  setResponseHeader: vi.fn(),
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { rpc: state.rpc } }));
vi.mock("./inquiry-delivery.server", () => ({ deliverInquiryNotice: state.deliver, workspaceUrl: async () => "http://localhost:8080/arbeitsplatz" }));

const db = postgres({ host: process.env["PGHOST"], port: Number(process.env["PGPORT"] || 5432), database: process.env["PGDATABASE"], username: process.env["PGUSER"], password: process.env["PGPASSWORD"], max: 1 });
afterAll(async () => { await db.end(); });
beforeEach(() => { state.ip = "192.0.2.80"; state.deliver.mockClear(); state.rpc.mockReset(); });

type Args = { p_ip_hash: string; p_fingerprint: string; p_kind: string; p_name: string; p_email: string; p_company: string; p_message: string; p_source_path: string; p_consent: boolean; p_consent_version: string };

async function rollbackTest(check: (tx: postgres.TransactionSql) => Promise<void>) {
  const rollback = new Error("NX_LEAD_TEST_ROLLBACK");
  try {
    await db.begin(async tx => {
      await tx`SET LOCAL ROLE service_role`;
      state.rpc.mockImplementation(async (name: string, args?: Args) => {
        if (name === "get_inquiry_guard_salt") {
          const rows = await tx`SELECT public.get_inquiry_guard_salt() AS salt`;
          return { data: rows[0]?.["salt"], error: null };
        }
        if (!args) throw new Error("Testparameter fehlen");
        try {
          const rows = await tx`SELECT * FROM public.accept_guarded_inquiry(${args.p_ip_hash},${args.p_fingerprint},${args.p_kind},${args.p_name},${args.p_email},${args.p_company},${args.p_message},${args.p_source_path},${args.p_consent},${args.p_consent_version})`;
          return { data: rows, error: null };
        } catch { return { data: null, error: { message: "Speichern abgewiesen" } }; }
      });
      await check(tx);
      throw rollback;
    });
  } catch (error) { if (error !== rollback) throw error; }
}

function send(index: number, email = "nx-lead-01-test@example.test") {
  return submitInquiry({ data: { kind: "contact", name: "NX LEAD Prüfung", email, company: "", message: `NX-LEAD-01 Prüfvorhaben Nummer ${index}.`, consent: true, website: "", sourcePath: "/kontakt" } });
}

describe("NX-LEAD-01 echter Eingang mit Datenbank und gemocktem Slack", () => {
  it("nimmt exakt fünf an und lehnt die sechste innerhalb einer Stunde ab", async () => {
    await rollbackTest(async tx => {
      const before = await tx`SELECT count(*)::integer AS count FROM public.inquiries`;
      for (let i = 1; i <= 5; i++) expect((await send(i)).ok).toBe(true);
      expect(await send(6)).toMatchObject({ ok: false, reason: "rate_limited" });
      const after = await tx`SELECT count(*)::integer AS count FROM public.inquiries`;
      expect(after[0]?.["count"] - before[0]?.["count"]).toBe(5);
      expect(state.deliver).toHaveBeenCalledTimes(5);
    });
  });
  it("speichert gleiche E-Mail und Nachricht innerhalb von zehn Minuten nur einmal und meldet einmal", async () => {
    await rollbackTest(async tx => {
      const before = await tx`SELECT count(*)::integer AS count FROM public.inquiries`;
      expect((await send(1, "NX-LEAD-01-TEST@EXAMPLE.TEST")).ok).toBe(true);
      state.ip = "192.0.2.81";
      expect(await send(1, " nx-lead-01-test@example.test ")).toMatchObject({ ok: false, reason: "duplicate" });
      const after = await tx`SELECT count(*)::integer AS count FROM public.inquiries`;
      expect(after[0]?.["count"] - before[0]?.["count"]).toBe(1);
      expect(state.deliver).toHaveBeenCalledTimes(1);
    });
  });
  it("setzt Einwilligungszeit und exakte Version serverseitig bei neuer Speicherung", async () => {
    await rollbackTest(async tx => {
      const before = Date.now();
      expect((await send(1)).ok).toBe(true);
      const rows = await tx`SELECT consent_version,consent_at,created_at FROM public.inquiries WHERE email='nx-lead-01-test@example.test' ORDER BY created_at DESC LIMIT 1`;
      expect(rows[0]?.["consent_version"]).toBe("inquiry-storage-2026-11-16-v1");
      expect(rows[0]?.["consent_version"]).toBe(INQUIRY_CONSENT_VERSION);
      expect(new Date(rows[0]?.["consent_at"]).getTime()).toBeGreaterThanOrEqual(before - 1000);
      expect(new Date(rows[0]?.["consent_at"]).getTime()).toBe(new Date(rows[0]?.["created_at"]).getTime());
    });
  });
  it("lässt nach Ablauf der rollierenden Stunde wieder eine Anfrage zu", async () => {
    await rollbackTest(async tx => {
      for (let i = 1; i <= 5; i++) await send(i);
      const hash = state.rpc.mock.calls.find(call => call[0] === "accept_guarded_inquiry")?.[1]?.p_ip_hash;
      expect(typeof hash).toBe("string");
      await tx`UPDATE public.inquiry_rate_guards SET accepted_at=ARRAY[clock_timestamp()-interval '1 hour 1 second'] WHERE ip_hash=${hash}`;
      expect((await send(6)).ok).toBe(true);
      expect(state.deliver).toHaveBeenCalledTimes(6);
    });
  });
  it("lässt dieselbe Nachricht nach zehn Minuten wieder zu", async () => {
    await rollbackTest(async tx => {
      await send(1);
      const args = state.rpc.mock.calls.find(call => call[0] === "accept_guarded_inquiry")?.[1];
      await tx`UPDATE public.inquiry_duplicate_guards SET accepted_at=clock_timestamp()-interval '10 minutes 1 second' WHERE fingerprint=${args?.p_fingerprint}`;
      await tx`UPDATE public.inquiries SET created_at=clock_timestamp()-interval '10 minutes 1 second' WHERE id=(SELECT inquiry_id FROM public.inquiry_duplicate_guards WHERE fingerprint=${args?.p_fingerprint})`;
      expect((await send(1)).ok).toBe(true);
      expect(state.deliver).toHaveBeenCalledTimes(2);
    });
  });
  it("meldet kein Slack bei Speicherfehler und weist fehlende Einwilligung vorher ab", async () => {
    await rollbackTest(async () => {
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
});