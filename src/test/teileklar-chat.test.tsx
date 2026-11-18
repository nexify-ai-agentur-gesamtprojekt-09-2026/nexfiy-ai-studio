import type { ComponentType } from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("../styles/pages/teileklar.shop.css?raw", () => ({ default: "" }));
import { Route } from "@/routes/teileklar_.shop";

const Shop = Route.options.component as ComponentType;

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("opens and closes the shop help without replacing the page or clearing search input", () => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  render(<Shop />);
  const search = screen.getByRole("searchbox", {
    name: "Artikel, Marke oder Artikelnummer suchen",
  });
  fireEvent.change(search, { target: { value: "Bremse" } });
  fireEvent.click(screen.getByRole("button", { name: "TEILEKLAR Hilfe" }));
  expect(within(document.getElementById("aifly-panel")!).getByRole("status")).toHaveTextContent(
    "Der KI-Chat ist hier noch nicht angebunden",
  );
  expect(document.getElementById("atelier")).toHaveClass("is-open");
  const close = screen.getByRole("button", { name: "Beratung einklappen" });
  expect(close).toHaveFocus();
  fireEvent.click(close);
  expect(document.getElementById("atelier")).toHaveClass("is-closed");
  expect(screen.getByRole("button", { name: "TEILEKLAR Hilfe" })).toHaveFocus();
  expect(screen.getByRole("searchbox", { name: "Artikel, Marke oder Artikelnummer suchen" })).toBe(
    search,
  );
  expect(search).toHaveValue("Bremse");
});
