/**
 * Browserseite des KI-Chats: Aufruf von /api/chat, Gesprächszustand und dessen Ablage im Tab.
 *
 * Der Zustand liegt in einem Modul-Speicher (bleibt beim Seitenwechsel innerhalb der Anwendung
 * erhalten) und zusätzlich in `sessionStorage` (übersteht ein Neuladen, endet mit dem Tab). Das
 * ist für die vom Besucher gewünschte Funktion nötig und enthält nur, was er selbst sieht.
 * Hier entsteht nie ein Eintrag ohne echte Antwort des Servers.
 */
import { useSyncExternalStore } from "react";
import { sichererSpeicher } from "@/lib/pwa-client";

export const CHAT_PFAD = "/api/chat";
export const CHAT_MAX_ZEICHEN = 1500;
const SPEICHER_SCHLUESSEL = "nexify-chat-v1";
/** Länger als das Zeitlimit des Servers (60 s), damit dessen ehrliche Meldung ankommt. */
const ZEITLIMIT_MS = 75_000;
const MAX_EINTRAEGE = 60;

export type ChatFehler =
  | "offline"
  | "netz"
  | "zeit"
  | "limit_kurz"
  | "limit_tag"
  | "limit_sitzung"
  | "nicht_verfuegbar"
  | "anbieter"
  | "zu_lang"
  | "unbekannt";

export const CHAT_FEHLERTEXT: Record<ChatFehler, string> = {
  offline:
    "Sie sind offline. Sobald die Verbindung wieder steht, können Sie die Frage erneut senden.",
  netz: "Die Verbindung wurde unterbrochen, bevor die Antwort vollständig war.",
  zeit: "Die Antwort hat zu lange gedauert und wurde abgebrochen.",
  limit_kurz: "Das waren viele Fragen in kurzer Zeit. Bitte versuchen Sie es etwas später erneut.",
  limit_tag: "Das Tageskontingent des KI-Assistenten ist für heute erreicht.",
  limit_sitzung: "In diesem Gespräch ist die Höchstzahl an Fragen erreicht.",
  nicht_verfuegbar: "Der Assistent ist derzeit nicht verfügbar.",
  anbieter: "Der KI-Dienst hat gerade keine Antwort geliefert.",
  zu_lang: `Die Nachricht ist zu lang. Möglich sind höchstens ${CHAT_MAX_ZEICHEN} Zeichen.`,
  unbekannt: "Die Nachricht konnte nicht gesendet werden.",
};

/** Bei diesen Ursachen hilft ein erneutes Senden derselben Frage. */
export const CHAT_WIEDERHOLBAR: ReadonlySet<ChatFehler> = new Set([
  "offline",
  "netz",
  "zeit",
  "limit_kurz",
  "nicht_verfuegbar",
  "anbieter",
  "unbekannt",
]);

export class ChatAbbruch extends Error {
  constructor(readonly art: ChatFehler | "abgebrochen") {
    super(art);
  }
}

function fehlerAusAntwort(status: number, fehler: unknown): ChatFehler {
  if (status === 429) {
    if (fehler === "tageslimit_erreicht") return "limit_tag";
    if (fehler === "sitzungslimit_erreicht") return "limit_sitzung";
    return "limit_kurz";
  }
  if (status === 503) return "nicht_verfuegbar";
  if (status === 504 || fehler === "upstream_zeit") return "zeit";
  if (status === 502 || fehler === "upstream_fehler") return "anbieter";
  if (status === 413 || fehler === "zu_lang") return "zu_lang";
  return "unbekannt";
}

export interface SendeOptionen {
  nachricht: string;
  /** Kennung der Frage; „Erneut senden“ schickt dieselbe, damit der Server sie nicht doppelt führt. */
  frageId: string;
  sessionId: string | null;
  signal: AbortSignal;
  beiSitzung(sessionId: string): void;
  beiText(stueck: string): void;
  beiErsatz(text: string): void;
}

/**
 * Sendet eine Frage und liefert die Antwort stückweise. Wirft `ChatAbbruch` mit der Ursache;
 * `signal` bricht ab (Besucher drückt Stopp).
 */
