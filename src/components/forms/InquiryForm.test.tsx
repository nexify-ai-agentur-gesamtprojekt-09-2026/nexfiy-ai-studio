import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { InquiryForm } from "./InquiryForm";
vi.mock("@/lib/clipboard", () => ({ copyText: vi.fn().mockResolvedValue(false) }));
afterEach(cleanup);
describe("inquiry preparation", () => {
  it("updates only remaining errors after corrections", () => {
    render(<InquiryForm kind="contact" title="Anfrage" companyLabel="Unternehmen" privacyHref="/datenschutz" />);
    fireEvent.click(screen.getByRole("button",{name:"E-Mail vorbereiten"}));
    fireEvent.change(screen.getByLabelText("Name *"),{target:{value:"Erika Muster"}});
    expect(screen.getAllByRole("textbox").filter((input)=>input.getAttribute("aria-invalid")==="true")).toHaveLength(2);
  });
  it("keeps a long draft readable when copying fails and retains edits", async () => {
    const message="Fahrzeug und benötigtes Ersatzteil. ".repeat(80);
    render(<InquiryForm kind="appointment" title="Termin" companyLabel="Unternehmen" privacyHref="/datenschutz" />);
    fireEvent.change(screen.getByLabelText("Name *"),{target:{value:"Erika Muster"}});
    fireEvent.change(screen.getByLabelText("E-Mail *"),{target:{value:"erika@example.test"}});
    fireEvent.change(screen.getByLabelText("Ihr Anliegen *"),{target:{value:message}});
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button",{name:"E-Mail vorbereiten"}));
    const draft=screen.getByRole("textbox",{name:"Anfrageentwurf"});
    expect(draft).toHaveValue(expect.stringContaining(message.trim()));
    fireEvent.click(screen.getByRole("button",{name:"Text kopieren"}));
    expect(await screen.findByRole("button",{name:"Kopieren nicht möglich"})).toBeEnabled();
    expect(draft).toHaveValue(expect.stringContaining("TEILEKLAR Terminwunsch von Erika Muster"));
    fireEvent.click(screen.getByRole("button",{name:"Angaben bearbeiten"}));
    expect(screen.getByLabelText("Ihr Anliegen *")).toHaveValue(message);
  });
});