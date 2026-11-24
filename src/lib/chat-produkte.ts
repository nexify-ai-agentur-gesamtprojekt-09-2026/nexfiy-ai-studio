/**
 * Deterministische Antworten auf Produktfragen.
 *
 * Warum nicht über das Modell: Der Router maskiert Eigennamen (gemessen: Fragen zur „NeX AIFly
 * Suite“ wurden mit Sitz-/Anschrifttexten beantwortet, „Was ist NeX AIFly Suite?“ mit „Sitz in
 * Vaals“). Produktbeschreibungen sind öffentlich und kurz; sie werden deshalb ohne Modell geliefert.
 */

const SUITE = /\bsuite\b/iu;
const AGENTEN = /\b(agent(?:en|ic)?|aifly\s*oracle|nex)\b/iu;
const API = /\bapi\b/iu;
const SKILLS = /\b(mcp|skills)\b/iu;
const FRAGE = /\b(was|wie|welche[nsr]?|erkl\w*|beschreib\w*|ist|sind|gibt es|kann man|wofür|wozu)\b/iu;

export function produktAntwort(nachricht: string): string | null {
  const text = nachricht.trim();
  if (!text) return null;
  const kurz = text.split(/\s+/u).length <= 3;
  if (!FRAGE.test(text) && !kurz) return null;

  if (SUITE.test(text)) {
    return "Die NeX AIFly Suite ist der Arbeitsbereich für Projekte, Aufgaben, Dateien und Projektwissen – an einer Stelle statt über mehrere Werkzeuge verteilt. Details: /produkte/nex2fly. Umfang und Kosten klärt ein persönliches Angebot über /kontakt.";
  }
  if (SKILLS.test(text)) {
    return "Skills und MCP binden Ihre Werkzeuge an die Agenten von NeXify AI an. Details: /produkte/skills-mcp. Zugang und Umfang klärt ein persönliches Gespräch über /kontakt.";
  }
  if (API.test(text)) {
    return "Die NeXify API bringt KI-Funktionen von NeXify in Ihre eigene Anwendung. Details: /produkte/api. Den Zugang erhalten Sie im Projekt über /kontakt.";
  }
  if (AGENTEN.test(text)) {
    return "NeX und AIFly ORACLE sind die beiden Agenten von NeXify AI: NeX führt aus, AIFly ORACLE ordnet. Details: /produkte/one. Zugang und Umfang klärt ein persönliches Gespräch über /kontakt.";
  }
  return null;
}
