import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CatalogUnavailable } from "./CatalogUnavailable";
afterEach(cleanup);
describe("current catalogue query", () => {
  it("passes edited query B after previously submitting A", () => {
    render(<CatalogUnavailable />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Filter A" } });
    fireEvent.click(screen.getByRole("button", { name: "Angabe übernehmen" }));
    fireEvent.change(input, { target: { value: "Filter B" } });
    const href = screen.getByRole("link", { name: "Teil anfragen" }).getAttribute("href");
    const draft = new URL(href ?? "/", "https://app.invalid").searchParams.get("anliegen");
    expect(draft).toContain("Filter B");
    expect(draft).not.toContain("Filter A");
  });
});
