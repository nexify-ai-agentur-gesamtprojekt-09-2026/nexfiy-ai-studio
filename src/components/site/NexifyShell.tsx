import type { ReactNode } from "react";

export interface ShellChat {
  chatOpen: boolean;
  /** null, wenn der Chat abgeschaltet ist: Knöpfe, die ihn öffnen würden, führen dann zu /kontakt. */
  openChat: (() => void) | null;
  closeChat: () => void;
}
import shellCSS from "../../styles/site-shell.css?url";
import {
  useAtelierFilms,
  useImportedMobile,
  useLoopingVideos,
  useShellSignals,
} from "@/lib/imported-site";
import { InstallHint } from "@/components/pwa/InstallHint";
import { useChatDock } from "@/lib/chat-dock";
import { chatSchalterAn } from "@/lib/chat-schalter";
import { ChatDock } from "../chat/ChatDock";
import { GlassLensFilters } from "./GlassLensFilters";
import { NexifyFooter } from "./NexifyFooter";
import { NexifyHeader } from "./NexifyHeader";

/**
 * Page frame of every NeXify page: header, footer, KI-Chat (ChatDock) and the scroll/footer signals the
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
  // Vom Server ins HTML gerendert (src/lib/chat-schalter.ts). Aus: kein Auslöser, kein Panel, kein
  // Aufruf von /api/chat, kein Sitzungsspeicher und keine Spalte ab 1200 px.
  const chatAn = chatSchalterAn();
  const dock = useChatDock();
  const chatOpen = chatAn && dock.offen === true;
  // Die Spalte neben der Seite gibt es nur, wenn das Panel angedockt offen ist (ab 1200 px).
  const docked = chatOpen && dock.breit === true;
  const { scrolled, heroActionVisible, footerVisible } = useShellSignals(heroActionSelector);
  useAtelierFilms();
  useLoopingVideos();
  return (
    <div
      className={
        docked ? "workspace-shell site-nexify is-open" : "workspace-shell site-nexify is-closed"
      }
      id="atelier"
      data-nxc={!chatAn ? "aus" : dock.offen === null ? "auto" : dock.offen ? "offen" : "zu"}
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
          {typeof children === "function"
            ? children({
                chatOpen,
                openChat: chatAn ? dock.oeffne : null,
                closeChat: dock.schliesse,
              })
            : children}
        </main>
        <NexifyFooter />
        <InstallHint />
      </div>
      {chatAn && <ChatDock dock={dock} />}
    </div>
  );
}
