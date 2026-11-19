// 2026-11-19 19:28 (Europe/Berlin): Barrierefreiheitserklärung mit BFSG-/EN-301-549-Bezug eingesetzt
// (Freigabe Inhaber 19.11.2026). Warum: Die Live-Seite nannte weder Normen noch Rückmeldeweg.
import type { LegalSection } from "@/components/site/LegalSections";

export const barrierefreiheitSections: LegalSection[] = [
  {
    id: "content-a11y-anspruch-0",
    title: "Anspruch",
    blocks: [
      <p key="p1">
        Diese Website soll von allen Menschen nutzbar sein — mit Tastatur, mit Screenreader, mit
        vergrößerter Schrift, bei reduzierter Bewegung. Wir orientieren uns an den anerkannten
        Standards:
      </p>,
      <ul key="list">
        <li>
          <strong>WCAG 2.2, Stufe AA</strong> (Web Content Accessibility Guidelines),
        </li>
        <li>
          <strong>EN 301 549</strong> (europäische Norm für Barrierefreiheitsanforderungen an IKT),
        </li>
        <li>
          <strong>DIN EN ISO 9241-110 und -210</strong> (Grundsätze der Dialoggestaltung,
          Interaktionsprinzipien).
        </li>
      </ul>,
    ],
  },
  {
    id: "content-a11y-massnahmen-1",
    title: "Umgesetzte Maßnahmen",
    blocks: [
      <ul key="list">
        <li>durchgehende Tastaturbedienbarkeit mit sichtbarem Fokus,</li>
        <li>beschreibende Alternativtexte für inhaltstragende Bilder,</li>
        <li>semantische Überschriftenhierarchie und Landmarken,</li>
        <li>Kontrastverhältnisse von mindestens 4,5:1 für Text,</li>
        <li>Bedienelemente mit ausreichend großer Trefferfläche,</li>
        <li>Berücksichtigung von prefers-reduced-motion für Bewegungen,</li>
        <li>keine Information, die ausschließlich über Farbe vermittelt wird,</li>
        <li>Sprache der Seite ist ausgezeichnet (lang=&quot;de&quot;).</li>
      </ul>,
    ],
  },
  {
    id: "content-a11y-grenzen-2",
    title: "Bekannte Einschränkungen",
    blocks: [
      <p key="p1">
        Einzelne Seiten enthalten dekorative Bewegungselemente und Bildfolgen. Bei aktivierter
        Bewegungsreduktion werden diese reduziert, nicht in jedem Fall vollständig ersetzt. Einzelne
        ältere PDF- oder Bildinhalte können noch nicht vollständig barrierefrei sein.
      </p>,
      <p key="p2">
        Eine vollständige Konformität mit WCAG 2.2 AA wird derzeit nicht zugesichert; diese
        Erklärung wird nach jeder Überarbeitung aktualisiert.
      </p>,
    ],
  },
  {
    id: "content-a11y-rueckmeldung-3",
    title: "Rückmeldung und Durchsetzung",
    blocks: [
      <p key="p1">
        Wenn Ihnen eine Barriere auffällt, melden Sie sie an mail@nexifyai.cloud mit der betroffenen
        Adresse und einer kurzen Beschreibung. Wir prüfen jede Meldung und antworten innerhalb von
        vier Wochen mit einer Einschätzung und, soweit möglich, einem Termin für die Behebung.
      </p>,
      <p key="p2">
        Sollte eine Meldung nicht zufriedenstellend bearbeitet werden, können Sie sich an die
        Marktüberwachungsstelle für Barrierefreiheit des Bundes wenden (Deutschland) bzw. an die
        zuständige Behörde Ihres Mitgliedstaats.
      </p>,
    ],
  },
  {
    id: "content-a11y-stand-4",
    title: "Stand",
    blocks: [
      <p key="p1">
        Stand: 19. November 2026. Diese Erklärung wird überprüft, sobald sich die Website wesentlich
        ändert.
      </p>,
    ],
  },
];
