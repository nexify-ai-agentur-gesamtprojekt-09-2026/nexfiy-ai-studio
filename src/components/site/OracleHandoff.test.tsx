import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CONTACT_HANDOFF_EVENT, CONTACT_HANDOFF_KEY } from "@/lib/contact-handoff";
import type { OracleMessage } from "@/lib/use-oracle-advice";

const navigate = vi.fn();
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));

const { OracleHandoff } = await import("./OracleHandoff");

const messages: OracleMessage[] = [
  { role: "user", content: "Wir wollen Angebote schneller erstellen." },
  { role: "assistant", content: "Vertraulicher Modelltext", recommendation: "suite" },
];

describe("OracleHandoff", () => {
  beforeEach(() => {
    navigate.mockReset();
    window.sessionStorage.clear();
    window.history.replaceState(null, "", "/produkte/nex2fly");
  });
  afterEach(() => vi.restoreAllMocks());

  it("stores nothing until the visitor reviews and confirms", () => {
    render(<OracleHandoff messages={messages} />);
    fireEvent.click(screen.getByRole("button", { name: /Als Projektanfrage vorbereiten/ }));
    expect(window.sessionStorage.getItem(CONTACT_HANDOFF_KEY)).toBeNull();
    const preview = screen.getByRole("region", { name: "Vorschau des Entwurfs" });
    expect(preview).toHaveTextContent("Wir wollen Angebote schneller erstellen.");
    expect(preview).toHaveTextContent("NeX AIFly Suite");
    expect(preview).not.toHaveTextContent("Vertraulicher Modelltext");
    expect(navigate).not.toHaveBeenCalled();
  });

  it("moves the confirmed draft to the contact form without putting it in the address", () => {
    const transferred = vi.fn();
    render(<OracleHandoff messages={messages} onTransferred={transferred} />);
    fireEvent.click(screen.getByRole("button", { name: /Als Projektanfrage vorbereiten/ }));
    fireEvent.click(screen.getByRole("button", { name: /In Kontaktformular übernehmen/ }));
    const stored = JSON.parse(window.sessionStorage.getItem(CONTACT_HANDOFF_KEY) ?? "{}");
    expect(stored.origin).toBe("oracle");
    expect(stored.text).toContain("Wir wollen Angebote schneller erstellen.");
    expect(navigate).toHaveBeenCalledWith({ to: "/kontakt", hash: "anfrage" });
    expect(JSON.stringify(navigate.mock.calls)).not.toContain("Angebote");
    expect(transferred).toHaveBeenCalledTimes(1);
  });

  it("notifies the contact page directly when the form is already open", () => {
    window.history.replaceState(null, "", "/kontakt");
    const listener = vi.fn();
    window.addEventListener(CONTACT_HANDOFF_EVENT, listener);
    render(<OracleHandoff messages={messages} />);
    fireEvent.click(screen.getByRole("button", { name: /Als Projektanfrage vorbereiten/ }));
    fireEvent.click(screen.getByRole("button", { name: /In Kontaktformular übernehmen/ }));
    window.removeEventListener(CONTACT_HANDOFF_EVENT, listener);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(navigate).not.toHaveBeenCalled();
  });

  it("returns to the offer without storing anything", () => {
    render(<OracleHandoff messages={messages} />);
    fireEvent.click(screen.getByRole("button", { name: /Als Projektanfrage vorbereiten/ }));
    fireEvent.click(screen.getByRole("button", { name: "Zurück" }));
    expect(screen.getByRole("button", { name: /Als Projektanfrage vorbereiten/ })).toHaveFocus();
    expect(window.sessionStorage.getItem(CONTACT_HANDOFF_KEY)).toBeNull();
  });

  it("shows an honest alternative when the browser blocks the handoff", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<OracleHandoff messages={messages} />);
    fireEvent.click(screen.getByRole("button", { name: /Als Projektanfrage vorbereiten/ }));
    fireEvent.click(screen.getByRole("button", { name: /In Kontaktformular übernehmen/ }));
    expect(screen.getByRole("alert")).toHaveTextContent("Übernahme nicht möglich");
    expect(screen.getByRole("button", { name: /Entwurf kopieren/ })).toBeInTheDocument();
    expect(navigate).not.toHaveBeenCalled();
  });
});
