import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthForm } from "./AuthForm";
const auth = vi.hoisted(() => ({
  signInWithPassword: vi.fn().mockResolvedValue({ error: new Error("network unavailable") }),
  signUp: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
}));
const router = vi.hoisted(() => ({ searchStr: "" }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth } }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  useRouterState: ({ select }: { select: (s: { location: { searchStr: string } }) => string }) =>
    select({ location: { searchStr: router.searchStr } }),
}));
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  router.searchStr = "";
});
describe("authentication feedback", () => {
  it("keeps provider failures separate from valid input fields", async () => {
    render(<AuthForm mode="login" />);
    fireEvent.change(screen.getByLabelText("E-Mail-Adresse"), {
      target: { value: "person@example.test" },
    });
    fireEvent.change(screen.getByLabelText("Passwort", { exact: true }), {
      target: { value: "test-only" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Anmelden" }));
    await waitFor(() => expect(auth.signInWithPassword).toHaveBeenCalledTimes(1));
    expect(await screen.findByRole("alert")).toBeVisible();
    expect(screen.getByLabelText("E-Mail-Adresse")).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByLabelText("Passwort", { exact: true })).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });
  it("preserves the original consent request in signup's email return", async () => {
    const next = "/.lovable/oauth/consent?authorization_id=NX-MCP-01#decision";
    router.searchStr = "?next=" + encodeURIComponent(next);
    render(<AuthForm mode="signup" />);
    fireEvent.change(screen.getByLabelText("E-Mail-Adresse"), { target: { value: "person@example.test" } });
    fireEvent.change(screen.getByLabelText("Passwort", { exact: true }), { target: { value: "valid-test-password" } });
    fireEvent.click(screen.getByRole("button", { name: "Konto erstellen" }));
    await waitFor(() => expect(auth.signUp).toHaveBeenCalledTimes(1));
    expect(auth.signUp.mock.calls[0]?.[0].options.emailRedirectTo).toBe(new URL(next, window.location.origin).href);
  });
  it("rejects an external signup return without changing provider settings", async () => {
    router.searchStr = "?next=" + encodeURIComponent("/\\outside.example/");
    render(<AuthForm mode="signup" />);
    fireEvent.change(screen.getByLabelText("E-Mail-Adresse"), { target: { value: "person@example.test" } });
    fireEvent.change(screen.getByLabelText("Passwort", { exact: true }), { target: { value: "valid-test-password" } });
    fireEvent.click(screen.getByRole("button", { name: "Konto erstellen" }));
    await waitFor(() => expect(auth.signUp).toHaveBeenCalledTimes(1));
    expect(auth.signUp.mock.calls[0]?.[0].options.emailRedirectTo).toBe(new URL("/konto", window.location.origin).href);
  });
});