export async function sendeChatNachricht(optionen: SendeOptionen): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.onLine === false)
    throw new ChatAbbruch("offline");

  const steuerung = new AbortController();
  let zeitAus = false;
  const uhr = setTimeout(() => {
    zeitAus = true;
    steuerung.abort();
  }, ZEITLIMIT_MS);
  const weiterreichen = () => steuerung.abort();
  if (optionen.signal.aborted) steuerung.abort();
  else optionen.signal.addEventListener("abort", weiterreichen, { once: true });
  const abbruch = () => new ChatAbbruch(zeitAus ? "zeit" : "abgebrochen");

  try {
    let antwort: Response;
    try {
      antwort = await fetch(CHAT_PFAD, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "text/event-stream" },
        body: JSON.stringify({
          message: optionen.nachricht,
          frage_id: optionen.frageId,
          ...(optionen.sessionId ? { session_id: optionen.sessionId } : {}),
        }),
        signal: steuerung.signal,
      });
    } catch {
      if (steuerung.signal.aborted) throw abbruch();
      throw new ChatAbbruch(navigator.onLine === false ? "offline" : "netz");
    }

    const typ = antwort.headers.get("content-type") ?? "";
    if (!antwort.ok || !typ.includes("text/event-stream")) {
      let daten: { ok?: unknown; fehler?: unknown; antwort?: unknown; session_id?: unknown } = {};
      try {
        daten = (await antwort.json()) as typeof daten;
      } catch {
        // Kein lesbarer Rumpf (z. B. Fehlerseite eines Proxys): unten als Fehler behandelt.
      }
      if (typeof daten.session_id === "string") optionen.beiSitzung(daten.session_id);
      if (antwort.ok && daten.ok === true && typeof daten.antwort === "string" && daten.antwort) {
        optionen.beiText(daten.antwort);
        return;
      }
      throw new ChatAbbruch(fehlerAusAntwort(antwort.ok ? 500 : antwort.status, daten.fehler));
    }

    if (!antwort.body) throw new ChatAbbruch("netz");
    const leser = antwort.body.getReader();
    const dekoder = new TextDecoder();
    let puffer = "";
    let beendet = false;
    const verarbeite = (block: string) => {
      const name = /^event: ?(.*)$/m.exec(block)?.[1]?.trim();
      const roh = /^data: ?(.*)$/m.exec(block)?.[1];
      if (!name || roh === undefined) return;
      let daten: { t?: unknown; session_id?: unknown; fehler?: unknown };
      try {
        daten = JSON.parse(roh) as typeof daten;
      } catch {
        return;
      }
      if (name === "start" && typeof daten.session_id === "string")
        optionen.beiSitzung(daten.session_id);
      else if (name === "delta" && typeof daten.t === "string") optionen.beiText(daten.t);
      else if (name === "ersetzen" && typeof daten.t === "string") optionen.beiErsatz(daten.t);
      else if (name === "ende") beendet = true;
      else if (name === "fehler") throw new ChatAbbruch(fehlerAusAntwort(502, daten.fehler));
    };
    // Abbruch beendet auch das Lesen, selbst wenn die Laufzeit den Strom nicht selbst abreißt.
    const beendeLesen = () => void leser.cancel().catch(() => {});
    steuerung.signal.addEventListener("abort", beendeLesen, { once: true });
    try {
      for (;;) {
        const { done, value } = await leser.read();
        if (done) break;
        puffer += dekoder.decode(value, { stream: true });
        const bloecke = puffer.split("\n\n");
        puffer = bloecke.pop() ?? "";
        bloecke.forEach(verarbeite);
      }
    } catch (ursache) {
      if (ursache instanceof ChatAbbruch) throw ursache;
      if (steuerung.signal.aborted) throw abbruch();
      throw new ChatAbbruch(navigator.onLine === false ? "offline" : "netz");
    }
    if (steuerung.signal.aborted) throw abbruch();
    if (puffer.trim()) verarbeite(puffer);
    // Strom ohne Abschluss: Die Antwort ist nicht vollständig und wird nicht als fertig gezeigt.
    if (!beendet) throw new ChatAbbruch("netz");
  } finally {
    clearTimeout(uhr);
    optionen.signal.removeEventListener("abort", weiterreichen);
  }
}

