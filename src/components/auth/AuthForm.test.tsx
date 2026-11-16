import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthForm } from "./AuthForm";
const auth=vi.hoisted(()=>({signInWithPassword:vi.fn().mockResolvedValue({error:new Error("network unavailable")})}));
vi.mock("@/integrations/supabase/client",()=>({supabase:{auth}}));
vi.mock("@tanstack/react-router",()=>({useNavigate:()=>vi.fn()}));
afterEach(()=>{cleanup();vi.clearAllMocks();});
describe("authentication feedback",()=>{
  it("keeps provider failures separate from valid input fields",async()=>{
    render(<AuthForm mode="login" />);
    fireEvent.change(screen.getByLabelText("E-Mail-Adresse"),{target:{value:"person@example.test"}});
    fireEvent.change(screen.getByLabelText("Passwort",{exact:true}),{target:{value:"test-only"}});
    fireEvent.click(screen.getByRole("button",{name:"Anmelden"}));
    await waitFor(()=>expect(auth.signInWithPassword).toHaveBeenCalledTimes(1));
    expect(await screen.findByRole("alert")).toBeVisible();
    expect(screen.getByLabelText("E-Mail-Adresse")).toHaveAttribute("aria-invalid","false");
    expect(screen.getByLabelText("Passwort",{exact:true})).toHaveAttribute("aria-invalid","false");
  });
});