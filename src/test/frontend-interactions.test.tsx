import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OracleAside } from "@/components/site/OracleAside";
import { useChatPanel, useHeaderMenus, useImportedMobile } from "@/lib/imported-site";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function PanelHarness() {
  const isMobile = useImportedMobile();
  const { chatOpen, openChat, closeChat, reopenRef } = useChatPanel(false);
  return (
    <div id="atelier">
      <div className="website">
        <button onClick={openChat}>Beratung öffnen</button>
      </div>
      {!chatOpen && (
        <button ref={reopenRef} onClick={openChat}>
          Hilfe
        </button>
      )}
      <OracleAside open={chatOpen} isMobile={isMobile} viewportHeight={800} onClose={closeChat} />
    </div>
  );
}

describe("chat availability and keyboard navigation", () => {
  it("explains the missing backend instead of accepting an unsendable message", () => {
    render(<OracleAside open isMobile={false} viewportHeight={800} onClose={() => {}} />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Der KI-Chat ist hier noch nicht angebunden",
    );
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Anliegen persönlich besprechen" })).toHaveAttribute(
      "href",
      "/kontakt#anfrage",
    );
  });

  it("opens at a usable control, closes on Escape and returns focus to the opener", () => {
    render(<PanelHarness />);
    const opener = screen.getByRole("button", { name: "Beratung öffnen" });
    opener.focus();
    fireEvent.click(opener);
    expect(screen.getByRole("button", { name: "Beratung einklappen" })).toHaveFocus();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(opener).toHaveFocus();
    expect(screen.getByRole("button", { name: "Hilfe" })).toBeVisible();
  });
});

it("opens the area selected in the site guide", async () => {
  const { SiteGuide } = await import("@/components/site/SiteGuide");
  render(<SiteGuide />);
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "teileklar-workshop" } });
  expect(screen.getByRole("link", { name: "Bereich öffnen" })).toHaveAttribute(
    "href",
    "/teileklar/werkstatt",
  );
});

it("traps focus only in the open phone dialog and restores the page on close", () => {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(max-width: 767px)",
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
  render(<PanelHarness />);
  const opener = screen.getByRole("button", { name: "Beratung öffnen" });
  opener.focus();
  fireEvent.click(opener);
  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");
  expect(document.querySelector<HTMLElement>(".website")?.inert).toBe(true);
  expect(document.body.style.overflow).toBe("hidden");
  const close = screen.getByRole("button", { name: "Beratung einklappen" });
  const last = screen.getByRole("link", { name: "Datenschutz" });
  last.focus();
  fireEvent.keyDown(window, { key: "Tab" });
  expect(close).toHaveFocus();
  fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
  expect(last).toHaveFocus();
  fireEvent.keyDown(window, { key: "Escape" });
  expect(opener).toHaveFocus();
  expect(document.querySelector<HTMLElement>(".website")?.inert).toBe(false);
  expect(document.body.style.overflow).toBe("");
});

function MenuHarness() {
  const { openMenu, productsSummary, toggleMenu } = useHeaderMenus();
  return (
    <>
      <details open={openMenu === "products"}>
        <summary
          ref={productsSummary}
          onClick={toggleMenu("products")}
          aria-expanded={openMenu === "products"}
        >
          Produkte
        </summary>
        <a href="/leistungen">Leistungen</a>
      </details>
      <button>Außerhalb</button>
    </>
  );
}

it("closes header menus on Escape with focus return, and on outside focus", () => {
  render(<MenuHarness />);
  const summary = screen.getByText("Produkte");
  fireEvent.click(summary);
  expect(summary).toHaveAttribute("aria-expanded", "true");
  fireEvent.keyDown(window, { key: "Escape" });
  expect(summary).toHaveFocus();
  expect(summary).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(summary);
  screen.getByRole("button", { name: "Außerhalb" }).focus();
  fireEvent.focusIn(screen.getByRole("button", { name: "Außerhalb" }));
  expect(summary).toHaveAttribute("aria-expanded", "false");
});
