import type { ReactNode } from "react";
import { CHAT_KONTAKT_MAIL, CHAT_SEITEN } from "@/lib/chat-seiten";

/**
 * Zeigt Chattext sicher an: Jede Ausgabe wird als React-Textknoten gesetzt, nie als HTML.
 * Erkannt werden nur Absätze, Listen, **fett** und Verweise auf bekannte eigene Seiten
 * (`CHAT_SEITEN`, ein bloßer Pfad wie /kontakt erscheint mit dem Seitentitel) sowie die Kontaktadresse. Alles andere – auch Tags, fremde Adressen und
 * `javascript:`-Links – bleibt sichtbarer Text.
 */

const INLINE =
  /\*\*([^*\n]{1,200})\*\*|\[([^\]\n]{1,80})\]\(([^)\s]{1,160})\)|(\/[a-z0-9][a-z0-9/-]*)/g;

function bekannterPfad(roh: string): string | null {
  const pfad = roh.length > 1 ? roh.replace(/\/+$/, "") : roh;
  return Object.prototype.hasOwnProperty.call(CHAT_SEITEN, pfad) ? pfad : null;
}

function mitMail(text: string, schluessel: string): ReactNode[] {
  const teile = text.split(CHAT_KONTAKT_MAIL);
  return teile.flatMap((teil, index) =>
    index === 0
      ? [teil]
      : [
          <a key={`${schluessel}-m${index}`} href={`mailto:${CHAT_KONTAKT_MAIL}`}>
            {CHAT_KONTAKT_MAIL}
          </a>,
          teil,
        ],
  );
}

function zeile(text: string, schluessel: string): ReactNode[] {
  const knoten: ReactNode[] = [];
  let stelle = 0;
  let nr = 0;
  const klartext = (bis: number) => {
    if (bis > stelle) knoten.push(...mitMail(text.slice(stelle, bis), `${schluessel}-t${nr++}`));
  };
  for (const treffer of text.matchAll(INLINE)) {
    const beginn = treffer.index ?? 0;
    const [ganz, fett, titel, ziel, pfad] = treffer;
    const key = `${schluessel}-${nr++}`;
    if (fett !== undefined) {
      klartext(beginn);
      knoten.push(<strong key={key}>{fett}</strong>);
    } else if (titel !== undefined && ziel !== undefined) {
      const bekannt = ziel.startsWith("/") ? bekannterPfad(ziel) : null;
      if (!bekannt) continue;
      klartext(beginn);
      knoten.push(
        <a key={key} href={bekannt}>
          {titel}
        </a>,
      );
    } else if (pfad !== undefined) {
      // Nur ein frei stehender Pfad zählt, nicht der Teil einer Adresse oder eines Wortes („und/oder“).
      const davor = beginn > 0 ? text.charAt(beginn - 1) : " ";
      const bekannt = /[\s(„"‚':]/.test(davor) ? bekannterPfad(pfad) : null;
      if (!bekannt) continue;
      klartext(beginn);
      knoten.push(
        <a key={key} href={bekannt} title={bekannt}>
          {CHAT_SEITEN[bekannt]}
        </a>,
      );
      // Ein abgeschnittener Schrägstrich am Ende bleibt Text.
      if (bekannt.length < pfad.length) knoten.push(pfad.slice(bekannt.length));
    }
    stelle = beginn + ganz.length;
  }
  klartext(text.length);
  return knoten;
}

type Block =
  { art: "absatz"; zeilen: string[] } | { art: "liste"; geordnet: boolean; punkte: string[] };

const PUNKT = /^\s*(?:[-*•]|(\d{1,2})[.)])\s+(.*)$/;

function bloecke(text: string): Block[] {
  const ergebnis: Block[] = [];
  let offen: Block | null = null;
  for (const roh of text.replace(/\r\n?/g, "\n").split("\n")) {
    const inhalt = roh.replace(/^\s{0,3}#{1,6}\s+/, "");
    if (!inhalt.trim()) {
      offen = null;
      continue;
    }
    const punkt = PUNKT.exec(inhalt);
    if (punkt) {
      const geordnet = punkt[1] !== undefined;
      if (!offen || offen.art !== "liste" || offen.geordnet !== geordnet) {
        offen = { art: "liste", geordnet, punkte: [] };
        ergebnis.push(offen);
      }
      offen.punkte.push(punkt[2] ?? "");
      continue;
    }
    if (!offen || offen.art !== "absatz") {
      offen = { art: "absatz", zeilen: [] };
      ergebnis.push(offen);
    }
    offen.zeilen.push(inhalt);
  }
  return ergebnis;
}

export function ChatText({ text }: { text: string }) {
  return (
    <>
      {bloecke(text).map((block, index) => {
        if (block.art === "liste") {
          const Liste = block.geordnet ? "ol" : "ul";
          return (
            <Liste key={index}>
              {block.punkte.map((punkt, nr) => (
                <li key={nr}>{zeile(punkt, `${index}-${nr}`)}</li>
              ))}
            </Liste>
          );
        }
        return (
          <p key={index}>
            {block.zeilen.flatMap((inhalt, nr) => [
              ...(nr ? [<br key={`br${nr}`} />] : []),
              ...zeile(inhalt, `${index}-${nr}`),
            ])}
          </p>
        );
      })}
    </>
  );
}
