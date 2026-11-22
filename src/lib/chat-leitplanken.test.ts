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

  it("erlaubt nur das Budget, das der Besucher selbst genannt hat", () => {
    const allowed = visitorAmounts(
      [
        { role: "user", content: "Unser Budget liegt bei 8.000 €." },
        { role: "assistant", content: "Nicht 9.000 €." },
      ],
      "höchstens 10k",
    );
    expect([...allowed].sort()).toEqual(["10000", "8000"]);
    expect(
      run("Mit Ihrem Budget von 8.000 € planen wir den Kern.", { allowedAmounts: allowed }).text,
    ).toBe("Mit Ihrem Budget von 8.000 € planen wir den Kern.");
    expect(run("Bis 10k € ist das machbar.", { allowedAmounts: allowed }).violations).toHaveLength(
      0,
    );
    expect(
      run("Realistisch sind eher 12.000 €.", { allowedAmounts: allowed }).violations,
    ).toHaveLength(1);
    // Eine beiläufige Zahl des Besuchers gibt keinen Tausenderbetrag frei.
    expect(
      hasUnapprovedAmount("Das kostet 3.000 €.", visitorAmounts([], "Ich brauche 3 Seiten")),
    ).toBe(true);
  });

  it("rechnet Maßangaben mit Dezimalstelle richtig", () => {
    expect([...visitorAmounts([], "Wir haben etwa 1,5k € eingeplant.")]).toEqual(["1500"]);
    expect([...visitorAmounts([], "maximal 2.5 Mio")]).toEqual(["2500000"]);
    expect([...visitorAmounts([], "1.500k")]).toEqual(["1500000"]);
    const allowed = visitorAmounts([], "Budget 1,5k €");
    expect(hasUnapprovedAmount("Mit 1.500 € planen wir den Kern.", allowed)).toBe(false);
    expect(hasUnapprovedAmount("Das kostet 1.000 €.", allowed)).toBe(true);
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
      "Ich bin AIFly ORACLE, ein KI-System von NeXify AI.",
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
      "Ein `Code`-Wort bleibt Text.",
    ])
      for (const size of [1, 6, 50]) expect(run(text, {}, size).text).toBe(text);
    const guard = createOutputGuard();
    expect(guard.push("Erster Satz. Zweiter")).toBe("Erster Satz. ");
    expect(guard.push(" Satz.\n")).toBe("Zweiter Satz.\n");
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
