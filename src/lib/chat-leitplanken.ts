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
/** Wie AMOUNT, aber mindestens dreistellig: für Stellen, an denen kleine Zahlen meist kein Betrag sind. */
const AMOUNT_3 = String.raw`\d[\d.,'’\u00a0\u202f ]+\d\d|\d{3,}`;
const UNIT = String.raw`(?:k|tsd\.?|tausend|mio\.?|millionen|million)`;
const CURRENCY = String.raw`(?:€|eur\b|euros?\b|usd\b|us-dollars?\b|dollars?\b|\$|chf\b|sfr\b|franken\b|£|gbp\b|pfund\b)`;
const PERIOD = String.raw`(?:pro|je|per|im|\/)\s?(?:monat|jahr|tag|stunde|woche|quartal|mo\b|std\b|month|year|day|hour|week)`;
const VAT = String.raw`(?:zzgl|inkl|exkl|zuzüglich|inklusive|exklusive|plus|ohne|mit)\.?\s?(?:der\s|gesetzl\.?\s|gesetzlicher\s)?(?:mwst|mehrwertsteuer|ust\b|umsatzsteuer|btw\b|vat\b)`;
const PRICE_WORD = String.raw`(?:tagessatz|tagessätze|stundensatz|stundensätze|festpreis|pauschale|pauschalpreis|dagtarief|uurtarief|taux journalier|taux horaire|day rate|hourly rate|flat fee)`;
const COST_WORD = String.raw`(?:kostet|kosten|kostenpunkt|preis|preise|preislich|gebühr|gebühren|honorar|investition|betrag|summe)`;
/** Betrag mit Ziffern: die erste Gruppe ist die Zahl. */
const MONEY_PATTERNS: readonly RegExp[] = [
  new RegExp(String.raw`(${AMOUNT})\s?${UNIT}?\s?(?:,\s?[-–—])?\s?${CURRENCY}`, "giu"),
  new RegExp(String.raw`${CURRENCY}\s?(${AMOUNT})`, "giu"),
  new RegExp(String.raw`${PRICE_WORD}\D{0,24}(${AMOUNT})`, "giu"),
  new RegExp(String.raw`\b${COST_WORD}\b\D{0,24}(${AMOUNT_3})`, "giu"),
  new RegExp(String.raw`(${AMOUNT})\s?(?:netto|brutto)\b`, "giu"),
  new RegExp(String.raw`(${AMOUNT}),\s?[-–—]`, "giu"),
  new RegExp(String.raw`(${AMOUNT})\s?${UNIT}?\s?${PERIOD}`, "giu"),
  new RegExp(String.raw`(${AMOUNT})\s?${UNIT}?\D{0,12}${VAT}`, "giu"),
  new RegExp(
    String.raw`(${AMOUNT})\s?%\s?(?:rabatt|nachlass|skonto|korting|remise|réduction|discount|off\b)`,
    "giu",
  ),
];

const NUMBER_WORD = String.raw`(?:null|ein|eine|einen|einem|eins|zwei|drei|vier|fünf|fuenf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwoelf|zwanzig|dreißig|dreissig|vierzig|fünfzig|fuenfzig|sechzig|siebzig|achtzig|neunzig|hundert|tausend|zehntausend|hunderttausend|million|millionen|one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|forty|fifty|hundred|thousand)`;
const NUMBER_WORDS = String.raw`\b(?:${NUMBER_WORD}|und|and|halb|einhalb|anderthalb|komma|[\s-])*${NUMBER_WORD}(?:${NUMBER_WORD}|und|and|halb|einhalb|komma|[\s-])*`;
/** Beträge in Worten: nie freigegeben, weil sie sich keiner Zahl des Besuchers zuordnen lassen. */
const WORD_MONEY_PATTERNS: readonly RegExp[] = [
  new RegExp(String.raw`${NUMBER_WORDS}\s?${CURRENCY}`, "iu"),
  new RegExp(String.raw`${NUMBER_WORDS}\s?${PERIOD}`, "iu"),
  new RegExp(String.raw`${NUMBER_WORDS}\s?(?:netto|brutto)\b`, "iu"),
  new RegExp(
    String.raw`\b(?:${PRICE_WORD}|${COST_WORD})\b[^\d\n]{0,24}?${NUMBER_WORDS}(?=\s?(?:${CURRENCY}|${PERIOD}|netto|brutto|[.!?,;]|$))`,
    "iu",
  ),
  new RegExp(
    String.raw`\b(?:paar|mehrere|einige|wenige|etliche|viele)\s(?:hundert|tausend|zehntausend|hunderttausend|millionen)\b`,
    "iu",
  ),
  /\b(?:drei|vier|fünf|sechs|sieben)stellig\w*/iu,
];

