import type { ReactNode } from "react";

export interface ShellChat {
  chatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}
import {
  useAtelierFilms,
  useChatPanel,
  useImportedMobile,
  useLoopingVideos,
  useShellSignals,
} from "@/lib/imported-site";
import { GlassLensFilters } from "./GlassLensFilters";
import { NexifyFooter } from "./NexifyFooter";
import { NexifyHeader } from "./NexifyHeader";
import { OracleAside } from "./OracleAside";
import { PageSplit } from "./PageSplit";
import { Button } from "@/components/ui/button";
import { TeileklarHeader } from "./TeileklarHeader";
import { TeileklarFooter } from "./TeileklarFooter";
import { TeileklarHelp } from "./TeileklarHelp";
import { useMobilePanelFocus, useImportedActions } from "@/lib/imported-site";

/**
 * Page frame of every NeXify page: header, footer, AIFly ORACLE panel and the scroll/footer signals the
 * imported styles react to. Routes pass only their page body.
 */
export function NexifyShell({
  children,
  heroActionSelector,
  brand = "nexify",
}: {
  /** Page body; pass a function to reach the chat panel controls (e.g. a call to action that opens it). */
  children: ReactNode | ((chat: ShellChat) => ReactNode);
  heroActionSelector?: string;
  brand?: "nexify" | "teileklar";
}) {
  const isMobile = useImportedMobile();
  const { chatOpen, openChat, closeChat, reopenRef } = useChatPanel(!isMobile);
  const { scrolled, heroActionVisible, footerVisible, viewportHeight } =
    useShellSignals(heroActionSelector);
  useAtelierFilms();
  useLoopingVideos();
  useMobilePanelFocus(chatOpen, isMobile);
  useImportedActions();
  const isTeileklar = brand === "teileklar";
  return (
    <div
      className={`workspace-shell site-shared site-${brand} ${chatOpen ? "is-open" : "is-closed"}`}
      id="atelier"
      data-hero-action-visible={heroActionSelector && heroActionVisible ? "true" : undefined}
      data-scrolled={scrolled ? "true" : "false"}
      data-chat-compact={isMobile ? undefined : "false"}
      data-footer-visible={footerVisible ? "true" : "false"}
      data-mobile-chat={isMobile && chatOpen ? "true" : undefined}
    >
      <GlassLensFilters />
      <PageSplit
        open={chatOpen}
        mobile={isMobile}
        page={
          <div className="website">
            <a className="skip-link" href="#page-content">
              Zum Inhalt
            </a>
            {isTeileklar ? <TeileklarHeader /> : <NexifyHeader />}
            <main id="page-content" tabIndex={-1}>
              {typeof children === "function"
                ? children({ chatOpen, openChat, closeChat })
                : children}
            </main>
            {isTeileklar ? <TeileklarFooter /> : <NexifyFooter />}
          </div>
        }
        chat={
          isTeileklar ? (
            <TeileklarHelp open={chatOpen} mobile={isMobile} onClose={closeChat} />
          ) : (
            <OracleAside
              open={chatOpen}
              isMobile={isMobile}
              viewportHeight={viewportHeight}
              onClose={closeChat}
            />
          )
        }
      />
      {!chatOpen && (
        <Button
          variant="glass"
          ref={reopenRef}
          aria-expanded="false"
          aria-controls="aifly-panel"
          type="button"
          className="nexify-control secondary-button reopen-chat"
          data-variant="secondary"
          onClick={openChat}
        >
          <span className="aifly-symbol oracle-companion" data-state="idle" aria-hidden="true">
            <img
              alt=""
              width="34"
              height="34"
              decoding="async"
              src="/site-assets/9176c58a16ff634a.png"
            />
          </span>
          {isTeileklar ? "TEILEKLAR Hilfe" : "Ihr Projekt mit NeXify"}
        </Button>
      )}
    </div>
  );
}
