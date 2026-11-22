import type { ReactNode } from "react";

export interface ShellChat {
  chatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}
import shellCSS from "../../styles/site-shell.css?url";
import {
  useAtelierFilms,
  useChatPanel,
  useImportedMobile,
  useLoopingVideos,
  useShellSignals,
} from "@/lib/imported-site";
import { InstallHint } from "@/components/pwa/InstallHint";
import { GlassLensFilters } from "./GlassLensFilters";
import { NexifyFooter } from "./NexifyFooter";
import { NexifyHeader } from "./NexifyHeader";
import { OracleAside } from "./OracleAside";

/**
 * Page frame of every NeXify page: header, footer, AIFly ORACLE panel and the scroll/footer signals the
 * imported styles react to. Routes pass only their page body.
 */
export function NexifyShell({
  children,
  heroActionSelector,
}: {
  /** Page body; pass a function to reach the chat panel controls (e.g. a call to action that opens it). */
  children: ReactNode | ((chat: ShellChat) => ReactNode);
  heroActionSelector?: string;
}) {
  const isMobile = useImportedMobile();
  const { chatOpen, openChat, closeChat, reopenRef } = useChatPanel(!isMobile);
  const { scrolled, heroActionVisible, footerVisible, viewportHeight } =
    useShellSignals(heroActionSelector);
  useAtelierFilms();
  useLoopingVideos();
  return (
    <div
      className={
        chatOpen ? "workspace-shell site-nexify is-open" : "workspace-shell site-nexify is-closed"
      }
      id="atelier"
      data-hero-action-visible={heroActionSelector && heroActionVisible ? "true" : undefined}
      data-scrolled={scrolled ? "true" : "false"}
      data-chat-compact={isMobile ? undefined : "false"}
      data-footer-visible={footerVisible ? "true" : "false"}
    >
      <link rel="stylesheet" href={shellCSS} precedence="site-shell" />
      <GlassLensFilters />
      <div className="website">
        <a className="skip-link" href="#page-content">
          Zum Inhalt
        </a>
        <NexifyHeader />
        <main id="page-content" tabIndex={-1}>
          {typeof children === "function" ? children({ chatOpen, openChat, closeChat }) : children}
        </main>
        <NexifyFooter />
        <InstallHint />
      </div>
      {!chatOpen && (
        <button
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
          Ihr Projekt mit NeXify
        </button>
      )}
      <OracleAside
        open={chatOpen}
        isMobile={isMobile}
        viewportHeight={viewportHeight}
        onClose={closeChat}
      />
    </div>
  );
}
