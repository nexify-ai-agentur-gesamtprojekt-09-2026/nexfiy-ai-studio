/**
 * Leitplanken auf der Modellantwort des öffentlichen Chats (AIFly ORACLE).
 *
 * Vorlage: Monorepo `apps/web/lib/chat-guidance.ts` (Stand 8c532fe, Vorgabe oracle-public-guide/1.0.0),
 * sinngemäß für den Worker übernommen. Nicht übernommen: Projektbriefing/Angebotsentwurf, die
 * Mehrsprachigkeit der Hinweise und alles zu TEILEKLAR. Datenblöcke (```…```) werden hier nur
 * entfernt, nicht ausgewertet.
 *
 * Bewusst ohne Imports und ohne Seiteneffekte: reine Funktionen, direkt testbar.
 *
 * Technisch erzwungen wird: kein Geldbetrag, den nicht der Besucher selbst genannt hat; keine
 * Aussage, ein Mensch zu sein; keine rohen Datenblöcke im sichtbaren Text. Alles Weitere (Ton,
 * keine Referenzen/Zusagen, Themenbindung) ist Vorgabe an das Modell und wirkt nur, soweit das
 * Modell ihr folgt.
 */

export interface GuidanceTurn {
  role: "user" | "assistant";
  content: string;
}

/** Freigegebene Beträge: keine. Es gibt keinen freigegebenen Preiskatalog für den Chat. */
const APPROVED_AMOUNTS: readonly string[] = [];

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

const AMOUNT = String.raw`\d[\d.,'’\u00a0\u202f ]*\d|\d`;
const UNIT = String.raw`(?:k|tsd\.?|tausend|mio\.?|millionen|million)`;
const CURRENCY = String.raw`(?:€|eur\b|euros?\b|euro\b|usd\b|\$|chf\b|£)`;
const MONEY_PATTERNS: readonly RegExp[] = [
  new RegExp(String.raw`(${AMOUNT})\s?${UNIT}?\s?(?:,-|,–)?\s?${CURRENCY}`, "giu"),
  new RegExp(String.raw`${CURRENCY}\s?(${AMOUNT})`, "giu"),
  new RegExp(
    String.raw`(?:tagessatz|tagessätze|stundensatz|stundensätze|festpreis|pauschale|pauschalpreis|dagtarief|uurtarief|taux journalier|taux horaire|day rate|hourly rate|flat fee)\D{0,24}(${AMOUNT})`,
    "giu",
  ),
  new RegExp(String.raw`(${AMOUNT})\s?(?:netto|brutto)\b`, "giu"),
  new RegExp(
    String.raw`(${AMOUNT})\s?%\s?(?:rabatt|nachlass|skonto|korting|remise|réduction|discount|off\b)`,
    "giu",
  ),
];

function digitsOf(value: string): string {
  // "5.000,00" -> "5000"; "449,-" -> "449"; Dezimalstellen ",00"/".00" fallen weg.
  return value
    .replace(/[.,]\d{1,2}$/u, "")
    .replace(/\D/gu, "")
    .replace(/^0+(?=\d)/u, "");
}

/**
 * Betrag als Ziffernfolge in ganzen Einheiten, mit Maßangabe ausmultipliziert.
 * Vor einer Maßangabe ist ein Trenner mit ein oder zwei Folgeziffern ein Dezimaltrenner:
 * "1,5k" -> "1500", "2.5 Mio" -> "2500000". "1.500k" bleibt ein Tausenderpunkt.
 */
function amountKey(raw: string, unit = ""): string {
  const scale = /mio|million/iu.test(unit) ? 1_000_000 : /k|tsd|tausend/iu.test(unit) ? 1_000 : 1;
  if (scale === 1) return digitsOf(raw);
  const decimal = /^(.*\d)[.,](\d{1,2})$/u.exec(raw.trim());
  const whole = (decimal?.[1] ?? raw).replace(/\D/gu, "");
  if (!whole) return "";
  const value =
    Number(whole) * scale +
    (decimal?.[2] ? Math.round((Number(decimal[2]) / 10 ** decimal[2].length) * scale) : 0);
  return Number.isSafeInteger(value) ? String(value) : "";
}