/** Fragt den Schalterzustand ab (kein Modellaufruf). Bei Fehlern gilt der Chat als nutzbar. */
export async function ladeChatZustand(): Promise<boolean> {
  try {
    const antwort = await fetch(CHAT_PFAD, { headers: { accept: "application/json" } });
    if (!antwort.ok) return true;
    const daten = (await antwort.json()) as { aktiv?: unknown };
    return daten.aktiv !== false;
  } catch {
    return true;
  }
}

export interface ChatEintrag {
  id: string;
  rolle: "user" | "assistant";
  text: string;
  /** `laeuft`: Antwort trifft ein · `abgebrochen`: unvollständig · `fehler`: keine Antwort. */
  status: "fertig" | "laeuft" | "abgebrochen" | "fehler";
  fehler?: ChatFehler;
}

export interface ChatZustand {
  eintraege: ChatEintrag[];
  sessionId: string | null;
  beschaeftigt: boolean;
  /** Wahl des Besuchers für das angedockte Panel; null = noch keine Wahl. */
  offen: boolean | null;
  /** false, wenn der Betreiber den Chat abgeschaltet hat oder er nicht eingerichtet ist. */
  aktiv: boolean | null;
}

const LEER: ChatZustand = {
  eintraege: [],
  sessionId: null,
  beschaeftigt: false,
  offen: null,
  aktiv: null,
};

let zustand: ChatZustand = LEER;
let geladen = false;
let laufend: AbortController | null = null;
let zaehler = 0;
const hoerer = new Set<() => void>();

function neueId(): string {
  zaehler += 1;
  const zufall =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
  return `n${Date.now().toString(36)}-${zaehler}-${zufall}`.slice(0, 64);
}

/**
 * Sitzungsspeicher des Tabs oder nichts. Bei gesperrter Datenspeicherung wirft schon der Zugriff
 * einen SecurityError; der Chat läuft dann ohne Ablage weiter (Verlauf bis zum Neuladen).
 */
function tabSpeicher(): Storage | undefined {
  if (typeof window === "undefined") return undefined;
  return sichererSpeicher(() => window.sessionStorage);
}

function lade(): void {
  if (geladen || typeof window === "undefined") return;
  geladen = true;
  try {
    const roh = tabSpeicher()?.getItem(SPEICHER_SCHLUESSEL);
    if (!roh) return;
    const daten = JSON.parse(roh) as Partial<ChatZustand>;
    const eintraege = Array.isArray(daten.eintraege)
      ? daten.eintraege
          .filter(
            (e): e is ChatEintrag =>
              Boolean(e) &&
              typeof e.id === "string" &&
              typeof e.text === "string" &&
              (e.rolle === "user" || e.rolle === "assistant"),
          )
          .slice(-MAX_EINTRAEGE)
          // Eine Antwort, die beim Verlassen der Seite noch lief, ist unvollständig.
          .map((e) => (e.status === "laeuft" ? { ...e, status: "abgebrochen" as const } : e))
          .filter((e) => e.rolle === "user" || e.text || e.status === "fehler")
      : [];
    zustand = {
      ...LEER,
      eintraege,
      sessionId: typeof daten.sessionId === "string" ? daten.sessionId : null,
      offen: typeof daten.offen === "boolean" ? daten.offen : null,
    };
  } catch {
    // Kein Zugriff auf den Speicher (privater Modus) oder beschädigte Daten: leer beginnen.
  }
}

/**
 * `ablegen: false` für eintreffende Textstücke: Der Verlauf wird nicht mit jedem Stück neu in den
 * Tab-Speicher geschrieben (das wäre quadratischer Aufwand), sondern bei jedem Statuswechsel.
 */
function setze(aenderung: Partial<ChatZustand>, ablegen = true): void {
  zustand = { ...zustand, ...aenderung };
  if (ablegen) lege();
  hoerer.forEach((melde) => melde());
}

function lege(): void {
  try {
    tabSpeicher()?.setItem(
      SPEICHER_SCHLUESSEL,
      JSON.stringify({
        eintraege: zustand.eintraege.slice(-MAX_EINTRAEGE),
        sessionId: zustand.sessionId,
        offen: zustand.offen,
      }),
    );
  } catch {
    // Ohne Speicher bleibt der Verlauf bis zum Neuladen bestehen.
  }
}

