import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InquiryForm } from "./InquiryForm";

function formular() {
  return render(
    <InquiryForm
      kind="contact"
      title="Anfrage senden"
      companyLabel="Unternehmen"
      privacyHref="/datenschutz"
    />,
  );
}

function ausfuellen() {
  fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Erika Muster" } });
  fireEvent.change(screen.getByLabelText(/^E-Mail/), { target: { value: "erika@firma.de" } });
  fireEvent.change(screen.getByLabelText(/^Ihr Anliegen/), {
    target: { value: "Wir möchten unser Vorhaben mit Ihnen besprechen." },
  });
  fireEvent.click(screen.getByRole("checkbox"));
}

beforeEach(() => {
  vi.stubGlobal("crypto", { randomUUID: () => "00000000-0000-4000-8000-000000000000" });
});
afterEach(() => vi.unstubAllGlobals());

describe("Anfrageformular: Fehlerzustand ist keine Sackgasse", () => {
  it("zeigt bei abgelehntem Versand Meldung, E-Mail-Weg, Kopieren und den Weg zurück", async () => {
    vi.stubGlobal("fetch", async () =>
      Response.json(
        { fehler: "Die Anfrage konnte gerade nicht angenommen werden." },
        { status: 503 },
      ),
    );
    const { container } = formular();
    ausfuellen();
    fireEvent.submit(container.querySelector("form")!);

    const titel = await screen.findByRole("heading", { name: "Anfrage noch nicht gesendet." });
    // Der Fokus landet auf der Überschrift des Blocks, nicht im Nichts.
    await waitFor(() => expect(titel).toHaveFocus());
    expect(screen.queryByRole("heading", { name: "Anfrage eingegangen." })).toBeNull();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Die Anfrage konnte gerade nicht angenommen werden.",
    );
    expect(screen.getByRole("alert")).not.toHaveTextContent(/503|Speicher/);
    expect(screen.getByRole("link", { name: "E-Mail jetzt öffnen" })).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:/),
    );
    expect(screen.getByRole("button", { name: /kopieren/i })).toBeInTheDocument();
    expect(container.querySelector("form")).not.toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Angaben bearbeiten" }));
    await waitFor(() => expect(container.querySelector("form")).toBeVisible());
    // Die Eingaben sind noch da.
    expect(screen.getByLabelText(/^Name/)).toHaveValue("Erika Muster");
    expect(screen.queryByRole("heading", { name: "Anfrage noch nicht gesendet." })).toBeNull();
  });

  it("bleibt auch ohne Netz bedienbar", async () => {
    vi.stubGlobal("fetch", async () => {
      throw new TypeError("offline");
    });
    const { container } = formular();
    ausfuellen();
    fireEvent.submit(container.querySelector("form")!);
    await screen.findByRole("heading", { name: "Anfrage noch nicht gesendet." });
    expect(screen.getByRole("button", { name: "Angaben bearbeiten" })).toBeInTheDocument();
  });

  it("meldet den Eingang mit Anfrage-Nummer, wenn der Server annimmt", async () => {
    vi.stubGlobal("fetch", async () => Response.json({ ok: true, nummer: "NX-20261122-ABCDEF" }));
    const { container } = formular();
    ausfuellen();
    fireEvent.submit(container.querySelector("form")!);
    await screen.findByRole("heading", { name: "Anfrage eingegangen." });
    expect(screen.getByText("NX-20261122-ABCDEF")).toBeInTheDocument();
  });

  it("„Weitere Anfrage stellen“ beginnt mit einem leeren Formular", async () => {
    vi.stubGlobal("fetch", async () => Response.json({ ok: true, nummer: "NX-20261122-ABCDEF" }));
    const { container } = formular();
    ausfuellen();
    fireEvent.submit(container.querySelector("form")!);
    fireEvent.click(await screen.findByRole("button", { name: "Weitere Anfrage stellen" }));
    await waitFor(() => expect(screen.queryByText("NX-20261122-ABCDEF")).toBeNull());
    expect(screen.getByLabelText(/^Name/)).toHaveValue("");
    expect(screen.getByLabelText(/^E-Mail/)).toHaveValue("");
    expect(screen.getByLabelText(/^Ihr Anliegen/)).toHaveValue("");
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByLabelText(/^Name/)).toHaveFocus();
    expect(container.querySelector('[aria-invalid="true"]')).toBeNull();
  });
});

describe("Anfrageformular: ohne JavaScript und gegen automatische Einträge", () => {
  it("kennzeichnet Pflichtfelder für den Browser und hält ein unsichtbares Köderfeld leer", () => {
    const { container } = formular();
    for (const feld of ["name", "email", "message", "consent"])
      expect(container.querySelector(`[name="${feld}"]`)).toBeRequired();
    expect(container.querySelector('[name="company"]')).not.toBeRequired();
    const koeder = container.querySelector<HTMLInputElement>('[name="website"]')!;
    expect(koeder.value).toBe("");
    expect(koeder.tabIndex).toBe(-1);
    expect(koeder.closest("[aria-hidden=true]")).not.toBeNull();
  });
});