const AMOUNT_WITH_UNIT = new RegExp(String.raw`(${AMOUNT})\s?(${UNIT}(?![a-zäöüß]))?`, "giu");

/** Zahlen, die der Besucher selbst genannt hat (z. B. sein Budget): dürfen wiederholt werden. */
export function visitorAmounts(turns: readonly GuidanceTurn[], latest = ""): Set<string> {
  const allowed = new Set<string>();
  const collect = (text: string) => {
    for (const match of text.matchAll(AMOUNT_WITH_UNIT)) {
      const value = amountKey(match[1] ?? "", match[2] ?? "");
      if (value) allowed.add(value);
    }
  };
  for (const turn of turns) if (turn.role === "user") collect(turn.content);
  collect(latest);
  return allowed;
}

/** Enthält der Text einen Geldbetrag, der weder freigegeben noch vom Besucher genannt ist? */
export function hasUnapprovedAmount(
  text: string,
  allowed: ReadonlySet<string> = new Set(),
): boolean {
  const approved = new Set<string>(APPROVED_AMOUNTS);
  for (const pattern of MONEY_PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const unit = new RegExp(String.raw`\d\s?(${UNIT})`, "iu").exec(match[0])?.[1] ?? "";
      const value = amountKey(match[1] ?? "", unit);
      if (!value) return true;
      if (!approved.has(value) && !allowed.has(value)) return true;
    }
  }
  return false;
}

