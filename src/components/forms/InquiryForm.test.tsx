import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { InquiryForm } from "./InquiryForm";

const submitInquiry = vi.fn();
vi.mock("@/lib/clipboard", () => ({ copyText: vi.fn().mockResolvedValue(false) }));
vi.mock("@/lib/inquiry.functions", () => ({
  submitInquiry: (...args: unknown[]) => submitInquiry(...args),
}));
vi.mock("@tanstack/react-start", () => ({ useServerFn: (fn: unknown) => fn }));
afterEach(() => {
  cleanup();
  submitInquiry.mockReset();
});

function fillValid(message = "Wir möchten Anfragen automatisch vorsortieren.") {
  fireEvent.change(screen.getByLabelText("Name *"), { target: { value: "Erika Muster" } });
  fireEvent.change(screen.getByLabelText("E-Mail *"), { target: { value: "erika@example.test" } });
  fireEvent.change(screen.getByLabelText("Ihr Anliegen *"), { target: { value: message } });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("inquiry submission", () => {
  it.each(["rate_limited", "duplicate"])("behält Eingaben nach %s und bietet keinen Ausweichversand", async (reason) => {
    submitInquiry.mockResolvedValue({ ok: false, reason, error: "Die Anfrage wurde nicht erneut angenommen." });
    render(<InquiryForm kind="contact" title="Anfrage" companyLabel="Unternehmen" privacyHref="/datenschutz" />);
    fillValid();
    fireEvent.click(screen.getByRole("button", { name: "Anfrage senden" }));
    await screen.findByRole("alert");
    expect(screen.getByLabelText("Ihr Anliegen *")).toHaveValue("Wir möchten Anfragen automatisch vorsortieren.");
    expect(screen.queryByRole("button", { name: /Stattdessen als E-Mail/ })).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
  it("updates only remaining errors after corrections and sends nothing while invalid", () => {
    render(
      <InquiryForm
        kind="contact"
        title="Anfrage"
        companyLabel="Unternehmen"
        privacyHref="/datenschutz"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Anfrage senden" }));
    fireEvent.change(screen.getByLabelText("Name *"), { target: { value: "Erika Muster" } });
    expect(
      screen
        .getAllByRole("textbox")
        .filter((input) => input.getAttribute("aria-invalid") === "true"),
    ).toHaveLength(2);
    expect(submitInquiry).not.toHaveBeenCalled();
  });

  it("stores a valid inquiry and shows the returned reference", async () => {
    submitInquiry.mockResolvedValue({ ok: true, reference: "AB12CD34" });
    render(
      <InquiryForm
        kind="partner"
        title="Partner"
        companyLabel="Werkstatt / Betrieb"
        privacyHref="/datenschutz"
        messageLabel="Ihr Anliegen"
      />,
    );
    fillValid();
    fireEvent.change(screen.getByLabelText("Werkstatt / Betrieb *"), {
      target: { value: "Muster KFZ" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Anfrage senden" }));
    expect(
      await screen.findByRole("heading", { name: "Ihre Anfrage ist eingegangen." }),
    ).toBeInTheDocument();
    expect(screen.getByText("AB12CD34")).toBeInTheDocument();
    expect(submitInquiry.mock.calls[0]?.[0]).toMatchObject({
      data: { kind: "partner", company: "Muster KFZ", email: "erika@example.test", consent: true },
    });
  });

  it("keeps the entries after a failure and offers the e-mail draft only as explicit alternative", async () => {
    submitInquiry.mockResolvedValue({
      ok: false,
      error: "Ihre Anfrage konnte nicht gespeichert werden.",
    });
    const message = "Fahrzeug und benötigtes Ersatzteil. ".repeat(80);
    render(
      <InquiryForm
        kind="appointment"
        title="Termin"
        companyLabel="Unternehmen"
        privacyHref="/datenschutz"
      />,
    );
    fillValid(message);
    fireEvent.click(screen.getByRole("button", { name: "Anfrage senden" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("nicht gespeichert");
    expect(screen.getByLabelText("Ihr Anliegen *")).toHaveValue(message);
    fireEvent.click(screen.getByRole("button", { name: /Stattdessen als E-Mail/ }));
    const draft = screen.getByRole("textbox", { name: "Anfrageentwurf" });
    expect(draft instanceof HTMLTextAreaElement ? draft.value : "").toContain(
      "TEILEKLAR Terminwunsch von Erika Muster",
    );
    fireEvent.click(screen.getByRole("button", { name: "Angaben bearbeiten" }));
    expect(screen.getByLabelText("Ihr Anliegen *")).toHaveValue(message);
  });
});
