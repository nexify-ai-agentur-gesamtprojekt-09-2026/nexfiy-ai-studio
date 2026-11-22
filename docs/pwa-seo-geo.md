# Installierbare Web-App, Suchmaschinen und KI-Suche

Stand 22.11.2026. Beschreibt, was dieses Repository für die Installation als Web-App, für
Suchmaschinen und für generative Suchsysteme ausliefert, wo es steht und wie man es prüft.

## Installierbare Web-App

Es ist eine Web-App aus dem Browser („Installieren" bzw. „Zum Home-Bildschirm"), keine App aus
einem App-Store. Sie zeigt dieselben Seiten wie die Website und braucht eine Internetverbindung;
ohne Netz erscheint die Offline-Seite.

| Teil                 | Ort                                                                                                |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Manifest             | `public/manifest.webmanifest` (Icons in `public/icons/`, Bildschirmfotos in `public/screenshots/`) |
| Service Worker       | `src/lib/pwa/service-worker.js`, ausgeliefert als `/sw.js` durch `src/server.ts`                   |
| Offline-Seite        | `src/lib/offline-page.ts`, ausgeliefert als `/offline` (ohne Skripte, `noindex`)                   |
| Anmelden im Browser  | `src/components/pwa/PwaRegistration.tsx` (nur Produktion, nach dem Laden)                          |
| Installationshinweis | `src/components/pwa/InstallHint.tsx`, im Seitenfluss unter der Fußzeile                            |
| Schalter             | `src/lib/pwa-config.ts`                                                                            |

Der Worker speichert nur die Offline-Seite mit Markenzeichen und zwei Schriften, einmal beim
Installieren. Ein Zwischenspeichern zur Laufzeit gibt es nicht: Skripte, Stile, Bilder und Filme
unter `/assets/` und `/site-assets/` fasst er nicht an, sie gehen ungehindert ans Netz und in den
normalen Browser-Cache. Seiten kommen immer aus dem Netz; nur ohne Netz erscheint die
Offline-Seite. Ein Fehler im Cache-Speicher (voll, gesperrt) verhindert deshalb nie eine Antwort
aus dem Netz. Nie beantwortet werden `/api/*`, `/.well-known/*`, Konto- und Kundencenter-Adressen, alles außer
GET, Bereichsanfragen und fremde Ursprünge. Keine Push-Benachrichtigungen, kein Hintergrund-Sync.

Jeder Build bekommt eine eigene Kennung (`vite.config.ts`, `__NEXIFY_BUILD_ID__`) und damit eigene
Cache-Namen. Ein neuer Worker übernimmt sofort und löscht beim Aktivieren die Caches der
Vorgänger. `/sw.js` wird mit `Cache-Control: no-cache` ausgeliefert.

### Rückbau

Zwei Wege, beide ohne Zutun der Besucher:

1. **Mit Build:** `PWA_AKTIV` in `src/lib/pwa-config.ts` auf `false` setzen und ausliefern.
   `/sw.js` liefert dann den Abschalt-Worker (`src/lib/pwa/abschalt-worker.js`): Er löscht die
   eigenen Caches und entfernt die Registrierung. Die Seite meldet nichts mehr an, räumt beim
   Aufruf selbst auf und zeigt keinen Installationshinweis.
2. **Ohne Build:** beim Worker die Variable `PWA_ABSCHALTEN=1` setzen (Cloudflare, Einstellungen
   des Workers). `/sw.js` liefert sofort den Abschalt-Worker. Die Seite meldet ihn bei jedem
   Aufruf erneut an, er entfernt sich jeweils wieder – gedacht als Sofortmaßnahme, bis Weg 1
   ausgeliefert ist.

Der Browser prüft `/sw.js` bei jeder Navigation; der Rückbau greift beim nächsten Seitenaufruf
eines Besuchers. `/sw.js` muss dafür erreichbar bleiben und darf nicht mit 404 antworten.