const HUMAN_CLAIMS: readonly RegExp[] = [
  /\bich bin (?:ein(?:e)? )?(?:echter? |realer? |wirklicher? )?(?:mensch|person|mitarbeiter(?:in)?|berater(?:in)?)\b/iu,
  /\bich bin (?:kein(?:e)?|nicht) (?:ein(?:e)? )?(?:ki\b|k\.i\.|ai\b|bot\b|chatbot|maschine|roboter|programm|künstliche intelligenz|sprachmodell)/iu,
  /\bhier (?:schreibt|antwortet|spricht) (?:ihnen )?(?:ein(?:e)? )?(?:echter? )?(?:mensch|mitarbeiter(?:in)?|pascal)\b/iu,
  /\bich bin pascal\b/iu,
  /\bi(?: am|['’]m) (?:a |an )?(?:real |actual )?(?:human|person|human being|staff member)\b/iu,
  /\bi(?: am|['’]m) not (?:a |an )?(?:ai\b|bot\b|chatbot|machine|robot|program|language model)/iu,
  /\bi(?: am|['’]m) pascal\b/iu,
  /\bik ben (?:een )?(?:echt(?:e)? )?(?:mens|persoon|medewerker)\b/iu,
  /\bik ben geen (?:ai\b|bot\b|chatbot|machine|robot|programma|taalmodel)/iu,
  /\bje suis (?:un |une )?(?:vrai(?:e)? |véritable )?(?:humain(?:e)?|personne|être humain|collaborateur|collaboratrice)\b/iu,
  /\bje ne suis pas (?:un |une )?(?:ia\b|bot\b|chatbot|machine|robot|programme|modèle de langage)/iu,
];

/** Behauptet der Text, ein Mensch zu sein oder keine KI zu sein? */
export function claimsToBeHuman(text: string): boolean {
  return HUMAN_CLAIMS.some((pattern) => pattern.test(text));
}

export const PRICE_NOTICE =
  "Einen Betrag nenne ich hier nicht: Der Preis hängt vom vereinbarten Umfang ab, und Pascal Courbois erstellt dazu ein individuelles Angebot.";
export const IDENTITY_NOTICE =
  "Ich bin AIFly ORACLE, ein KI-System von NeXify AI. Das persönliche Gespräch führt Pascal Courbois.";

export type GuardViolation = "unapproved_amount" | "human_claim" | "oversized_block";

export interface GuardedBlock {
  lang: string;
  body: string;
}

export interface OutputGuard {
  /** Nimmt ein Teilstück der Modellantwort entgegen und gibt den geprüften, freigebbaren Text zurück. */
  push(delta: string): string;
  /** Schließt ab und gibt den geprüften Rest zurück. */
  finish(): string;
  /** Gesamter bisher freigegebener Text. */
  readonly text: string;
  /** Herausgelöste Datenblöcke; nie Teil des sichtbaren Textes. */
  readonly blocks: readonly GuardedBlock[];
  /** Ausgelöste Leitplanken, nur als Kennwörter (für Protokoll und Tests). */
  readonly violations: readonly GuardViolation[];
}

const MAX_BLOCK_CHARS = 6000;
const FORCE_RELEASE_CHARS = 480;
/** Länger als jede Formulierung in HUMAN_CLAIMS. */
const CLAIM_CARRY_CHARS = 120;

/**
 * Satzzeichen wie auf der Website: Der Gedankenstrich ist der Halbgeviertstrich mit Leerzeichen.
 * Der Geviertstrich aus Modellantworten wird ersetzt; vorhandene Abstände bleiben unverändert.
 */
export function germanDashes(text: string): string {
  return text.replace(/(\S)\u2014(?=\S)/gu, "$1 \u2013 ").replace(/\u2014/gu, "\u2013");
}
const ABBREVIATION =
  /(?:^|[\s(])(?:ca|bzw|inkl|zzgl|exkl|ggf|evtl|usw|etc|max|min|mind|vgl|nr|approx|incl|excl|env|circa|z|b|u|a|d|h|e|g|i)\.$/iu;

/**
 * Prüft die Modellantwort abschnittsweise, bevor sie den Besucher erreicht.
 * Text wird erst an einer Satz- oder Zeilengrenze freigegeben; ein Satz mit einem nicht
 * freigegebenen Betrag oder mit der Aussage, ein Mensch zu sein, wird samt Rest der Zeile
 * durch einen festen Hinweis ersetzt. Datenblöcke (```…```) werden herausgelöst.
 */
export function createOutputGuard(
  options: { allowedAmounts?: ReadonlySet<string> } = {},
): OutputGuard {
  const allowed = options.allowedAmounts ?? new Set<string>();
  const blocks: GuardedBlock[] = [];
  const violations: GuardViolation[] = [];
  let pending = "";
  let released = "";
  let inBlock = false;
  let blockOverflow = false;
  let suppressLine = false;
  // Ende des zuletzt erzwungen freigegebenen Stücks: Eine Aussage, die über den Schnitt reicht, wird damit erkannt.
  let carry = "";
  const noticed = new Set<GuardViolation>();

  const emitNotice = (kind: "unapproved_amount" | "human_claim"): string => {
    violations.push(kind);
    if (noticed.has(kind)) return "";
    noticed.add(kind);
    return kind === "unapproved_amount" ? PRICE_NOTICE : IDENTITY_NOTICE;
  };

  /** Einen abgeschlossenen Abschnitt prüfen; Zeilenumbrüche beenden eine laufende Unterdrückung. */
  const check = (segment: string): string => {
    let out = "";
    for (const piece of segment.split(/(\n+)/u)) {
      if (!piece) continue;
      if (/^\n+$/u.test(piece)) {
        suppressLine = false;
        carry = "";
        out += piece;
        continue;
      }
      if (suppressLine) continue;
      const joined = carry + piece;
      carry = "";
      const kind =
        claimsToBeHuman(piece) || claimsToBeHuman(joined)
          ? "human_claim"
          : hasUnapprovedAmount(piece, allowed)
            ? "unapproved_amount"
            : null;
      if (!kind) {
        out += germanDashes(piece);
        continue;
      }
      suppressLine = true;
      const notice = emitNotice(kind);
      if (notice) out += (out && !/\s$/u.test(out) ? " " : "") + notice;
    }
    return out;
  };

  /** Letzte sichere Grenze in pending: Zeilenende oder Satzende vor Leerraum. */
  const boundary = (text: string, force: boolean): { cut: number; forced: boolean } => {
    let cut = text.lastIndexOf("\n") + 1;
    const sentence = /[.!?…]["»“”)]?\s+/gu;
    for (let match = sentence.exec(text); match; match = sentence.exec(text)) {
      const end = match.index + match[0].length;
      if (end <= cut) continue;
      const head = text.slice(0, match.index + 1);
      if (ABBREVIATION.test(head) || /\d\.$/u.test(head)) continue;
      cut = end;
    }
    if (cut === 0 && force) {
      // Sehr langer Satz ohne Grenze: an einem Leerzeichen teilen, das keinen Betrag trennt.
      for (let index = text.length - 1; index > 40; index--) {
        if (text[index] !== " ") continue;
        const before = text.slice(Math.max(0, index - 14), index);
        const after = text.slice(index + 1, index + 12);
        if (
          /[\d€$£%]\s*$/u.test(before) ||
          /^(?:[\d€$£%]|eur|euro|usd|chf|k\b|tsd|tausend|mio|netto|brutto)/iu.test(after)
        )
          continue;
        if (/(?:tagessatz|stundensatz|festpreis|pauschale|rate|tarief|taux)\W*$/iu.test(before))
          continue;
        return { cut: index + 1, forced: true };
      }
    }
    return { cut, forced: false };
  };

  const release = (final: boolean): string => {
    let out = "";
    while (true) {
      if (inBlock) {
        const close = pending.indexOf("```");
        if (close === -1) {
          if (pending.length > MAX_BLOCK_CHARS) {
            pending = pending.slice(-3);
            if (!blockOverflow) violations.push("oversized_block");
            blockOverflow = true;
          }
          if (!final) break;
          // Nicht geschlossener Block am Ende: als Block werten, nie als Text zeigen.
          if (!blockOverflow) pushBlock(pending);
          pending = "";
          inBlock = false;
          break;
        }
        if (!blockOverflow) pushBlock(pending.slice(0, close));
        // Leerraum an der Nahtstelle glättet append(), unabhängig von der Stückelung des Streams.
        pending = pending.slice(close + 3);
        inBlock = false;
        blockOverflow = false;
        continue;
      }
      const open = pending.indexOf("```");
      if (open !== -1) {
        out += check(pending.slice(0, open));
        pending = pending.slice(open + 3);
        inBlock = true;
        continue;
      }
      if (final) {
        out += check(pending);
        pending = "";
        break;
      }
      // Einen möglichen Blockanfang am Ende ("`", "``") nicht vorzeitig freigeben.
      const held = /`{1,2}$/u.exec(pending)?.[0].length ?? 0;
      const candidate = held ? pending.slice(0, -held) : pending;
      const { cut, forced } = boundary(candidate, candidate.length > FORCE_RELEASE_CHARS);
      if (cut > 0) {
        const head = candidate.slice(0, cut);
        out += check(head);
        pending = pending.slice(cut);
        // Mitten im Satz geteilt: das Ende merken, solange die Zeile nicht ohnehin unterdrückt ist.
        if (forced && !suppressLine) carry = head.slice(-CLAIM_CARRY_CHARS);
      }
      break;
    }
    return out;
  };

  const pushBlock = (raw: string): void => {
    const newline = raw.indexOf("\n");
    const lang = (newline === -1 ? "" : raw.slice(0, newline)).trim().toLowerCase();
    const body = (newline === -1 ? raw : raw.slice(newline + 1)).trim();
    if (body) blocks.push({ lang, body });
  };

  /** Leerraum an den Nahtstellen herausgelöster Blöcke und ersetzter Zeilen glätten. */
  const append = (chunk: string): string => {
    let text = chunk;
    if (!released || /\n\n$/u.test(released)) text = text.replace(/^\n+/u, "");
    else if (/\n$/u.test(released)) text = text.replace(/^\n{2,}/u, "\n");
    text = text.replace(/\n{3,}/gu, "\n\n");
    released += text;
    return text;
  };

  return {
    push(delta: string): string {
      pending += delta.replace(CONTROL_CHARS, "");
      return append(release(false));
    },
    finish(): string {
      return append(release(true));
    },
    /** Geprüfter sichtbarer Text ohne Leerraum am Ende (der Stream kann dort noch Umbrüche tragen). */
    get text() {
      return released.replace(/\s+$/u, "");
    },
    get blocks() {
      return blocks;
    },
    get violations() {
      return violations;
    },
  };
}
