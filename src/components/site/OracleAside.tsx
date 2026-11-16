import { useEffect, type CSSProperties } from "react";
import { ArrowRight, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useOracleAdvice } from "@/lib/use-oracle-advice";
import { OracleHandoff } from "./OracleHandoff";
import { fitComposer, useComposerFit } from "@/lib/imported-site";

/** AIFly ORACLE side panel of the NeXify pages (desktop column, phone dialog). */
export function OracleAside({
  open,
  isMobile,
  viewportHeight,
  onClose,
}: {
  open: boolean;
  isMobile: boolean;
  viewportHeight: number | null;
  onClose: () => void;
}) {
  const composerRef = useComposerFit(open, isMobile, viewportHeight);
  const { messages, draft, setDraft, busy, error, send, reset } = useOracleAdvice();
  useEffect(() => {
    if (composerRef.current) fitComposer(composerRef.current);
  }, [draft, composerRef]);
  useEffect(() => {
    if (!open || busy || !messages.length) return;
    const active = document.activeElement;
    if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
    if (
      active instanceof HTMLElement &&
      active.closest('.site-header, [role="dialog"]:not(#aifly-panel)')
    )
      return;
    composerRef.current?.focus({ preventScroll: true });
  }, [busy, messages.length, open, composerRef]);
  return (
    <aside
      id="aifly-panel"
      className={"aifly-panel oracle-advice"}
      aria-label="AIFly ORACLE"
      role={isMobile ? "dialog" : undefined}
      aria-modal={isMobile && open ? true : undefined}
      hidden={!open}
      style={
        isMobile || viewportHeight === null
          ? undefined
          : ({
              "--chat-viewport-height": viewportHeight + "px",
              "--chat-viewport-top": "0px",
            } as CSSProperties)
      }
    >
      <div className="oracle-heading">
        <div className="oracle-heading-copy">
          <div className="oracle-identity">
            <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
              <img
                src="/site-assets/9176c58a16ff634a.png"
                alt=""
                width="34"
                height="34"
                decoding="async"
              />
            </span>
            <h2>
              <strong>AIFly ORACLE</strong>
              <span>Produktberatung · NeXify AI</span>
            </h2>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Neue Beratung"
            title="Neue Beratung"
            disabled={busy}
            onClick={reset}
          >
            <RotateCcw aria-hidden="true" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Beratung einklappen"
          title="Beratung einklappen"
          type="button"
          className={"nexify-control icon-button panel-minimize"}
          data-variant="icon"
          onClick={onClose}
        >
          <ChevronDown aria-hidden="true" />
        </Button>
      </div>
      <div className="oracle-body">
        <section className="oracle-layout" aria-label="Was planen Sie?">
          <Conversation
            className="oracle-conversation"
            initial={false}
            resize="instant"
            aria-label="Produktberatung"
            aria-live="polite"
            aria-relevant="additions"
            aria-busy={busy}
          >
            <ConversationContent className="oracle-scroll">
              {messages.length === 0 && (
                <div className="oracle-intro">
                  <div className="oracle-host">
                    <span className={"orientation-host-figure"} aria-hidden="true">
                      <img
                        src="/site-assets/9176c58a16ff634a.png"
                        alt=""
                        width="512"
                        height="512"
                        decoding="async"
                      />
                    </span>
                  </div>
                  <h3>Suite oder API?</h3>
                  <p>
                    Was möchten Sie umsetzen? Ich ordne Ihr Vorhaben anhand unserer öffentlichen
                    Produktinformationen ein und zeige Ihnen den passenden Einstieg.
                  </p>
                </div>
              )}
              {messages.length === 0 && (
                <div className="oracle-starters" role="group" aria-label="Vorhaben auswählen">
                  {[
                    {
                      title: "KI im Arbeitsalltag",
                      detail: "Dokumente, Aufgaben und Wissen bündeln.",
                      prompt:
                        "Ich möchte mit meinem Team Dokumente bearbeiten, Aufgaben organisieren und unser Projektwissen mit KI nutzen. Passt die Suite?",
                    },
                    {
                      title: "KI in eigener Software",
                      detail: "Eine bestehende Anwendung erweitern.",
                      prompt:
                        "Ich entwickle eine eigene Anwendung und möchte KI-Funktionen über eine Schnittstelle integrieren. Passt die API?",
                    },
                    {
                      title: "Den passenden Weg finden",
                      detail: "Suite und API für mein Vorhaben vergleichen.",
                      prompt:
                        "Ich möchte KI selbst einsetzen. Worin unterscheiden sich Suite und API und was muss ich für meine Entscheidung klären?",
                    },
                  ].map((starter, index) => (
                    <Button
                      key={starter.title}
                      variant="ghost"
                      className="oracle-starter"
                      disabled={busy}
                      onClick={() => void send(starter.prompt)}
                    >
                      <span className="orientation-starter-index" aria-hidden="true">
                        0{index + 1}
                      </span>
                      <span className="orientation-starter-copy">
                        <strong>{starter.title}</strong>
                        <small>{starter.detail}</small>
                      </span>
                      <ArrowRight aria-hidden="true" />
                    </Button>
                  ))}
                </div>
              )}
              <div className="orientation-history" aria-busy={busy}>
                {messages.map((message, index) => (
                  <Message
                    from={message.role}
                    className="oracle-message"
                    data-role={message.role}
                    key={index}
                  >
                    <MessageContent className="oracle-message-content">
                      <span className="oracle-message-author">
                        {message.role === "assistant" && (
                          <img
                            src="/site-assets/9176c58a16ff634a.png"
                            alt=""
                            width="24"
                            height="24"
                            aria-hidden="true"
                          />
                        )}
                        <span>{message.role === "user" ? "Sie" : "AIFly ORACLE"}</span>
                      </span>
                      {message.role === "assistant" ? (
                        <MessageResponse
                          className="oracle-response"
                          mode="static"
                          isAnimating={false}
                          parseIncompleteMarkdown={false}
                          plugins={{}}
                          controls={false}
                          skipHtml
                          allowedElements={[
                            "p",
                            "strong",
                            "em",
                            "ul",
                            "ol",
                            "li",
                            "h3",
                            "h4",
                            "blockquote",
                            "br",
                          ]}
                          unwrapDisallowed
                        >
                          {message.content}
                        </MessageResponse>
                      ) : (
                        <p className="oracle-user-text">{message.content}</p>
                      )}
                      {message.links && (
                        <nav className="oracle-entry-links" aria-label="Passender Einstieg">
                          {message.links.map((link) => (
                            <Button variant="outline" asChild key={link.path}>
                              <a href={link.path}>
                                {link.label}
                                <ArrowRight aria-hidden="true" />
                              </a>
                            </Button>
                          ))}
                        </nav>
                      )}
                    </MessageContent>
                  </Message>
                ))}
                {busy && (
                  <div className="oracle-pending" role="status">
                    <Shimmer>ORACLE ordnet Ihr Vorhaben ein…</Shimmer>
                  </div>
                )}
              </div>
              {!busy && messages.at(-1)?.role === "assistant" && (
                <OracleHandoff
                  key={messages.length}
                  messages={messages}
                  onTransferred={isMobile ? onClose : undefined}
                />
              )}
              {error && (
                <div className="oracle-error" role="alert">
                  <p>{error}</p>
                  <nav className="oracle-entry-links" aria-label="Produktinformationen">
                    <a href="/produkte/nex2fly">Suite ansehen</a>
                    <a href="/produkte/api">API ansehen</a>
                  </nav>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton aria-label="Zur neuesten Antwort" />
          </Conversation>
          <label htmlFor="orientation-message" className="visually-hidden">
            Ihr Vorhaben
          </label>
          <PromptInput
            onSubmit={() => {
              void send(draft);
            }}
            className="oracle-composer"
            maxFiles={0}
          >
            <PromptInputTextarea
              ref={composerRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              id="orientation-message"
              maxLength={1000}
              rows={1}
              placeholder="Was möchten Sie mit KI umsetzen?"
              aria-describedby="orientation-keys"
              required
              enterKeyHint="send"
              readOnly={busy}
            />
            <span id="orientation-keys" className={"visually-hidden"}>
              Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.
            </span>
            <PromptInputFooter className="oracle-composer-actions justify-end">
              <PromptInputSubmit
                className="oracle-submit"
                status={busy ? "submitted" : "ready"}
                disabled={busy || !draft.trim()}
                aria-label="Nachricht senden"
              />
            </PromptInputFooter>
          </PromptInput>
          <p className="oracle-note">
            KI-Beratung · Angaben bitte auf der Produktseite prüfen. Keine vertraulichen Daten
            eingeben. <a href="/datenschutz">Datenschutz</a>
          </p>
        </section>
      </div>
    </aside>
  );
}
