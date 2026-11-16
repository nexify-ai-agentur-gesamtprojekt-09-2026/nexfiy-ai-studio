import { beforeEach, describe, expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { CONTACT_HANDOFF_EVENT, CONTACT_HANDOFF_KEY, writeContactHandoff } from "./contact-handoff";
import { useContactHandoff } from "./use-contact-handoff";

function ContactPage() {
  const { handoff, formKey, initialMessage } = useContactHandoff();
  return (
    <section id="anfrage">
      <p data-testid="origin">{handoff?.origin ?? ""}</p>
      <form key={formKey}>
        <input name="name" aria-label="Name" defaultValue="" />
        <input name="email" aria-label="E-Mail" defaultValue="" />
        <textarea name="message" aria-label="Anliegen" defaultValue={initialMessage ?? ""} />
      </form>
    </section>
  );
}

describe("useContactHandoff", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    Element.prototype.scrollIntoView = () => {};
  });

  it("fills the message once on arrival and moves on to the name field", () => {
    writeContactHandoff(window.sessionStorage, "oracle", "Aus dem Chat");
    render(<ContactPage />);
    expect(screen.getByLabelText("Anliegen")).toHaveValue("Aus dem Chat");
    expect(screen.getByTestId("origin")).toHaveTextContent("oracle");
    expect(screen.getByLabelText("Name")).toHaveFocus();
    expect(window.sessionStorage.getItem(CONTACT_HANDOFF_KEY)).toBeNull();
  });

  it("keeps what the visitor typed when a chat on the same page hands over", () => {
    render(<ContactPage />);
    const message = screen.getByLabelText("Anliegen") as HTMLTextAreaElement;
    message.value = "Schon notiert.";
    (screen.getByLabelText("Name") as HTMLInputElement).value = "Erika Muster";
    act(() => {
      writeContactHandoff(window.sessionStorage, "oracle", "Aus dem Chat");
      window.dispatchEvent(new Event(CONTACT_HANDOFF_EVENT));
    });
    expect(message).toHaveValue("Schon notiert.\n\nAus dem Chat");
    expect(screen.getByLabelText("Name")).toHaveValue("Erika Muster");
    expect(screen.getByLabelText("E-Mail")).toHaveFocus();
  });

  it("ignores pages without a pending draft", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText("Anliegen")).toHaveValue("");
    expect(screen.getByTestId("origin")).toHaveTextContent("");
  });
});
