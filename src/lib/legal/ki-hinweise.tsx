// 2026-11-22 (Europe/Berlin): ENTWURF zur Freigabe durch den Inhaber – nicht freigegeben, keine
//   Rechtsberatung. Stellen mit „[INHABER: …]" sind offen.
// Warum: Der Website-Chat (src/components/chat/, Server src/lib/chat-api.ts) war in der Fassung vom
//   19.11.2026 nicht als Einsatzort genannt. Er ist standardmäßig aus (`CHAT_AKTIV`); seine Antworten
//   entstehen automatisch und werden nicht vorab von Menschen geprüft.
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
        <li>
          den KI-Assistenten im Chat-Fenster dieser Website, sofern er eingeschaltet ist (derzeit
          standardmäßig ausgeschaltet),
        </li>
        <li>KI-Assistenten in Kundenprojekten, soweit dort gesondert ausgewiesen.</li>
      </ul>,
    ],
  },
  {
    id: "content-ai-chat-1",
    title: "KI-Assistent auf dieser Website",
    blocks: [
      <p key="p1">Sofern der KI-Assistent im Chat-Fenster eingeschaltet ist, gilt:</p>,
      <ul key="list">
        <li>
          Sie schreiben mit einem KI-System, nicht mit einem Menschen. Darauf weist das Chat-Fenster
          vor der ersten Frage hin.
        </li>
        <li>
          Die Antworten entstehen automatisch und werden <strong>nicht</strong> vor der Ausgabe von
          einem Menschen geprüft. Sie können unvollständig oder falsch sein.
        </li>
        <li>
          Der Assistent beantwortet Fragen zu unseren Leistungen auf Grundlage der Inhalte dieser
          Website. Antworten sind keine Zusage, kein Angebot und keine Beratung; verbindliche
          Auskünfte erhalten Sie über <a href="/kontakt">Kontakt</a>.
        </li>
        <li>
          Eingesetzt wird das Sprachmodell DeepSeek V4.1 Flash eines externen Anbieters, angebunden
          über OpenRouter. Welche Daten dabei verarbeitet und wie lange sie gespeichert werden,
          steht in der <a href="/datenschutz">Datenschutzerklärung</a>.
        </li>
        <li>Bitte geben Sie im Chat keine sensiblen Daten ein.</li>
      </ul>,
    ],
  },
  {
    id: "content-ai-kennzeichnung-2",
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
          KI-System sprechen — nicht mit einem Menschen. Antworten des Website-Chats sind im
          Chat-Fenster als KI-Antwort gekennzeichnet.
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
    id: "content-ai-grenzen-3",
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
    id: "content-ai-qualitaet-4",
    title: "Grenzen und Qualitätssicherung",
    blocks: [
      <ul key="list">
        <li>
          Ergebnisse können unvollständig oder falsch sein. Veröffentlichte Texte und übergebene
          Unterlagen werden vorher geprüft; Antworten des Website-Chats werden nicht vorab geprüft
          (siehe oben).
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
    id: "content-ai-verantwortung-5",
    title: "Verantwortung und Rückmeldung",
    blocks: [
      <p key="p1">
        Verantwortlich für den Einsatz der KI-Werkzeuge ist NeXify AI by NeXify, Inhaber Pascal
        Courbois. Wenn Sie eine KI-Kennzeichnung vermissen oder ein Ergebnis anzweifeln, melden Sie
        es an mail@nexifyai.cloud — wir prüfen und korrigieren.
      </p>,
      <p key="p2">Stand: [INHABER: Datum der Freigabe].</p>,
    ],
  },
];
