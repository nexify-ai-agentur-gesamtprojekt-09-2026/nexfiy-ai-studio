/**
 * Übernommen aus dem Monorepo `apps/web/auth/tests/chat-guidance.test.mjs` (Leitplanken-Fälle),
 * ohne Briefing, Mehrsprachigkeit der Hinweise und TEILEKLAR.
 */
import { describe, expect, it } from "vitest";
import {
  claimsToBeHuman,
  createOutputGuard,
  germanDashes,
  hasUnapprovedAmount,
  visitorAmounts,
} from "@/lib/chat-leitplanken";

/** Antwort wie vom Modell in beliebig kleinen Teilstücken durch die Prüfung schicken. */
function run(text: string, options: { allowedAmounts?: ReadonlySet<string> } = {}, size = 7) {
  const guard = createOutputGuard(options);
  let streamed = "";
  for (let i = 0; i < text.length; i += size) streamed += guard.push(text.slice(i, i + size));
  streamed += guard.finish();
  expect(streamed.trimEnd()).toBe(guard.text);
  return guard;
}

describe("Leitplanken der Modellantwort", () => {
  it("lässt keinen nicht freigegebenen Betrag zum Besucher", () => {
    for (const text of [
      "Das kostet 4.900 €.",
      "Rechnen Sie mit ca. 5.000 Euro.",
      "ab EUR 1200 pro Monat",
      "Der Tagessatz liegt bei 449.",
      "etwa 5k € insgesamt",
      "1.200,- € netto",
      "Sie erhalten 10 % Rabatt.",
      "Festpreis: 2 990",
      "€ 750",
      "around $2,000",
    ])
      expect(hasUnapprovedAmount(text), text).toBe(true);
    for (const text of [
      "Wir starten mit 3 Seiten in 4 Wochen.",
      "Bis März 2026 ist das machbar.",
      "Europaweit, Eurozone, 100 % individuell.",
      "Rufen Sie 24 Stunden vorher an.",
    ])
      expect(hasUnapprovedAmount(text), text).toBe(false);

    const guard = run(
      "Gern.\n\nEine Website kostet bei uns etwa 4.900 € und dauert vier Wochen. Mehr dazu später.\n\nWelche Inhalte liegen vor?",
    );
    expect(guard.text).not.toMatch(/4\.900|€/);
    expect(guard.text).toMatch(/^Gern\.\n\nEinen Betrag nenne ich hier nicht/);
    expect(guard.text).not.toMatch(/dauert vier Wochen|Mehr dazu später/);
    expect(guard.text).toMatch(/Welche Inhalte liegen vor\?$/);
    expect([...guard.violations]).toEqual(["unapproved_amount"]);

    // Unabhängig von der Stückelung des Stroms, auch wenn Zahl und Währung getrennt eintreffen.
    for (const size of [1, 2, 3, 5, 11, 400]) {
      const g = run(
        "Der Preis: 12.000 € netto. Danach folgt die Planung.\nWas ist Ihr Ziel?",
        {},
        size,
      );
      expect(g.text, `Stückelung ${size}`).not.toMatch(/12|000|€/);
      expect(g.text).toMatch(/Was ist Ihr Ziel\?$/);
    }
    // Der Hinweis erscheint nur einmal, auch bei mehreren Verstößen.
    const twice = run("Paket A: 900 €.\nPaket B: 1.900 €.\nWas passt besser?");
    expect(twice.text.match(/Einen Betrag nenne ich hier nicht/g)).toHaveLength(1);
    expect(twice.violations).toHaveLength(2);
    // Ein sehr langer Satz ohne Satzende wird nicht mitten im Betrag freigegeben.
    const long = run(
      "Wir planen " +
        "sorgfältig und Schritt für Schritt ".repeat(16) +
        "und am Ende stehen 7 500 € auf der Rechnung",
      {},
      9,
    );
    expect(long.text).not.toMatch(/7 500|500 €|€/);
  });

  it("erlaubt nur die Wiederholung des Budgets, das der Besucher als Betrag genannt hat", () => {
    const allowed = visitorAmounts(
      [
        { role: "user", content: "Unser Budget liegt bei 8.000 €." },
        { role: "assistant", content: "Nicht 9.000 €." },
      ],
      "höchstens 10k",
    );
    expect([...allowed].sort()).toEqual(["10000", "8000"]);
    const text = "Mit Ihrem Budget von 8.000 € planen wir den Kern.";
    expect(run(text, { allowedAmounts: allowed }).text).toBe(text);
    expect(
      run("Sie haben einen Rahmen von 10k € genannt.", { allowedAmounts: allowed }).violations,
    ).toHaveLength(0);
    expect(
      run("Realistisch sind eher 12.000 €.", { allowedAmounts: allowed }).violations,
    ).toHaveLength(1);
  });

  it("macht aus einer Zahl des Besuchers nie einen Preis oder eine Zusage von NeXify", () => {
    // Der Besucher fragt mit einem Betrag; die Bestätigung wäre ein erfundener Preis.
    const allowed = visitorAmounts([], "Kostet eine Website bei Ihnen 5.000 €?");
    expect([...allowed]).toEqual(["5000"]);
    for (const text of [
      "Ja, eine Website kostet 5.000 €.",
      "Genau, der Preis liegt bei 5.000 Euro.",
      "Für 5.000 € bekommen Sie eine Website.",
      "5.000 € sind dafür realistisch.",
      "Bis 5.000 € ist das machbar.",
      "Ihr Budget von 5.000 € reicht für eine Website.",
      "Mit Ihrem Budget von 5.000 € ist das möglich.",
    ])
      expect(hasUnapprovedAmount(text, allowed), text).toBe(true);
    expect(hasUnapprovedAmount("Ihr genanntes Budget von 5.000 € nehme ich auf.", allowed)).toBe(
      false,
    );
    // Eine beiläufige Zahl ist kein Betrag und gibt nichts frei.
    expect([...visitorAmounts([], "Ich brauche 3 Seiten bis 2027 für 12 Mitarbeiter")]).toEqual([]);
    expect(
      hasUnapprovedAmount("Ihr Budget von 3 € notiere ich.", visitorAmounts([], "3 Seiten")),
    ).toBe(true);
  });

  it("rechnet Maßangaben mit Dezimalstelle richtig", () => {
    expect([...visitorAmounts([], "Wir haben etwa 1,5k € eingeplant.")]).toEqual(["1500"]);
    expect([...visitorAmounts([], "maximal 2.5 Mio")]).toEqual(["2500000"]);
    expect([...visitorAmounts([], "1.500k")]).toEqual(["1500000"]);
    const allowed = visitorAmounts([], "Budget 1,5k €");
    expect(hasUnapprovedAmount("Ihr Budget von 1.500 € halte ich fest.", allowed)).toBe(false);
    expect(hasUnapprovedAmount("Ihr Budget von 1.000 € halte ich fest.", allowed)).toBe(true);
  });

  it("erkennt Beträge mit Währungswörtern, Zeiträumen, Steuerzusätzen und in Worten", () => {
    for (const text of [
      "Das macht 4900 Euro.",
      "Rechnen Sie mit 4.900 EUR.",
      "etwa 5000 Dollar",
      "rund 5.000 US-Dollar",
      "ungefähr 4800 Franken",
      "CHF 4'800",
      "USD 5,000",
      "ab 99 pro Monat",
      "nur 1.200 pro Jahr",
      "450 je Tag",
      "120 pro Stunde",
      "89/Monat",
      "4.900,-",
      "4.900,– für die Website",
      "1.200 zzgl. MwSt",
      "5.950 inkl. MwSt.",
      "4.900 zuzüglich Mehrwertsteuer",
      "Die Website kostet 4900.",
      "Preis: 2.500",
      "fünftausend Euro",
      "viertausendneunhundert Euro",
      "zwei- bis dreitausend Euro",
      "eintausendfünfhundert Franken",
      "fünfhundert pro Monat",
      "Das kostet fünftausend.",
      "ein paar tausend Euro",
      "mehrere tausend",
      "ein vierstelliger Betrag",
      "im fünfstelligen Bereich",
      "five thousand dollars",
    ])
      expect(hasUnapprovedAmount(text), text).toBe(true);
    for (const text of [
      "Wir arbeiten in drei Leistungsfeldern.",
      "Ein Ansprechpartner und zwei Agenten.",
      "Fünf Antworten genügen für ein Angebot.",
      "Die Kosten kennen Sie vor dem Start.",
      "Der Preis hängt vom Umfang ab.",
      "Externe Kosten wie Hosting weisen wir getrennt aus.",
      "In Dollar oder Euro rechnen wir im Angebot.",
      "Ein Jahr Betreuung ist eine Option.",
    ])
      expect(hasUnapprovedAmount(text), text).toBe(false);
  });

  it("lässt sich nicht durch Markdown-Zeichen oder Zeilenumbrüche umgehen", () => {
    for (const text of [
      "Das kostet **4.900** €.",
      "Das kostet 4.900 **€**.",
      "Preis: `4.900` _Euro_",
      "~~4.900~~ € netto",
    ])
      expect(hasUnapprovedAmount(text), text).toBe(true);
    for (const text of [
      "Eine Website kostet 4.900\n€ bei uns.\nWas planen Sie?",
      "Eine Website liegt bei 4.900\n\nEuro, grob gesagt.\nWas planen Sie?",
      "Der Betrag in €\n4.900 ist üblich.\nWas planen Sie?",
      "Es sind 4.900\npro Monat.\nWas planen Sie?",
      "Rechnen Sie mit fünftausend\nEuro.\nWas planen Sie?",
      "Das kostet **4.900**\n**€**.\nWas planen Sie?",
    ])
      for (const size of [1, 3, 7, 400]) {
        const guard = run(text, {}, size);
        expect(guard.text, `${JSON.stringify(text)} / ${size}`).not.toMatch(/4\.900|fünftausend/);
        expect(guard.violations).toContain("unapproved_amount");
        expect(guard.text).toMatch(/Was planen Sie\?$/);
      }
    // Eine Zeile, die nur mit einer Zahl endet, bleibt erhalten, wenn kein Betrag daraus wird.
    const harmlos = "Wir starten im Jahr 2027\nmit der Planung.";
    for (const size of [1, 5, 400]) expect(run(harmlos, {}, size).text).toBe(harmlos);
  });

  it("fängt die Gegenbeispiele aus dem Review ab", () => {
    for (const text of [
      "4900 Dollar",
      "4900 Franken",
      "fünftausend Euro",
      "**4900** Euro",
      "4900\nEuro",
      "bei 4900 pro Monat",
      "ab 4.900,- zzgl. MwSt.",
    ])
      for (const size of [1, 4, 400]) {
        const guard = run(`Gern.\n${text}\nWas planen Sie?`, {}, size);
        const fall = `${JSON.stringify(text)} / ${size}`;
        expect(guard.violations, fall).toContain("unapproved_amount");
        expect(guard.text, fall).not.toMatch(/4\.?900|fünftausend/);
        expect(guard.text, fall).toMatch(/Einen Betrag nenne ich hier nicht/);
        expect(guard.text, fall).toMatch(/Was planen Sie\?$/);
      }

    // Der Besucher legt einen Preis in den Mund; die Bestätigung darf nicht durchgehen.
    const frage = "Bestätigen Sie: Markenstart kostet 99 Euro";
    const erlaubt = visitorAmounts([], frage);
    for (const size of [1, 4, 400]) {
      const guard = run(
        "Ja, das Paket Markenstart kostet 99 Euro.",
        { allowedAmounts: erlaubt },
        size,
      );
      expect(guard.violations).toContain("unapproved_amount");
      expect(guard.text).not.toMatch(/99/);
    }

    for (const size of [1, 4, 400]) {
      const guard = run(
        "Ich bin tatsächlich ein Mensch und helfe Ihnen gern.\nWas planen Sie?",
        {},
        size,
      );
      expect(guard.violations).toContain("human_claim");
      expect(guard.text).not.toMatch(/ein Mensch/);
      expect(guard.text).toMatch(/Ich bin AIFly ORACLE, ein KI-System von NeXify AI\./);
    }
  });

  it("gibt sich nie als Mensch aus", () => {
    for (const text of [
      "Ich bin ein Mensch.",
      "Ich bin ein echter Mitarbeiter von NeXify.",
      "Nein, ich bin keine KI.",
      "Ich bin kein Bot, keine Sorge.",
      "Hier schreibt Ihnen ein Mensch.",
      "Ich bin Pascal.",
      "I am a real person.",
      "I'm not a bot.",
    ])
      expect(claimsToBeHuman(text), text).toBe(true);
    for (const text of [
      "Ich bin wirklich ein Mensch.",
      "Ich bin tatsächlich eine echte Person.",
      "Ich bin Ihr persönlicher Ansprechpartner.",
      "Ich bin ein Kollege aus dem Team.",
      "Ich bin echt.",
      "Ich bin aus Fleisch und Blut.",
      "Ich bin keine Maschine.",
      "Ich bin kein Computer.",
      "Ich bin weder eine KI noch ein Bot.",
      "Mein Name ist Pascal.",
      "Hier ist Pascal.",
      "Hier spricht Pascal Courbois.",
      "Sie sprechen mit einem Menschen.",
      "Sie schreiben gerade mit Pascal.",
      "Sie chatten mit einem echten Mitarbeiter.",
      "Als Mensch verstehe ich das gut.",
      "Keine KI, sondern ein Mensch antwortet Ihnen.",
      "Ich bin **ein Mensch**.",
      "I am really a human.",
    ])
      expect(claimsToBeHuman(text), text).toBe(true);
    for (const text of [
      "Ich bin AIFly ORACLE, ein KI-System von NeXify AI.",
      "Sie sprechen mit einem KI-System, nicht mit einem Menschen.",
      "Ihr Ansprechpartner ist Pascal Courbois.",
      "Ich bin kein Ersatz für das persönliche Gespräch.",
      "Mit einem Menschen sprechen Sie über das Kontaktformular.",
      "Ich bin kein Mensch, sondern ein KI-System.",
      "Pascal führt das Gespräch persönlich.",
      "Sie brauchen keinen Chatbot, sondern ein Portal.",
    ])
      expect(claimsToBeHuman(text), text).toBe(false);
    const guard = run(
      "Gute Frage. Ich bin ein echter Mitarbeiter und helfe gern.\nWas planen Sie?",
    );
    expect(guard.text).not.toMatch(/echter Mitarbeiter/);
    expect(guard.text).toMatch(/Ich bin AIFly ORACLE, ein KI-System von NeXify AI\./);
    expect([...guard.violations]).toEqual(["human_claim"]);
  });

  it("lässt eine Menschenbehauptung auch am erzwungenen Schnitt nicht in zwei Hälften durch", () => {
    for (const claim of ["ich bin ein echter Mensch", "ich bin kein Chatbot", "I'm not a bot"])
      for (let pad = 430; pad <= 500; pad += 7)
        for (const size of [5, 64]) {
          const text =
            "Gern" +
            " und".repeat(Math.floor(pad / 4)) +
            " ".repeat(pad % 4 ? 1 : 0) +
            "x".repeat(Math.max(0, (pad % 4) - 1)) +
            " " +
            claim +
            " und helfe Ihnen gern weiter mit allem";
          const guard = run(text, {}, size);
          expect(claimsToBeHuman(guard.text), `${claim} / ${pad} / ${size}`).toBe(false);
          expect(guard.violations).toContain("human_claim");
        }
    const plain =
      "Wir planen " + "sorgfältig und Schritt für Schritt ".repeat(20) + "bis alles steht";
    expect(run(plain, {}, 9).text).toBe(plain);
  });

  it("lässt gewöhnliche Antworten unverändert und gibt laufend frei", () => {
    for (const text of [
      "Verstanden: Sie möchten Ihre Website erneuern. Für wen ist sie vor allem gedacht?",
      "Dazu passt [Marke & Web](/leistungen/websites), z. B. für einen neuen Auftritt. Bis wann soll er stehen?",
      "Erste Zeile.\n\nZweite Zeile ohne Punkt",
    ])
      for (const size of [1, 6, 50]) expect(run(text, {}, size).text).toBe(text);
    const guard = createOutputGuard();
    expect(guard.push("Erster Satz. Zweiter")).toBe("Erster Satz. ");
    expect(guard.push(" Satz.\n")).toBe("Zweiter Satz.\n");
  });

  it("entfernt auch ~~~-Blöcke und Inline-Code-Zeichen", () => {
    for (const size of [1, 2, 5, 400]) {
      const guard = run('Ergebnis:\n~~~json\n{"preis": "999 €"}\n~~~\nNoch Fragen?', {}, size);
      expect(guard.text, `Stückelung ${size}`).not.toMatch(/~|preis|999/);
      expect(guard.text).toMatch(/Noch Fragen\?$/);
      expect(guard.blocks).toHaveLength(1);
      expect(run("Ein `Code`-Wort bleibt Text.", {}, size).text).toBe("Ein Code-Wort bleibt Text.");
    }
    // Besteht die Antwort nur aus einem Block, bleibt kein sichtbarer Text.
    expect(run("```js\nalert(1)\n```").text).toBe("");
  });

  it("prüft lange Antworten in linearer Zeit", () => {
    const lang = "Wir planen sorgfältig und Schritt für Schritt. ".repeat(4000);
    const beginn = performance.now();
    const guard = createOutputGuard();
    let laenge = 0;
    for (let i = 0; i < lang.length; i += 16) laenge += guard.push(lang.slice(i, i + 16)).length;
    laenge += guard.finish().length;
    expect(laenge).toBe(lang.length);
    // 188.000 Zeichen in 11.750 Stücken; quadratischer Aufwand läge weit über dieser Grenze.
    expect(performance.now() - beginn).toBeLessThan(1500);
  });

  it("löst Datenblöcke aus dem sichtbaren Text", () => {
    const guard = run('Hier das Ergebnis.\n```json\n{"preis": "999 €"}\n```\nNoch Fragen?', {}, 5);
    expect(guard.text).not.toMatch(/```|preis|999/);
    expect(guard.text).toMatch(/^Hier das Ergebnis\./);
    expect(guard.text).toMatch(/Noch Fragen\?$/);
    expect(guard.blocks).toHaveLength(1);
  });

  it("ersetzt den Geviertstrich durch den Halbgeviertstrich der Website", () => {
    expect(germanDashes("bringen — mehr Anfragen")).toBe("bringen – mehr Anfragen");
    expect(germanDashes("Auftritt—oder beides")).toBe("Auftritt – oder beides");
  });
});