function aendereEintrag(
  id: string,
  aendere: (eintrag: ChatEintrag) => ChatEintrag,
  ablegen = true,
): void {
  setze({ eintraege: zustand.eintraege.map((e) => (e.id === id ? aendere(e) : e)) }, ablegen);
}

async function frage(nachricht: string, frageId: string): Promise<void> {
  const antwortId = neueId();
  const steuerung = new AbortController();
  laufend = steuerung;
  setze({
    beschaeftigt: true,
    eintraege: [
      ...zustand.eintraege,
      { id: antwortId, rolle: "assistant", text: "", status: "laeuft" },
    ],
  });
  try {
    await sendeChatNachricht({
      nachricht,
      frageId,
      sessionId: zustand.sessionId,
      signal: steuerung.signal,
      beiSitzung: (sessionId) => setze({ sessionId }),
      beiText: (stueck) =>
        aendereEintrag(antwortId, (e) => ({ ...e, text: e.text + stueck }), false),
      beiErsatz: (text) => aendereEintrag(antwortId, (e) => ({ ...e, text })),
    });
    aendereEintrag(antwortId, (e) => ({ ...e, text: e.text.trim(), status: "fertig" }));
  } catch (ursache) {
    const art = ursache instanceof ChatAbbruch ? ursache.art : "unbekannt";
    aendereEintrag(antwortId, (e) => {
      if (art === "abgebrochen") return { ...e, status: "abgebrochen" };
      // Mit Teiltext: als unvollständig zeigen und die Ursache nennen. Ohne Text: nur die Meldung.
      return { ...e, status: e.text ? "abgebrochen" : "fehler", fehler: art };
    });
    if (art === "nicht_verfuegbar") void pruefeZustand(true);
  } finally {
    if (laufend === steuerung) laufend = null;
    setze({ beschaeftigt: false });
  }
}

async function pruefeZustand(erneut = false): Promise<void> {
  if (zustand.aktiv !== null && !erneut) return;
  const aktiv = await ladeChatZustand();
  setze({ aktiv });
}

export const chat = {
  /** Sendet eine neue Frage. Liefert false, wenn nichts gesendet wurde. */
  sende(text: string): boolean {
    lade();
    const nachricht = text.trim();
    if (zustand.beschaeftigt || nachricht.length < 2 || nachricht.length > CHAT_MAX_ZEICHEN)
      return false;
    const frageId = neueId();
    setze({
      eintraege: [
        ...zustand.eintraege,
        { id: frageId, rolle: "user", text: nachricht, status: "fertig" },
      ],
    });
    void frage(nachricht, frageId);
    return true;
  },
  /** Sendet die letzte Frage erneut, nachdem die Antwort ausgeblieben oder abgebrochen ist. */
  wiederhole(): void {
    if (zustand.beschaeftigt) return;
    const letzte = zustand.eintraege.at(-1);
    const davor = zustand.eintraege.at(-2);
    if (!letzte || letzte.rolle !== "assistant" || letzte.status === "fertig") return;
    if (!davor || davor.rolle !== "user") return;
    setze({ eintraege: zustand.eintraege.slice(0, -1) });
    void frage(davor.text, davor.id);
  },
  stoppe(): void {
    laufend?.abort();
  },
  /** Leert den Verlauf in diesem Tab und beginnt eine neue Sitzung. */
  leere(): void {
    laufend?.abort();
    setze({ eintraege: [], sessionId: null });
  },
  merkeOffen(offen: boolean): void {
    lade();
    setze({ offen });
  },
  pruefeZustand,
};

function abonniere(melde: () => void): () => void {
  hoerer.add(melde);
  return () => hoerer.delete(melde);
}

function schnappschuss(): ChatZustand {
  lade();
  return zustand;
}

export function useChat(): ChatZustand {
  return useSyncExternalStore(abonniere, schnappschuss, () => LEER);
}

/** Nur für Tests: Speicher und Modulzustand zurücksetzen. */
export function setzeChatZurueck(): void {
  laufend?.abort();
  laufend = null;
  zustand = LEER;
  geladen = false;
  try {
    tabSpeicher()?.removeItem(SPEICHER_SCHLUESSEL);
  } catch {
    // ohne Speicher nichts zu tun
  }
  hoerer.forEach((melde) => melde());
}
