/**
 * Zustand „offen/geschlossen“ des KI-Chats und was Seitenrahmen und Panel dafür teilen.
 * Eigene Datei, damit `ChatDock.tsx` nur die Komponente exportiert.
 */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { chat, useChat } from "@/lib/chat-client";

/** Ab dieser Breite steht das Panel als eigene Spalte neben der Seite; darunter ist es ein Dialog. */
export const CHAT_BREIT = "(min-width: 1200px)";
export const CHAT_PANEL_ID = "nexify-chat";
export const CHAT_AUSLOESER_ID = "nexify-chat-ausloeser";
export const CHAT_EINGABE_ID = "nexify-chat-eingabe";

/** Einstiegsfragen: Jede löst eine echte Anfrage an den Assistenten aus. */
export const CHAT_EINSTIEGE = [
  "Welche Leistungen bietet NeXify AI an?",
  "Wie läuft ein Projekt mit NeXify AI ab?",
  "Was sollte ich für eine erste Anfrage vorbereiten?",
  "Wie erfahre ich, was mein Vorhaben kostet?",
] as const;

/**
 * Setzt vor dem ersten Bildaufbau die gespeicherte Wahl „offen“, damit das angedockte Panel auf
 * Folgeseiten ohne Sprung steht. Fester Text ohne Fremdinhalt.
 */
export const CHAT_VORLIEBE_SKRIPT =
  'try{var s=sessionStorage.getItem("nexify-chat-v1");if(s&&JSON.parse(s).offen===true)document.documentElement.setAttribute("data-nxc-vorliebe","offen")}catch(e){}';

function abonniereBreite(melde: () => void) {
  const abfrage = matchMedia(CHAT_BREIT);
  abfrage.addEventListener("change", melde);
  return () => abfrage.removeEventListener("change", melde);
}

export interface ChatDockZustand {
  /** null bis zur Hydration: dann entscheidet allein das Stylesheet. */
  offen: boolean | null;
  /** true: Spalte neben der Seite · false: Dialog über der Seite · null: noch unbekannt. */
  breit: boolean | null;
  oeffne: () => void;
  schliesse: () => void;
  ausloeser: RefObject<HTMLButtonElement | null>;
}

/**
 * Der Chat ist überall geschlossen, bis der Besucher ihn öffnet. Nur wer ihn angedockt (ab 1200 px)
 * geöffnet hat, findet ihn auf den nächsten Seiten wieder offen – dort verdeckt er nichts.
 */
export function useChatDock(): ChatDockZustand {
  const { offen: vorliebe } = useChat();
  const breit = useSyncExternalStore<boolean | null>(
    abonniereBreite,
    () => matchMedia(CHAT_BREIT).matches,
    () => null,
  );
  const [gewaehlt, setGewaehlt] = useState<boolean | null>(null);
  const ausloeser = useRef<HTMLButtonElement>(null);
  /** Das Element, von dem aus geöffnet wurde (Auslöser unten rechts oder eine Schaltfläche der Seite). */
  const herkunft = useRef<HTMLElement | null>(null);
  const fokusZiel = useRef<"panel" | "herkunft" | null>(null);
  const offen = breit === null ? null : (gewaehlt ?? (breit ? vorliebe === true : false));

  // Wird das Fenster schmal, klappt ein nur angedockt geöffnetes Panel ein, statt die Seite zu verdecken.
  useEffect(() => {
    if (breit === false) setGewaehlt(null);
  }, [breit]);

  const oeffne = useCallback(() => {
    const aktiv = document.activeElement;
    herkunft.current = aktiv instanceof HTMLElement && aktiv !== document.body ? aktiv : null;
    fokusZiel.current = "panel";
    setGewaehlt(true);
    if (matchMedia(CHAT_BREIT).matches) chat.merkeOffen(true);
  }, []);
  const schliesse = useCallback(() => {
    fokusZiel.current = "herkunft";
    setGewaehlt(false);
    if (matchMedia(CHAT_BREIT).matches) chat.merkeOffen(false);
  }, []);

  useEffect(() => {
    const ziel = fokusZiel.current;
    fokusZiel.current = null;
    if (ziel === "herkunft") {
      // Zurück zu dem Element, das geöffnet hat; nur wenn es nicht mehr da ist, zum Auslöser.
      const zurueck = herkunft.current;
      herkunft.current = null;
      if (zurueck && zurueck.isConnected && zurueck.id !== CHAT_AUSLOESER_ID) zurueck.focus();
      else ausloeser.current?.focus();
    }
    if (ziel === "panel") {
      // Auf Touch-Geräten nicht sofort die Bildschirmtastatur öffnen: erst den Dialog zeigen.
      const grob = matchMedia("(pointer: coarse)").matches;
      const element = grob
        ? document.getElementById(CHAT_PANEL_ID)
        : document.getElementById(CHAT_EINGABE_ID);
      (element ?? document.getElementById(CHAT_PANEL_ID))?.focus();
    }
  }, [offen]);

  return { offen, breit, oeffne, schliesse, ausloeser };
}
