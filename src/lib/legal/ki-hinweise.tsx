// 2026-11-19 19:27 (Europe/Berlin): KI-Hinweise nach EU AI Act Art. 50 eingesetzt (Freigabe Inhaber 19.11.2026).
// Warum: Die Live-Seite nannte keine Kennzeichnung; der geprüfte Entwurf beschreibt Einsatz, Grenzen und Rückmeldung.
import type { LegalSection } from "@/components/site/LegalSections";

export const kiHinweiseSections: LegalSection[] = [
  {
    id: "content-ai-einsatz-0",
    title: "Wo KI im Einsatz ist",
    blocks: [
      <p key="p1">NeXify AI setzt KI-gestützte Werkzeuge ein für:</p>,
      <ul key="list">
        <li>Entwurf und Überarbeitung von Texten dieser Website,</li>
        <li>Erstellung und Bearbeitung von Bildwelten,</li>
        <li>Unterstützung bei Konzeption, Recherche und Struktur von Projektunterlagen,</li>
        <li>KI-Assistenten in Kundenprojekten, soweit dort gesondert ausgewiesen.</li>
      </ul>,
    ],
  },
  {
    id: "content-ai-kennzeichnung-1",
    title: "Kennzeichnung nach Art. 50",
    blocks: [
      <ul key="list">
        <li>
          <strong>Texte:</strong> mit KI unterstützt erstellt, vor Veröffentlichung redaktionell
          geprüft und freigegeben. Verantwortlich für den veröffentlichten Inhalt ist der Anbieter,
          nicht das KI-System.
        </li>
        <li>
          <strong>Bilder:</strong> KI-generierte oder KI-bearbeitete Motive werden als solche
          kenntlich gemacht, soweit sie als reale Szene verstanden werden könnten.
        </li>
        <li>
          <strong>Direkte Interaktion:</strong> Wird auf einer Seite oder in einem Projekt ein
          KI-Assistent angeboten, weisen wir beim ersten Kontakt darauf hin, dass Sie mit einem
          KI-System sprechen — nicht mit einem Menschen.
        </li>
        <li>
          <strong>Keine Kennzeichnungspflicht</strong> besteht, wenn KI nur unterstützend gewirkt
          hat und das Ergebnis nicht als KI-Erzeugnis wahrgenommen wird; die redaktionelle
          Verantwortung bleibt beim Anbieter.
        </li>
      </ul>,
    ],
  },
  {
    id: "content-ai-grenzen-2",
    title: "Was eine KI-Ausgabe nicht ist",
    blocks: [
      <p key="p1">
        Eine KI-Ausgabe ist kein Angebot, keine Zusage und keine rechtsverbindliche Erklärung.
        Verbindlich ist ausschließlich das bestätigte Angebot bzw. die unterzeichnete Vereinbarung.
        Zahlen, Fristen und Leistungsumfang aus KI-Texten sind vor jeder Nutzung zu prüfen.
      </p>,
    ],
  },
  {
    id: "content-ai-qualitaet-3",
    title: "Grenzen und Qualitätssicherung",
    blocks: [
      <ul key="list">
        <li>
          Ergebnisse können unvollständig oder falsch sein; sie werden vor Veröffentlichung oder
          Übergabe geprüft.
        </li>
        <li>Quellen werden, wo möglich, auf Primärquellen zurückgeführt.</li>
        <li>
          Personenbezogene Daten werden nicht in KI-Systeme eingegeben, soweit dies für die Aufgabe
          nicht erforderlich ist.
        </li>
        <li>
          Es findet keine automatisierte Entscheidung mit rechtlicher Wirkung über Personen statt
          (Art. 22 DSGVO).
        </li>
      </ul>,
    ],
  },
  {
    id: "content-ai-verantwortung-4",
    title: "Verantwortung und Rückmeldung",
    blocks: [
      <p key="p1">
        Verantwortlich für den Einsatz der KI-Werkzeuge ist NeXify AI by NeXify, Inhaber Pascal
        Courbois. Wenn Sie eine KI-Kennzeichnung vermissen oder ein Ergebnis anzweifeln, melden Sie
        es an mail@nexifyai.cloud — wir prüfen und korrigieren.
      </p>,
      <p key="p2">Stand: 19. November 2026.</p>,
    ],
  },
];
