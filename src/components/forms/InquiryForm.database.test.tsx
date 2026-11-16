import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { webcrypto } from "node:crypto";
import { draftAdmin, draftService } from "@/test/draft-clients";
import { ISOLATED_DB_SKIP_REASON, isolatedTestDb, skipWithoutIsolatedDb } from "@/test/isolated-db";
import { countInquiryWeek } from "@/lib/inquiry-metrics";
import { INQUIRY_CONSENT_VERSION } from "@/lib/inquiry-consent";
import { submitInquiry } from "@/lib/inquiry.functions";
import { InquiryForm } from "./InquiryForm";

const state = vi.hoisted(() => ({ ip: undefined as string | undefined, rpc: vi.fn(), deliver: vi.fn().mockResolvedValue(true) }));
vi.mock("@tanstack/react-start", () => ({
  useServerFn: (fn: unknown) => fn,
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
vi.mock("@/lib/inquiry-delivery.server", () => ({ deliverInquiryNotice: state.deliver, workspaceUrl: async () => "http://localhost:8080/arbeitsplatz" }));
vi.mock("@/lib/clipboard", () => ({ copyText: vi.fn() }));

const service = isolatedTestDb ? draftService() : (null as unknown as ReturnType<typeof draftService>);
const runId = webcrypto.randomUUID();
const email = `nx-lead-ui-${runId}@example.test`;
let serial = 0;
beforeEach(() => {
  vi.stubGlobal("crypto", webcrypto);
  state.rpc.mockReset().mockImplementation((name, args) => service.rpc(name, args));
  state.deliver.mockClear();
  serial++;
  state.ip = `2001:db8:${parseInt(runId.slice(0, 4), 16).toString(16)}:${serial.toString(16)}::5`;
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

function form(message: string) {
  render(<InquiryForm kind="contact" title="Anfrage" companyLabel="Unternehmen" privacyHref="/datenschutz" />);
  fireEvent.change(screen.getByLabelText("Name *"), { target: { value: "NX LEAD Formularprüfung" } });
  fireEvent.change(screen.getByLabelText("E-Mail *"), { target: { value: email } });
  fireEvent.change(screen.getByLabelText("Unternehmen"), { target: { value: "Erfundenes Testunternehmen" } });
  fireEvent.change(screen.getByLabelText("Ihr Anliegen *"), { target: { value: message } });
  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button", { name: "Anfrage senden" }));
}

describe.skipIf(skipWithoutIsolatedDb)(`NX-LEAD-01 vollständiger Formularablauf mit echter Entwurfsdatenbank und gemocktem Slack · ${ISOLATED_DB_SKIP_REASON}`, () => {
  it.each(["valid", "missing"])("speichert %s IP, Einwilligung, Wochenzahl +1; Dublette erzeugt keine zweite Zeile oder Slack-Meldung", async mode => {
    const admin = await draftAdmin();
    if (mode === "missing") state.ip = undefined;
    const log = vi.spyOn(console, "warn").mockImplementation(() => {});
    const before = await countInquiryWeek(admin);
    const message = `NX-LEAD-01 UI ${runId} ${mode}: Ein geprüftes Automatisierungsvorhaben.`;
    const started = Date.now();
    form(message);
    await screen.findByRole("heading", { name: "Ihre Anfrage ist eingegangen." });
    expect(state.deliver).toHaveBeenCalledTimes(1);
    const rows = await service.from("inquiries").select("id,consent_version,consent_at").eq("email", email).eq("message", message);
    expect(rows.error).toBeNull();
    expect(rows.data).toHaveLength(1);
    expect(rows.data?.[0]?.consent_version).toBe("inquiry-storage-2026-11-16-v1");
    expect(rows.data?.[0]?.consent_version).toBe(INQUIRY_CONSENT_VERSION);
    expect(new Date(rows.data?.[0]?.consent_at ?? "").getTime()).toBeGreaterThanOrEqual(started - 1000);
    const after = await countInquiryWeek(admin);
    expect(after.contact).toBe(before.contact + 1);
    expect(after.teileklar).toBe(before.teileklar);
    cleanup();
    form(message);
    await screen.findByRole("alert");
    expect(screen.getByLabelText("Ihr Anliegen *")).toHaveValue(message);
    expect(screen.getByLabelText("E-Mail *")).toHaveValue(email);
    expect(screen.getByRole("checkbox")).toBeChecked();
    const duplicateRows = await service.from("inquiries").select("id").eq("email", email).eq("message", message);
    expect(duplicateRows.data).toHaveLength(1);
    expect(state.deliver).toHaveBeenCalledTimes(1);
    expect((await countInquiryWeek(admin)).contact).toBe(before.contact + 1);
    if (mode === "missing") expect(log.mock.calls).toEqual([["rate_guard_ip_missing"], ["rate_guard_ip_missing"]]);
  });
  it("weist die sechste Anfrage derselben IP sichtbar ab und erhält alle Eingaben", async () => {
    const prefix = `NX-LEAD-01 UI rate ${runId}`;
    for (let i = 1; i <= 5; i++) {
      form(`${prefix} Anfrage ${i}: Ein geprüftes Vorhaben.`);
      await screen.findByRole("heading", { name: "Ihre Anfrage ist eingegangen." });
      cleanup();
    }
    const admin = await draftAdmin();
    const beforeRejected = await countInquiryWeek(admin);
    const message = `${prefix} Anfrage 6: Ein geprüftes Vorhaben.`;
    form(message);
    await screen.findByRole("alert");
    expect(screen.getByLabelText("Name *")).toHaveValue("NX LEAD Formularprüfung");
    expect(screen.getByLabelText("E-Mail *")).toHaveValue(email);
    expect(screen.getByLabelText("Unternehmen")).toHaveValue("Erfundenes Testunternehmen");
    expect(screen.getByLabelText("Ihr Anliegen *")).toHaveValue(message);
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByRole("button", { name: "Anfrage senden" })).toBeEnabled();
    expect(state.deliver).toHaveBeenCalledTimes(5);
    const rows = await service.from("inquiries").select("id").eq("email", email).like("message", `${prefix}%`);
    expect(rows.data).toHaveLength(5);
    expect((await countInquiryWeek(admin)).contact).toBe(beforeRejected.contact);
  });
});