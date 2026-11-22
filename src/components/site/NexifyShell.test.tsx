import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NexifyShell } from "@/components/site/NexifyShell";
import { setzeChatZurueck } from "@/lib/chat-client";
import { CHAT_SCHALTER_ATTRIBUT, chatSchalterAn, setzeChatSchalter } from "@/lib/chat-schalter";

vi.mock("@/hooks/use-current-page", () => ({ useCurrentPage: () => () => undefined }));

/** Wie die Startseite: „Vorhaben schildern“ öffnet den Chat oder führt zum Kontaktformular. */
function Seite() {
  return (
    <NexifyShell>
      {({ openChat }) =>
        openChat ? (
          <button type="button" onClick={openChat}>
            Vorhaben schildern
          </button>
        ) : (
          <a href="/kontakt">Vorhaben schildern</a>
        )
      }
    </NexifyShell>
  );
}

const aufrufe: string[] = [];

beforeEach(() => {
  aufrufe.length = 0;
  setzeChatZurueck();
  window.sessionStorage.clear();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
  );
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      aufrufe.push(url);
      return new Response(JSON.stringify({ ok: true, aktiv: true }), { status: 200 });
    }),
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute(CHAT_SCHALTER_ATTRIBUT);
  document.documentElement.removeAttribute("data-nxc-vorliebe");
  setzeChatZurueck();
});

describe("Chat-Schalter im Seiten-HTML", () => {
  it("gilt ohne ausdrückliches „an“ als aus", () => {
    expect(chatSchalterAn()).toBe(false);
    document.documentElement.setAttribute(CHAT_SCHALTER_ATTRIBUT, "aus");
    expect(chatSchalterAn()).toBe(false);
    document.documentElement.setAttribute(CHAT_SCHALTER_ATTRIBUT, "an");
    expect(chatSchalterAn()).toBe(true);
    // Im Browser zählt allein das gerenderte HTML, nie ein Wert im Speicher des Skripts.
    setzeChatSchalter(false);
    expect(chatSchalterAn()).toBe(true);
  });

  it("aus: kein Auslöser, kein Panel, keine Abfrage, kein Sitzungsspeicher, Knopf führt zu /kontakt", async () => {
    document.documentElement.setAttribute(CHAT_SCHALTER_ATTRIBUT, "aus");
    const { container } = render(<Seite />);
    await act(async () => {});
    expect(screen.queryByRole("button", { name: /Frage stellen/ })).toBeNull();
    expect(document.getElementById("nexify-chat")).toBeNull();
    expect(document.getElementById("nexify-chat-ausloeser")).toBeNull();
    // Auch das Skript, das die angedockte Spalte vor dem ersten Bild öffnen würde, fehlt.
    expect(container.innerHTML).not.toContain("nexify-chat-v1");
    expect(container.querySelector("#atelier")).toHaveAttribute("data-nxc", "aus");
    expect(screen.getByRole("link", { name: "Vorhaben schildern" })).toHaveAttribute(
      "href",
      "/kontakt",
    );
    expect(aufrufe).toEqual([]);
    expect(window.sessionStorage.length).toBe(0);
  });

  it("an: Auslöser und Knopf öffnen den Chat wie bisher", async () => {
    document.documentElement.setAttribute(CHAT_SCHALTER_ATTRIBUT, "an");
    render(<Seite />);
    expect(screen.getByRole("button", { name: /Frage stellen/ })).toBeInTheDocument();
    expect(aufrufe).toEqual([]);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Vorhaben schildern" }));
    });
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(await screen.findByLabelText("Ihre Frage an den KI-Assistenten")).toBeInTheDocument();
    expect(aufrufe).toEqual(["/api/chat"]);
  });
});