## Suchmaschinen

`src/lib/seo-pages.ts` ist die eine Tabelle aller Seiten: Titel, Beschreibung, Seitentyp,
Indexierbarkeit. Jede Route ruft `pageHead("<pfad>")` aus `src/lib/seo.ts` auf und bekommt daraus
Titel, Beschreibung, kanonische Adresse, Vorschaukarte (`og:*`, `twitter:*`) und strukturierte
Daten. Bild der Vorschaukarte und `twitter:card` setzt `src/routes/__root.tsx` für alle Seiten.

Strukturierte Daten (JSON-LD), nur mit Angaben, die sichtbar auf der Website stehen:

- jede Seite: `Organization`/`ProfessionalService` und `WebSite` (Angaben aus
  `src/lib/site-facts.ts`, wortgleich zum Impressum);
- jede Seite: `WebPage` (Kontakt: `ContactPage`, Unternehmen: `AboutPage`), ab der zweiten Ebene
  mit `BreadcrumbList`;
- `/leistungen/*`: `Service`;
- Startseite: `FAQPage` aus derselben Liste, die die sichtbaren Fragen und Antworten speist.

Nicht ausgezeichnet werden Bewertungen, Preise, Auszeichnungen und Koordinaten. Die Abschnitte
„Was ist es? / Für wen ist es geeignet? …" auf Leistungs- und Produktseiten bekommen kein
`FAQPage`: Die Fragen sind ohne den Seitenzusammenhang nicht verständlich.

`public/sitemap.xml` entsteht mit `node tools/generate-sitemap.mjs` aus der Seitentabelle; das
Änderungsdatum je Seite ist das Git-Datum ihrer Routendatei. Kontoseiten und `/offline` stehen
nicht darin und tragen `noindex`. `public/robots.txt` sperrt nur `/api/`; die KI-Crawler GPTBot,
ClaudeBot und PerplexityBot sind bewusst erlaubt und stehen in derselben Gruppe wie `*`, damit
die Sperre von `/api/` auch für sie gilt.

**Neue Seite anlegen:** Routendatei mit `pageHead("<pfad>")`, Eintrag in `seo-pages.ts`,
`node tools/generate-sitemap.mjs`, bei Bedarf Zeile in `public/llms.txt`. `npm test` meldet jede
Abweichung zwischen Routen, Tabelle, Sitemap und `llms.txt`.

## KI-Suche und Ortsangaben

`public/llms.txt` beschreibt kurz, wer NeXify AI ist, was angeboten wird, für wen, wo und wie man
Kontakt aufnimmt, mit dem ehrlichen Stand der Produkte und des Kundencenters. Sie nennt nur
indexierbare Seiten. Eine `llms-full.txt` gibt es nicht: Die Seiteninhalte stehen fest in den
Routendateien und lassen sich nicht sauber als Text herausziehen.

Anschrift, Telefon, E-Mail, Rechtsform und Registernummer stehen in `src/lib/site-facts.ts`.
`areaServed` nennt Deutschland, die Niederlande, Österreich und die Schweiz, weil die Startseite
genau diese Länder nennt. Es gibt keine Standort- oder Länderseiten.

## Prüfen

- `npm test`: Cache-Regeln und Rückbau (`src/lib/pwa.test.ts`, `src/lib/pwa-client.test.ts`),
  Seitenkopf und strukturierte Daten je Route, Sitemap, robots.txt, llms.txt, Manifest
  (`src/lib/seo.test.ts`), Auslieferung von `/sw.js` und `/offline` (`src/server.test.ts`).
- `node tools/live-check.mjs --base=<adresse>`: dieselben Soll-Punkte gegen eine laufende Seite.
- Erst nach der Auslieferung messbar: Installierbarkeit im echten Chrome und in Safari auf dem
  Gerät, Lighthouse, Rich-Results-Test, Search Console (Sitemap einreichen, Abdeckung).