/** Markdown-Zeichen und Sonderabstände stören die Erkennung („**4.900** €“) und zählen nicht zum Inhalt. */
function forCheck(text: string): string {
  return text.replace(/[*_`~#>|\\]/gu, "").replace(/[ \t\u00a0\u202f]+/gu, " ");
}

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

const UNIT_END = String.raw`(?:${UNIT}(?![a-zäöüß]))`;
/** Stellen, an denen der Besucher eine Zahl erkennbar als Betrag nennt. Gruppen: a = Zahl, u = Maßangabe. */
const VISITOR_MONEY: readonly RegExp[] = [
  new RegExp(
    String.raw`(?<a>${AMOUNT})\s?(?<u>${UNIT_END})?\s?(?:,\s?[-–—])?\s?${CURRENCY}`,
    "giu",
  ),
  new RegExp(String.raw`${CURRENCY}\s?(?<a>${AMOUNT})\s?(?<u>${UNIT_END})?`, "giu"),
  new RegExp(String.raw`(?<a>${AMOUNT})\s?(?<u>${UNIT_END})`, "giu"),
  new RegExp(
    String.raw`\b(?:budget\w*|kostenrahmen|rahmen|obergrenze|maximal|höchstens|bis zu|limit)\b\D{0,30}(?<a>${AMOUNT})\s?(?<u>${UNIT_END})?`,
    "giu",
  ),
];

/**
 * Beträge, die der Besucher selbst als Betrag genannt hat (z. B. sein Budget). Eine beiläufige
 * Zahl („3 Seiten“) zählt nicht. Der Assistent darf sie nur als Angabe des Besuchers wiederholen,
 * siehe `hasUnapprovedAmount`.
 */
export function visitorAmounts(turns: readonly GuidanceTurn[], latest = ""): Set<string> {
  const allowed = new Set<string>();
  const collect = (raw: string) => {
    const text = forCheck(raw);
    for (const pattern of VISITOR_MONEY) {
      for (const match of text.matchAll(pattern)) {
        const value = amountKey(match.groups?.["a"] ?? "", match.groups?.["u"] ?? "");
        if (value) allowed.add(value);
      }
    }
  };
  for (const turn of turns) if (turn.role === "user") collect(turn.content);
  collect(latest);
  return allowed;
}

/** Der Satz spricht erkennbar über die Angabe des Besuchers … */
const VISITOR_REFERENCE =
  /\b(?:ihr|ihre[mnrs]?|dein|deine[mnrs]?)\s+(?:\S+\s+){0,2}?(?:budget\w*|kostenrahmen|rahmen|obergrenze|limit|vorgabe|betrag)\b|\bvon ihnen genannt\w*|\bsie (?:nennen|nannten|haben)\b.{0,40}\b(?:genannt|angegeben|eingeplant)\b/iu;
/** … und macht daraus keine Aussage über einen Preis oder darüber, was dafür zu haben ist. */
const PRICE_CLAIM =
  /\b(?:kostet|kosten|kostenpunkt|preis\w*|beträgt|betragen|liegt bei|liegen bei|berechnen|berechnet|angebot über|reicht|reichen|genügt|genügen|ausreichend|machbar|möglich|realistisch|passt|deckt|umsetzbar|bekommen|erhalten|zu haben|drin)\b/iu;

/**
 * Enthält der Text einen Geldbetrag, den der Assistent nicht nennen darf? Erlaubt ist allein die
 * Wiederholung eines Betrags, den der Besucher selbst genannt hat – und nur in einem Satz, der ihn
 * als dessen Angabe behandelt, nie als Preis von NeXify oder als Zusage, was dafür zu haben ist.
 */
export function hasUnapprovedAmount(
  raw: string,
  allowed: ReadonlySet<string> = new Set(),
): boolean {
  const text = forCheck(raw);
  if (WORD_MONEY_PATTERNS.some((pattern) => pattern.test(text))) return true;
  const approved = new Set<string>(APPROVED_AMOUNTS);
  const visitorContext = VISITOR_REFERENCE.test(text) && !PRICE_CLAIM.test(text);
  for (const pattern of MONEY_PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const unit = new RegExp(String.raw`\d\s?(${UNIT})`, "iu").exec(match[0])?.[1] ?? "";
      const value = amountKey(match[1] ?? "", unit);
      if (!value) return true;
      if (approved.has(value)) continue;
      if (!(visitorContext && allowed.has(value))) return true;
    }
  }
  return false;
}

const HUMAN_CLAIMS: readonly RegExp[] = [
  /\bich bin (?:hier |wirklich |tatsächlich |natürlich |selbstverständlich |ganz |durchaus )*(?:ein(?:e)? |ihr(?:e)? |dein(?:e)? )?(?:echter? |realer? |wirklicher? |richtiger? |lebendiger? |menschlicher? |persönlicher? |zuständiger? )?(?:mensch|person|mitarbeiter(?:in)?|mitarbeitende[rn]?|berater(?:in)?|kundenberater(?:in)?|kundenbetreuer(?:in)?|ansprechpartner(?:in)?|kolleg(?:e|in)|teammitglied|sachbearbeiter(?:in)?|assistent(?:in)? aus fleisch)\b/iu,
  /\bich bin (?:hier |wirklich |tatsächlich |natürlich |ganz |doch )*(?:kein(?:e|er)?|nicht|weder) (?:ein(?:e)? )?(?:ki\b|k\.i\.|ai\b|bot\b|chatbot|maschine|roboter|programm|computer|automat|software|algorithmus|künstliche intelligenz|sprachmodell|assistenzsystem)/iu,
  /\bich bin (?:hier |wirklich |tatsächlich |ganz )*(?:echt|real|menschlich|lebendig|aus fleisch und blut)\b/iu,
  /\bhier (?:schreibt|antwortet|spricht|sitzt|ist) (?:ihnen |gerade |tatsächlich |wirklich )*(?:ein(?:e)? )?(?:echter? |realer? )?(?:mensch|person|mitarbeiter(?:in)?|pascal)\b/iu,
  /\b(?:ich bin|mein name ist|ich heiße|hier ist|ich,|hier spricht|hier schreibt) (?:der |herr )?pascal\b/iu,
  /\bsie (?:sprechen|schreiben|chatten|reden|kommunizieren) (?:hier |gerade |tatsächlich |wirklich )*mit (?:einem |einer |dem )?(?:echten |realen |richtigen )?(?:menschen|mitarbeiter(?:in)?|person|pascal)\b/iu,
  /\b(?:als mensch|wir menschen|ich als (?:mensch|mitarbeiter(?:in)?|inhaber))\b/iu,
  /\b(?:keine|kein) (?:ki|k\.i\.|ai|bot|chatbot|maschine|roboter|computer|automat)\b[^.!?\n]{0,30}\bsondern (?:ein(?:e)? )?(?:mensch|person|mitarbeiter(?:in)?)/iu,
  /\bi(?: am|['’]m) (?:really |actually |truly )?(?:a |an )?(?:real |actual |living )?(?:human|person|human being|staff member|employee)\b/iu,
  /\bi(?: am|['’]m) (?:really |actually )?not (?:a |an )?(?:ai\b|bot\b|chatbot|machine|robot|program|computer|language model)/iu,
  /\bi(?: am|['’]m) pascal\b/iu,
  /\bik ben (?:een )?(?:echt(?:e)? )?(?:mens|persoon|medewerker)\b/iu,
  /\bik ben geen (?:ai\b|bot\b|chatbot|machine|robot|programma|taalmodel)/iu,
  /\bje suis (?:un |une )?(?:vrai(?:e)? |véritable )?(?:humain(?:e)?|personne|être humain|collaborateur|collaboratrice)\b/iu,
  /\bje ne suis pas (?:un |une )?(?:ia\b|bot\b|chatbot|machine|robot|programme|modèle de langage)/iu,
];

/** Behauptet der Text, ein Mensch zu sein oder keine KI zu sein? */
export function claimsToBeHuman(raw: string): boolean {
  const text = forCheck(raw);
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
/** So viel Text beiderseits eines Zeilenumbruchs wird gemeinsam geprüft. */
const BRIDGE_CHARS = 48;
/** So viel Folgetext muss vorliegen, bevor ein Abschnitt freigegeben wird, der mit einer Zahl endet. */
const BRIDGE_MIN_CHARS = 14;
const NUMBER_TAIL =
  /(?:\d[\d.,'’\s]*(?:k|tsd\.?|tausend|mio\.?)?|(?:hundert|tausend|million|millionen|zig|ßig|zehn|elf|zwölf|eins?|zwei|drei|vier|fünf|sechs|sieben|acht|neun))[\s,.:\-–—]*$/iu;

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
 * durch einen festen Hinweis ersetzt – auch wenn Zahl und Währung durch einen Zeilenumbruch
 * oder Markdown-Zeichen getrennt sind. Datenblöcke (```…``` und ~~~…~~~) werden herausgelöst,
 * Inline-Code-Zeichen entfernt.
 */
export function createOutputGuard(
  options: {
    allowedAmounts?: ReadonlySet<string>;
    /** Wird auf jeden freigegebenen Text angewandt (z. B. Kontakt-Platzhalter des Routers). */
    repair?: (text: string) => string;
  } = {},
): OutputGuard {
  const allowed = options.allowedAmounts ?? new Set<string>();
  const reparieren = options.repair;
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

  // Ende der zuletzt geprüften Zeile: Ein Betrag oder eine Aussage, die über den Zeilenumbruch reicht, wird damit erkannt.
  let prevTail = "";

  /** Verstößt erst die Verbindung zweier Zeilenenden, nicht schon eine Seite allein? */
  const acrossLines = (before: string, after: string): GuardViolation | null => {
    if (!before || !after) return null;
    const joined = `${before} ${after}`;
    if (!claimsToBeHuman(before) && !claimsToBeHuman(after) && claimsToBeHuman(joined))
      return "human_claim";
    if (
      !hasUnapprovedAmount(before, allowed) &&
      !hasUnapprovedAmount(after, allowed) &&
      hasUnapprovedAmount(joined, allowed)
    )
      return "unapproved_amount";
    return null;
  };

  /**
   * Einen abgeschlossenen Abschnitt prüfen; Zeilenumbrüche beenden eine laufende Unterdrückung.
   * `lookahead` ist der Anfang des noch zurückgehaltenen Textes hinter dem Abschnitt.
   */
  const check = (segment: string, lookahead = ""): string => {
    let out = "";
    const pieces = segment.split(/(\n+)/u);
    for (let index = 0; index < pieces.length; index++) {
      const piece = pieces[index] ?? "";
      if (!piece) continue;
      if (/^\n+$/u.test(piece)) {
        suppressLine = false;
        carry = "";
        out += piece;
        continue;
      }
      const before = prevTail;
      prevTail = piece.slice(-BRIDGE_CHARS);
      if (suppressLine) continue;
      const joined = carry + piece;
      carry = "";
      let next = lookahead;
      for (let ahead = index + 1; ahead < pieces.length; ahead++) {
        const candidate = pieces[ahead] ?? "";
        if (candidate && !/^\n+$/u.test(candidate)) {
          next = candidate;
          break;
        }
      }
      const kind: GuardViolation | null =
        claimsToBeHuman(piece) || claimsToBeHuman(joined)
          ? "human_claim"
          : hasUnapprovedAmount(piece, allowed)
            ? "unapproved_amount"
            : (acrossLines(before, piece.slice(0, BRIDGE_CHARS)) ??
              acrossLines(piece.slice(-BRIDGE_CHARS), next.slice(0, BRIDGE_CHARS)));
      if (kind !== "human_claim" && kind !== "unapproved_amount") {
        // Inline-Code-Zeichen gehören nicht in die Antwort; der Inhalt bleibt als Text stehen.
        out += germanDashes(piece).replace(/`/gu, "");
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
      // Einen möglichen Blockanfang am Ende ("`", "``", "~~") nicht vorzeitig freigeben.
      const held = /(?:`{1,2}|~{1,2})$/u.exec(pending)?.[0].length ?? 0;
      const candidate = held ? pending.slice(0, -held) : pending;
      const { cut, forced } = boundary(candidate, candidate.length > FORCE_RELEASE_CHARS);
      if (cut > 0) {
        const head = candidate.slice(0, cut);
        const rest = candidate.slice(cut);
        // Endet der Abschnitt mit einer Zahl, entscheidet erst der Folgetext, ob sie ein Betrag ist
        // („4.900“ + Zeilenumbruch + „€“): so lange zurückhalten, bis genug davon da ist.
        if (!forced && NUMBER_TAIL.test(forCheck(head)) && rest.trim().length < BRIDGE_MIN_CHARS)
          break;
        out += check(head, rest);
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
    if (!released || released.endsWith("\n\n")) text = text.replace(/^\n+/u, "");
    else if (released.endsWith("\n")) text = text.replace(/^\n{2,}/u, "\n");
    text = text.replace(/\n{3,}/gu, "\n\n");
    if (reparieren) text = reparieren(text);
    released += text;
    return text;
  };

  return {
    push(delta: string): string {
      // „~~~“ leitet wie „```“ einen Datenblock ein; beide werden gleich behandelt.
      pending = (pending + delta.replace(CONTROL_CHARS, "")).replace(/~~~/gu, "```");
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
