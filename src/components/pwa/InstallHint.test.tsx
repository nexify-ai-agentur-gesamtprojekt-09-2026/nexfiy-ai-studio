import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HINWEIS_SCHLUESSEL } from "@/lib/pwa-client";
import { InstallHint } from "./InstallHint";

function angebotMelden(prompt = vi.fn().mockResolvedValue(undefined)) {
  const ereignis = Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
    prompt,
    userChoice: Promise.resolve({ outcome: "dismissed" as const }),
  });
  act(() => {
    window.dispatchEvent(ereignis);
  });
  return { ereignis, prompt };
}

function seiteMitFusszeile() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    '<main id="page-content" tabindex="-1"></main><footer class="site-footer"><details class="footer-legal-details"><summary>Hinweise</summary></details></footer>',
  );
}

beforeEach(() => {
  window.localStorage.clear();
  act(() => {
    window.dispatchEvent(new Event("appinstalled"));
  });
});
afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("Installationshinweis", () => {
  it("erscheint nicht, solange der Browser keine Installation anbietet", () => {
    render(<InstallHint />);
    expect(screen.queryByText("NeXify AI als Web-App")).toBeNull();
  });

  it("erscheint mit dem Angebot des Browsers und nennt, dass es keine Store-App ist", () => {
    render(<InstallHint />);
    const { ereignis } = angebotMelden();
    expect(ereignis.defaultPrevented).toBe(true);
    expect(screen.getByRole("heading", { name: "NeXify AI als Web-App" })).toBeInTheDocument();
    expect(screen.getByText(/keine App aus einem App-Store/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Installieren" })).toBeInTheDocument();
  });

  it("„Nicht jetzt“ merkt die Ablehnung auf dem Gerät und setzt den Fokus in die Fußzeile", () => {
    seiteMitFusszeile();
    render(<InstallHint />);
    angebotMelden();
    fireEvent.click(screen.getByRole("button", { name: "Nicht jetzt" }));
    expect(screen.queryByText("NeXify AI als Web-App")).toBeNull();
    expect(window.localStorage.getItem(HINWEIS_SCHLUESSEL)).toBe("1");
    expect(document.querySelector(".footer-legal-details summary")).toHaveFocus();
  });

  it("bleibt nach der Ablehnung auch bei erneutem Angebot weg", () => {
    window.localStorage.setItem(HINWEIS_SCHLUESSEL, "1");
    render(<InstallHint />);
    angebotMelden();
    expect(screen.queryByText("NeXify AI als Web-App")).toBeNull();
  });

  it("„Installieren“ ruft die Abfrage des Browsers auf und räumt den Hinweis weg", async () => {
    seiteMitFusszeile();
    render(<InstallHint />);
    const { prompt } = angebotMelden();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Installieren" }));
    });
    expect(prompt).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("NeXify AI als Web-App")).toBeNull();
    expect(document.querySelector(".footer-legal-details summary")).toHaveFocus();
  });

  it("gesperrte Datenspeicherung reißt die Seite nicht um: Hinweis erscheint und lässt sich schließen", () => {
    vi.spyOn(window, "localStorage", "get").mockImplementation(() => {
      throw new DOMException("The operation is insecure.", "SecurityError");
    });
    expect(() => render(<InstallHint />)).not.toThrow();
    angebotMelden();
    expect(screen.getByRole("heading", { name: "NeXify AI als Web-App" })).toBeInTheDocument();
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: "Nicht jetzt" })),
    ).not.toThrow();
    expect(screen.queryByText("NeXify AI als Web-App")).toBeNull();
  });
});
