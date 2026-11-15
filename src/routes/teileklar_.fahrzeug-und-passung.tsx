import type { CSSProperties } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/teileklar.fahrzeug-und-passung.css?raw";

export const Route = createFileRoute("/teileklar_/fahrzeug-und-passung")({
  head: () => ({ meta: [{ title: "Passt das Teil? So prüfen Sie es. · TEILEKLAR.shop" }, { name: "description", content: "Welche Angaben Sie benötigen, um die Passung eines Fahrzeugteils zu prüfen." }, { property: "og:title", content: "Passt das Teil? So prüfen Sie es. · TEILEKLAR.shop" }, { property: "og:description", content: "Welche Angaben Sie benötigen, um die Passung eines Fahrzeugteils zu prüfen." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  const [activeSlide0, setActiveSlide0] = useState(0);
  const carouselContent0 = (<>
{activeSlide0 === 0 && <Fragment key={0}>
<svg className={"glass-lens-filter"} width="0" height="0" aria-hidden="true" {...({ focusable: "false" } as any)}>
  <filter id="as-linse" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "36", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
  <filter id="as-linse-leiste" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse-leiste.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "30", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
  <filter id="as-linse-front" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse-front.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "44", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
</svg>
<div className={"website"}>
  <a className={"skip-link"} href="#page-content">Zum Inhalt</a>
  <header className={"tk-commerce-header"}>
    <div className={"tk-service-strip"}>
      <span>Auto &amp; Motorrad · Alle Preise inkl. MwSt.</span>
      <a href="/teileklar/rechtliches">Versand &amp; Rückgabe</a>
      <a href="/kontakt">Persönlicher Kontakt</a>
    </div>
    <div className={"tk-commerce-main"}>
      <a className={"tk-wordmark"} href="/teileklar">TEILE<span>KLAR</span><small>Passende Auswahl. Klare Angaben.</small></a>
      <form method="get" role="search" className={"tk-header-search"}>
        <label className={"visually-hidden"} htmlFor="store-search">Artikel, Marke oder Artikelnummer suchen</label>
        <input id="store-search" maxLength={120} placeholder="Artikel, Marke oder Artikelnummer" type="search" name="q" />
        <button className={"primary-button"} type="submit">Suchen</button>
      </form>
      <div className={"tk-header-account"}>
        <a href="/anmelden">Mein Konto</a>
        <a className={"tk-header-cart"} href="/teileklar/warenkorb">Warenkorb <span>–</span></a>
      </div>
    </div>
    <nav className={"tk-commerce-nav"} aria-label="Shopnavigation">
      <a href="/teileklar">Schaufenster</a>
      <a href="/teileklar/shop">Alle Artikel</a>
      <a href="/teileklar/kategorien">Kategorien</a>
      <a aria-current="page" href="#">Fahrzeugpassung</a>
      <a href="/teileklar/werkstatt">Werkstätten</a>
      <a href="/teileklar/bestellungen">Meine Bestellungen</a>
    </nav>
  </header>
  <main id="page-content" tabIndex={-1}>
    <div className={"home-concept page-concept page-tk-fitment layout-commerce context-teileklar"}>
      <section className={"identity-hero"} aria-labelledby="page-title-tk-fitment">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
              <ol>
                <li>
                  <a href="/">Startseite</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                </li>
                <li className={"visually-hidden"}>
                  <span aria-current="page">Passt das Teil? So prüfen Sie es.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Teile, Fahrzeug und nächste Schritte</span>
            <h1 id="page-title-tk-fitment">Passt das Teil? So prüfen Sie es.</h1>
            <p className={"identity-body"}>Der Modellname allein reicht nicht. Mit Schlüsselnummern, Baujahr und Motor finden Sie heraus, worauf es bei Ihrem Teil ankommt.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/teileklar/suche">
                <span>Teile suchen</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/produkt">Artikel ansehen</a>
            </div>
          </div>
          <div className={"identity-media"}>
            <figure className={"identity-hero-photo"}>
              <img sizes="(max-width: 820px) 100vw, 60vw" alt="Markeninszenierung: Pascal und ein Gesprächspartner betrachten Pläne und ein technisches Modell auf einem Arbeitstisch" width="2000" height="1125" loading="eager" fetchPriority="high" decoding="async" srcSet="/site-assets/3c2a16020520a9d2.webp 800w, /site-assets/310f26f4c183ff5d.webp 1280w, /site-assets/df162c342bb041e0.webp 1920w" src="/site-assets/df162c342bb041e0.webp" />
            </figure>
          </div>
        </div>
      </section>
      <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
        <a href="#content-tk-fitment-tk-fitment-customer-1-0">Ihr Fahrzeug genau benennen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-fitment-tk-fitment-customer-2-1">Was die Checkliste leistet<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <section className={"hc-container pc-supplement"}>
        <section className={"tk-form"} aria-labelledby="fit-title">
          <h2 id="fit-title">Passung prüfen: Worauf es ankommt</h2>
          <p className={"tk-meta"}>Ein Artikelname belegt keine Passung. Wählen Sie eine Kategorie und sehen Sie, welche Angaben entscheiden. Eine automatische Passungsprüfung gegen einen Fahrzeugkatalog gibt es noch nicht.</p>
          <div className={"tk-actions"} role="group" aria-label="Kategorie wählen">
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Bremsen</button>
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Batterie</button>
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Beleuchtung</button>
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Filter</button>
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Fahrwerk</button>
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Reifen</button>
          </div>
          <div className={"tk-actions"}>
            <a className={"hc-text-link"} href="/teileklar/suche">Teilesuche öffnen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/werkstatt">Werkstatt in der Nähe suchen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </div>
        </section>
        <section className={"tk-form"} aria-labelledby="tyre-title">
          <h2 id="tyre-title">Reifenrechner</h2>
          <p className={"tk-meta"}>Vergleicht Durchmesser, Abrollumfang und Tachoabweichung zweier Reifengrößen. Das Ergebnis ersetzt keine Prüfung der Fahrzeugpapiere.</p>
          <fieldset className={"tk-form-grid tk-tyre-size"}>
            <legend>Aktuelle Größe: 205/55 R16</legend>
            <label className={"tk-field"} id="bb-customSelect-irkxD-label">Breite<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-irkxD-panel" aria-activedescendant="bb-customSelect-irkxD-selectedOption" aria-labelledby="bb-customSelect-irkxD-label" tabIndex={0}><span>205</span></span><select tabIndex={-1} defaultValue="155"><option value="155">155</option><option value="165">165</option><option value="175">175</option><option value="185">185</option><option value="195">195</option><option value="205">205</option><option value="215">215</option><option value="225">225</option><option value="235">235</option><option value="245">245</option><option value="255">255</option><option value="265">265</option><option value="275">275</option><option value="285">285</option><option value="295">295</option><option value="305">305</option><option value="315">315</option></select><div id="bb-customSelect-irkxD-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">155</div><div className={"bb-custom-select-option"} role="option">165</div><div className={"bb-custom-select-option"} role="option">175</div><div className={"bb-custom-select-option"} role="option">185</div><div className={"bb-custom-select-option"} role="option">195</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-irkxD-selectedOption">205</div><div className={"bb-custom-select-option"} role="option">215</div><div className={"bb-custom-select-option"} role="option">225</div><div className={"bb-custom-select-option"} role="option">235</div><div className={"bb-custom-select-option"} role="option">245</div><div className={"bb-custom-select-option"} role="option">255</div><div className={"bb-custom-select-option"} role="option">265</div><div className={"bb-custom-select-option"} role="option">275</div><div className={"bb-custom-select-option"} role="option">285</div><div className={"bb-custom-select-option"} role="option">295</div><div className={"bb-custom-select-option"} role="option">305</div><div className={"bb-custom-select-option"} role="option">315</div></div></div></label>
            <label className={"tk-field"} id="bb-customSelect-qkcVY-label">Höhe (%)<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-qkcVY-panel" aria-activedescendant="bb-customSelect-qkcVY-selectedOption" aria-labelledby="bb-customSelect-qkcVY-label" tabIndex={0}><span>55</span></span><select tabIndex={-1} defaultValue="30"><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option><option value="50">50</option><option value="55">55</option><option value="60">60</option><option value="65">65</option><option value="70">70</option><option value="75">75</option><option value="80">80</option></select><div id="bb-customSelect-qkcVY-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">30</div><div className={"bb-custom-select-option"} role="option">35</div><div className={"bb-custom-select-option"} role="option">40</div><div className={"bb-custom-select-option"} role="option">45</div><div className={"bb-custom-select-option"} role="option">50</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-qkcVY-selectedOption">55</div><div className={"bb-custom-select-option"} role="option">60</div><div className={"bb-custom-select-option"} role="option">65</div><div className={"bb-custom-select-option"} role="option">70</div><div className={"bb-custom-select-option"} role="option">75</div><div className={"bb-custom-select-option"} role="option">80</div></div></div></label>
            <label className={"tk-field"} id="bb-customSelect-yAAjR-label">Zoll<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-yAAjR-panel" aria-activedescendant="bb-customSelect-yAAjR-selectedOption" aria-labelledby="bb-customSelect-yAAjR-label" tabIndex={0}><span>16</span></span><select tabIndex={-1} defaultValue="13"><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option></select><div id="bb-customSelect-yAAjR-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">13</div><div className={"bb-custom-select-option"} role="option">14</div><div className={"bb-custom-select-option"} role="option">15</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-yAAjR-selectedOption">16</div><div className={"bb-custom-select-option"} role="option">17</div><div className={"bb-custom-select-option"} role="option">18</div><div className={"bb-custom-select-option"} role="option">19</div><div className={"bb-custom-select-option"} role="option">20</div><div className={"bb-custom-select-option"} role="option">21</div><div className={"bb-custom-select-option"} role="option">22</div></div></div></label>
          </fieldset>
          <fieldset className={"tk-form-grid tk-tyre-size"}>
            <legend>Geplante Größe: 225/45 R17</legend>
            <label className={"tk-field"} id="bb-customSelect-EaJWz-label">Breite<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-EaJWz-panel" aria-activedescendant="bb-customSelect-EaJWz-selectedOption" aria-labelledby="bb-customSelect-EaJWz-label" tabIndex={0}><span>225</span></span><select tabIndex={-1} defaultValue="155"><option value="155">155</option><option value="165">165</option><option value="175">175</option><option value="185">185</option><option value="195">195</option><option value="205">205</option><option value="215">215</option><option value="225">225</option><option value="235">235</option><option value="245">245</option><option value="255">255</option><option value="265">265</option><option value="275">275</option><option value="285">285</option><option value="295">295</option><option value="305">305</option><option value="315">315</option></select><div id="bb-customSelect-EaJWz-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">155</div><div className={"bb-custom-select-option"} role="option">165</div><div className={"bb-custom-select-option"} role="option">175</div><div className={"bb-custom-select-option"} role="option">185</div><div className={"bb-custom-select-option"} role="option">195</div><div className={"bb-custom-select-option"} role="option">205</div><div className={"bb-custom-select-option"} role="option">215</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-EaJWz-selectedOption">225</div><div className={"bb-custom-select-option"} role="option">235</div><div className={"bb-custom-select-option"} role="option">245</div><div className={"bb-custom-select-option"} role="option">255</div><div className={"bb-custom-select-option"} role="option">265</div><div className={"bb-custom-select-option"} role="option">275</div><div className={"bb-custom-select-option"} role="option">285</div><div className={"bb-custom-select-option"} role="option">295</div><div className={"bb-custom-select-option"} role="option">305</div><div className={"bb-custom-select-option"} role="option">315</div></div></div></label>
            <label className={"tk-field"} id="bb-customSelect-9PioH-label">Höhe (%)<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-9PioH-panel" aria-activedescendant="bb-customSelect-9PioH-selectedOption" aria-labelledby="bb-customSelect-9PioH-label" tabIndex={0}><span>45</span></span><select tabIndex={-1} defaultValue="30"><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option><option value="50">50</option><option value="55">55</option><option value="60">60</option><option value="65">65</option><option value="70">70</option><option value="75">75</option><option value="80">80</option></select><div id="bb-customSelect-9PioH-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">30</div><div className={"bb-custom-select-option"} role="option">35</div><div className={"bb-custom-select-option"} role="option">40</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-9PioH-selectedOption">45</div><div className={"bb-custom-select-option"} role="option">50</div><div className={"bb-custom-select-option"} role="option">55</div><div className={"bb-custom-select-option"} role="option">60</div><div className={"bb-custom-select-option"} role="option">65</div><div className={"bb-custom-select-option"} role="option">70</div><div className={"bb-custom-select-option"} role="option">75</div><div className={"bb-custom-select-option"} role="option">80</div></div></div></label>
            <label className={"tk-field"} id="bb-customSelect-Aj3TF-label">Zoll<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-Aj3TF-panel" aria-activedescendant="bb-customSelect-Aj3TF-selectedOption" aria-labelledby="bb-customSelect-Aj3TF-label" tabIndex={0}><span>17</span></span><select tabIndex={-1} defaultValue="13"><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option></select><div id="bb-customSelect-Aj3TF-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">13</div><div className={"bb-custom-select-option"} role="option">14</div><div className={"bb-custom-select-option"} role="option">15</div><div className={"bb-custom-select-option"} role="option">16</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-Aj3TF-selectedOption">17</div><div className={"bb-custom-select-option"} role="option">18</div><div className={"bb-custom-select-option"} role="option">19</div><div className={"bb-custom-select-option"} role="option">20</div><div className={"bb-custom-select-option"} role="option">21</div><div className={"bb-custom-select-option"} role="option">22</div></div></div></label>
          </fieldset>
          <dl className={"tk-tyre-results"} aria-live="polite">
            <div>
              <dt>Durchmesser</dt>
              <dd>631,9 mm → 634,3 mm</dd>
            </div>
            <div>
              <dt>Abrollumfang</dt>
              <dd>1.985 mm → 1.993 mm</dd>
            </div>
            <div>
              <dt>Abweichung</dt>
              <dd>+0,38 %</dd>
            </div>
            <div>
              <dt>Bodenfreiheit</dt>
              <dd>+1,2 mm</dd>
            </div>
            <div>
              <dt>Tacho zeigt 100 km/h, tatsächlich</dt>
              <dd>100,4 km/h</dd>
            </div>
          </dl>
          <p className={"tk-tyre-verdict is-ok"} role="status">Abweichung unter 1,5 %: unkritisch</p>
          <h3>Vor der Montage prüfen</h3>
          <ul className={"tk-checklist"}>
            <li>Die Größe muss in der Zulassungsbescheinigung Teil I (Feld 15) oder im CoC stehen. Sonst sind Teilegutachten und Eintragung nötig.</li>
            <li>Der Tragfähigkeitsindex (LI) darf nie unter dem Wert der Fahrzeugpapiere liegen.</li>
            <li>Der Geschwindigkeitsindex muss zur bauartbedingten Höchstgeschwindigkeit passen.</li>
            <li>Die Felgenbreite muss zur Reifenbreite passen.</li>
            <li>Bei geändertem Durchmesser die Freigängigkeit bei vollem Lenkeinschlag und voller Beladung prüfen.</li>
            <li>RDKS-Sensoren müssen nach dem Wechsel neu angelernt werden.</li>
          </ul>
        </section>
      </section>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-fitment-tk-fitment-customer-1-0" tabIndex={-1} aria-labelledby="content-tk-fitment-tk-fitment-customer-1-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-fitment-tk-fitment-customer-1-0-title">Ihr Fahrzeug genau benennen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Halten Sie HSN und TSN aus dem Fahrzeugschein bereit, oder Modell, Motor und Baujahr. Eine Herstellernummer vom alten Teil hilft zusätzlich.</p>
            <div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/teileklar/suche">Teil, Marke oder Nummer suchen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-fitment-tk-fitment-customer-2-1" tabIndex={-1} aria-labelledby="content-tk-fitment-tk-fitment-customer-2-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-fitment-tk-fitment-customer-2-1-title">Was die Checkliste leistet</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Sie zeigt je Teileart, welche Angaben entscheiden und wo der häufigste Irrtum liegt. Eine automatische Prüfung gegen einen Fahrzeugkatalog gibt es noch nicht; im Zweifel fragen Sie eine Werkstatt.</p>
          </div>
        </section>
      </div>
      <section className={"hc-container pc-guide"} aria-label="Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE">
        <details className={"hc-service-detail"}>
          <summary>
            <span>
              <strong className={"hc-service-name"}>Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE</strong>
            </span>
            <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14m-7-7v14" />
            </svg>
          </summary>
          <div className={"hc-service-body"}>
            <p>Die Seitenführung verbindet unsere Leistungen, Produkte und Projektwege. Sie können jeden Bereich auch direkt öffnen.</p>
            <div className={"pc-guide-controls"}>
              <label id="bb-customSelect-OMFup-label">Welchen Bereich möchten Sie erkunden?<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-OMFup-panel" aria-activedescendant="bb-customSelect-OMFup-selectedOption" aria-labelledby="bb-customSelect-OMFup-label" tabIndex={0}><span>Ihr Fahrzeug. Die passende Anfrage.</span></span><select tabIndex={-1} defaultValue="business-website"><option value="business-website">Markenstart</option><option value="business-automation">KI im Betrieb</option><option value="business-growth">Wachstum &amp; Kampagnen</option><option value="business-apps">Digitale Arbeitsräume</option><option value="business-api">Agentische KI &amp; Integrationen</option><option value="knowledge-to-project">Ihr Projektbriefing</option><option value="teileklar-selection">Ihr Fahrzeug. Die passende Anfrage.</option><option value="teileklar-workshop">Werkstatt &amp; Zusammenarbeit</option><option value="teileklar-vouchers">Gutschein &amp; Bedingungen</option><option value="existing-client">Zusammenarbeit mit der FACTORY</option><option value="nex2fly-trial">NeX AIFly Suite · Ihr eigener Bereich</option></select><div id="bb-customSelect-OMFup-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">Markenstart</div><div className={"bb-custom-select-option"} role="option">KI im Betrieb</div><div className={"bb-custom-select-option"} role="option">Wachstum &amp; Kampagnen</div><div className={"bb-custom-select-option"} role="option">Digitale Arbeitsräume</div><div className={"bb-custom-select-option"} role="option">Agentische KI &amp; Integrationen</div><div className={"bb-custom-select-option"} role="option">Ihr Projektbriefing</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-OMFup-selectedOption">Ihr Fahrzeug. Die passende Anfrage.</div><div className={"bb-custom-select-option"} role="option">Werkstatt &amp; Zusammenarbeit</div><div className={"bb-custom-select-option"} role="option">Gutschein &amp; Bedingungen</div><div className={"bb-custom-select-option"} role="option">Zusammenarbeit mit der FACTORY</div><div className={"bb-custom-select-option"} role="option">NeX AIFly Suite · Ihr eigener Bereich</div></div></div></label>
              <button type="button" aria-pressed="false">Begleitung starten</button>
            </div>
          </div>
        </details>
      </section>
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-fitment">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-fitment">Passende Themen</h2>
          </div>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
        </header>
        <ol>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Am sichersten finden Sie Ihr Teil über eine Nummer: Herstellernummer, EAN oder Artikelnummer. Sie können auch nach Bezeichnung oder Marke suchen.</p>
            <a aria-label="Teil, Marke oder Nummer suchen. – Seite ansehen" className={"hc-text-link"} href="/teileklar/suche">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/produkt">Alles zum Artikel. Vor dem Kauf.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Technische Daten, Lieferumfang, Preis und Lieferung stehen getrennt und klar am Artikel. So sehen Sie, was Sie bekommen.</p>
            <a aria-label="Alles zum Artikel. Vor dem Kauf. – Seite ansehen" className={"hc-text-link"} href="/teileklar/produkt">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Zubehör und Teile mit klaren Angaben: Originalfotos des Lieferanten, Preise inklusive Mehrwertsteuer und Versandkosten, die Sie vor dem Kauf sehen.</p>
            <a aria-label="TEILEKLAR. Für Auto und Motorrad. – Seite ansehen" className={"hc-text-link"} href="/teileklar">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Sie wissen, was Sie brauchen, aber nicht, wie es heißt? Stöbern Sie nach Teileart – von Zubehör bis Pflege.</p>
            <a aria-label="Alle Kategorien auf einen Blick. – Seite ansehen" className={"hc-text-link"} href="/teileklar/kategorien">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
        </ol>
      </section>
      <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-tk-fitment">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Im Detail</span>
          <h2 id="finish-title-tk-fitment">Wie möchten Sie fortfahren?</h2>
        </div>
        <div className={"hc-finish-next"}>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/teileklar/suche">Teile suchen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/produkt">Artikel ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Frage stellen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
    </div>
  </main>
  <footer className={"site-footer structured-footer footer-refined"}>
    <div className={"footer-inner"}>
      <div className={"footer-invitation"}>
        <div>
          <h2>Lassen Sie uns über Ihr Vorhaben sprechen.</h2>
          <p>Erzählen Sie uns, was Sie verändern möchten. Wir klären gemeinsam den passenden nächsten Schritt.</p>
        </div>
        <a className={"nexify-control primary-button "} data-variant="primary" href="/kontakt">Projekt besprechen<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
      </div>
      <div className={"footer-main"}>
        <div className={"footer-brand-block"}>
          <a aria-label="Zur Startseite" className={"brand"} href="/teileklar">
            <span className={"nx-logo"} data-groesse="s">
              <span className={"nx-logo-wort"}>
                <span className={"nx-logo-name"}>TEILE<span className={"nx-logo-x"}>KLAR</span></span>
                <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
              </span>
            </span>
          </a>
          <p>Teile, Fahrzeugfragen und Werkstattkontakte. Beschreiben Sie, was Sie benötigen.</p>
          <a className={"nexify-control  footer-contact"} data-variant="text" href="/kontakt">Anliegen beschreiben <span aria-hidden="true">→</span></a>
        </div>
        <div className={"footer-link-groups "}>
          <nav aria-label={"Produkte & Arbeitsbereiche"}>
            <h2>Produkte &amp; Arbeitsbereiche</h2>
            <a href="/teileklar">TEILEKLAR</a>
            <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
            <a href="#">Passt das Teil? So prüfen Sie es.</a>
            <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
            <a href="/teileklar/partner-werden">Partner werden</a>
            <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
          </nav>
          <nav aria-label={"Leistungen & Zusammenarbeit"}>
            <h2>Leistungen &amp; Zusammenarbeit</h2>
            <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
            <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
            <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
          </nav>
          <nav aria-label="NeXify AI">
            <h2>NeXify AI</h2>
            <a href="/unternehmen">Über NeXify</a>
            <a href="/kontakt">Kontakt</a>
            <a href="/anmelden">Anmelden</a>
            <a href="/registrieren">Registrieren</a>
          </nav>
          <nav aria-label="Rechtliches">
            <h2>Rechtliches</h2>
            <a href="/teileklar/rechtliches">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</a>
            <a href="/ki-hinweise">KI-Hinweise</a>
            <a href="/barrierefreiheit">Barrierefreiheit</a>
            <a href="/cookies">Datenschutzeinstellungen</a>
          </nav>
        </div>
      </div>
      <div className={"footer-bottom"}>
        <span className={"footer-claim"}>TEILEKLAR — Na KLAR! <span aria-hidden="true">·</span> Teile · Fahrzeugzuordnung · Werkstatt · Partnerschaft</span>
        <a className={"footer-crosslink"} href="/">NeXify AI <span aria-hidden="true">→</span></a>
        <details className={"footer-overview"}>
          <summary aria-expanded="false" aria-controls="_r_9_">
            <span>Seitenübersicht</span>
            <span className={"footer-overview-marker"} aria-hidden="true">+</span>
          </summary>
          <div className={"footer-overview-panel"} id="_r_9_">
            <p className={"footer-overview-hint"}>Alle Seiten dieses Bereichs, nach Themen geordnet</p>
            <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
              <div className={"footer-overview-group"}>
                <h3>TEILEKLAR</h3>
                <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
                <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
                <a href="/teileklar/kategorie">Ähnliche Teile sicher unterscheiden.</a>
                <a href="/teileklar/produkt">Alles zum Artikel. Vor dem Kauf.</a>
                <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
                <a href="/teileklar/kasse">Zur Kasse. Schritt für Schritt.</a>
                <a href="#">Passt das Teil? So prüfen Sie es.</a>
                <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
                <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
                <a href="/teileklar/partner-werden">Werkstatt? Werden Sie Partner.</a>
                <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
                <a href="/teileklar/shop">Auto &amp; Motorrad. Klar ausgewählt.</a>
                <a href="/teileklar/reifenrechner">Reifengrößen vergleichen.</a>
                <a href="/teileklar/batterie-berater">Die passende Batterie finden.</a>
              </div>
              <div className={"footer-overview-group"}>
                <h3>Rechtliches</h3>
                <a href="/teileklar/rechtliches">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</a>
              </div>
            </nav>
          </div>
        </details>
      </div>
      <div className={"footer-legal"}>
        <nav className={"footer-legal-direct"} aria-label="Rechtsdokumente">
          <a href="/teileklar/rechtliches">TEILEKLAR: Anbieterinformationen und Datenschutz</a>
        </nav>
        <details className={"footer-legal-details"}>
          <summary aria-expanded="false" aria-controls="_r_8_">Hinweise zu den Rechtsdokumenten</summary>
          <div id="_r_8_">
            <p>Die Rechtsinformationen für TEILEKLAR sind direkt erreichbar. Vollständige Angaben zum Anbieter, Datenschutz und Verbraucherrechten im Shop stehen noch zur Prüfung und Freigabe.</p>
            <p>Eine öffentliche Übersicht der Drittanbieter-Komponenten und ihrer Lizenzen ist noch nicht verfügbar.</p>
          </div>
        </details>
      </div>
    </div>
    <div className={"footer-utilities"}>
      <details className={"diagnostic-consent"}>
        <summary>Fehlerdiagnose-Einstellungen</summary>
        <div className={"diagnostic-consent-content"}>
          <p>Optional: Fehlerdiagnose mit PostHog. Mit Ihrer Zustimmung können technische Fehlerstellen, Fehlertyp und App-Version übermittelt werden. Eingaben und Fehlertexte werden entfernt. Keine Marketing- oder Klickerfassung und keine Sitzungsaufzeichnung.</p>
          <p>Bei einer Übertragung erhält der Dienst Netzwerkdaten wie Ihre IP-Adresse.</p>
          <p>Ihre Auswahl gilt nur bis zum Neuladen und wird nicht gespeichert. Ablehnen schränkt die Seitenfunktionen nicht ein.</p>
          <p className={"diagnostic-consent-status"} role="status" aria-live="polite">Aus · noch keine Auswahl</p>
          <div className={"diagnostic-consent-actions"} role="group" aria-label="Fehlerdiagnose-Einstellungen">
            <button type="button" className={"\x6futline-button"}>Zulassen</button>
            <button type="button" className={"\x6futline-button"}>Ablehnen</button>
          </div>
          <a href="/datenschutz">Datenschutzhinweise</a>
        </div>
      </details>
    </div>
  </footer>
</div>
<button onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveSlide0(index => (index + 1 + 2) % 2); }} aria-expanded="false" aria-controls="aifly-panel" type="button" className={"nexify-control secondary-button reopen-chat"} data-variant="secondary"><span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true"><img alt="" width="34" height="34" decoding="async" src="/site-assets/9176c58a16ff634a.png" /></span>TEILEKLAR Hilfe</button>
<aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" hidden>
  <div className={"chat-resize-handle"} role="separator" aria-orientation="vertical" aria-label="Chatbreite anpassen" tabIndex={0} aria-valuemin={360} aria-valuemax={952} aria-valuenow={360} />
  <div className={"panel-heading"}>
    <div className={"panel-heading-copy"}>
      <div className={"panel-identity"}>
        <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
          <img alt="" width="34" height="34" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
        </span>
        <h2 className={"nx-oracle-name panel-brandline"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></h2>
      </div>
    </div>
    <button aria-label="Beratung einklappen" title="Beratung einklappen" type="button" className={"nexify-control icon-button panel-minimize"} data-variant="icon">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
  <div className={"sdk-orientation-view"}>
    <section className={"public-orientation"} aria-label="Willkommen bei TEILEKLAR" style={{ "--ca-fuss": "0px" } as CSSProperties}>
      <div className={"orientation-content"}>
        <div className={"orientation-intro"}>
          <div className={"orientation-host"}>
            <span className={"orientation-host-figure"} aria-hidden="true">
              <img alt="" width="512" height="512" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
            </span>
            <p className={"nx-oracle-name orientation-host-name"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></p>
          </div>
          <h3>Willkommen bei TEILEKLAR</h3>
          <p className={"orientation-intro-body"}>Willkommen bei TEILEKLAR. Worum geht es bei Ihnen: ein Ersatzteil, ein Werkstattbesuch oder eine Zusammenarbeit? Bei einer Teile- oder Werkstattfrage nennen Sie bitte Ihr Fahrzeug und beschreiben Sie Ihr Anliegen. Eine vorhandene Teilenummer hilft bei der Zuordnung.</p>
        </div>
        <div className={"orientation-history"} role="log" aria-live="polite" aria-relevant="additions text" aria-busy="false" />
        <div className={"orientation-starters"} role="group" aria-label="Ihr Fahrzeug-/Teile-Anliegen">
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">01</span>
            <span className={"orientation-starter-copy"}>
              <strong>Fahrzeug &amp; Teil</strong>
              <small>Mit Fahrzeugdaten und vorhandenem Hinweis zum passenden Teil starten.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">02</span>
            <span className={"orientation-starter-copy"}>
              <strong>Werkstatt-Anfrage</strong>
              <small>Leistung, Fahrzeug und Standort für die Werkstattsuche einordnen.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">03</span>
            <span className={"orientation-starter-copy"}>
              <strong>Zusammenarbeit</strong>
              <small>Werkstattprofil, Zusammenarbeit und gemeinsamen Serviceweg besprechen.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
        <ol className={"orientation-path orientation-path-quiet"} aria-label="Vom Anliegen zur passenden Anlaufstelle.">
          <li data-state="open"><small>01</small>Fahrzeug nennen</li>
          <li data-state="open"><small>02</small>Anliegen eingrenzen</li>
          <li data-state="open"><small>03</small>Nächsten Weg wählen</li>
        </ol>
      </div>
      <form className={"orientation-composer"}>
        <label htmlFor="orientation-message">Ihr Fahrzeug-/Teile-Anliegen</label>
        <textarea id="orientation-message" maxLength={1000} rows={1} placeholder="Ihr Fahrzeug-/Teile-Anliegen" aria-describedby="orientation-keys" required style={{ height: "0px" }} {...({ enterkeyhint: "send" } as any)} />
        <span id="orientation-keys" className={"visually-hidden"}>Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.</span>
        <div className={"orientation-composer-actions"}>
          <button className={"primary-button"} disabled aria-label="Nachricht senden">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      <p className={"connection-note orientation-status"} role="status" />
      <p className={"connection-note"}>Bitte keine Passwörter oder Zahlungsdaten eingeben. <a href="/teileklar/rechtliches">Datenschutz</a></p>
    </section>
  </div>
</aside>
</Fragment>}
{activeSlide0 === 1 && <Fragment key={1}>
<svg className={"glass-lens-filter"} width="0" height="0" aria-hidden="true" {...({ focusable: "false" } as any)}>
  <filter id="as-linse" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "36", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
  <filter id="as-linse-leiste" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse-leiste.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "30", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
  <filter id="as-linse-front" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse-front.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "44", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
</svg>
<div className={"website"}>
  <a className={"skip-link"} href="#page-content">Zum Inhalt</a>
  <header className={"tk-commerce-header"}>
    <div className={"tk-service-strip"}>
      <span>Auto &amp; Motorrad · Alle Preise inkl. MwSt.</span>
      <a href="/teileklar/rechtliches">Versand &amp; Rückgabe</a>
      <a href="/kontakt">Persönlicher Kontakt</a>
    </div>
    <div className={"tk-commerce-main"}>
      <a className={"tk-wordmark"} href="/teileklar">TEILE<span>KLAR</span><small>Passende Auswahl. Klare Angaben.</small></a>
      <form method="get" role="search" className={"tk-header-search"}>
        <label className={"visually-hidden"} htmlFor="store-search">Artikel, Marke oder Artikelnummer suchen</label>
        <input id="store-search" maxLength={120} placeholder="Artikel, Marke oder Artikelnummer" type="search" name="q" />
        <button className={"primary-button"} type="submit">Suchen</button>
      </form>
      <div className={"tk-header-account"}>
        <a href="/anmelden">Mein Konto</a>
        <a className={"tk-header-cart"} href="/teileklar/warenkorb">Warenkorb <span>–</span></a>
      </div>
    </div>
    <nav className={"tk-commerce-nav"} aria-label="Shopnavigation">
      <a href="/teileklar">Schaufenster</a>
      <a href="/teileklar/shop">Alle Artikel</a>
      <a href="/teileklar/kategorien">Kategorien</a>
      <a aria-current="page" href="#">Fahrzeugpassung</a>
      <a href="/teileklar/werkstatt">Werkstätten</a>
      <a href="/teileklar/bestellungen">Meine Bestellungen</a>
    </nav>
  </header>
  <main id="page-content" tabIndex={-1}>
    <div className={"home-concept page-concept page-tk-fitment layout-commerce context-teileklar"}>
      <section className={"identity-hero"} aria-labelledby="page-title-tk-fitment">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
              <ol>
                <li>
                  <a href="/">Startseite</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                </li>
                <li className={"visually-hidden"}>
                  <span aria-current="page">Passt das Teil? So prüfen Sie es.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Teile, Fahrzeug und nächste Schritte</span>
            <h1 id="page-title-tk-fitment">Passt das Teil? So prüfen Sie es.</h1>
            <p className={"identity-body"}>Der Modellname allein reicht nicht. Mit Schlüsselnummern, Baujahr und Motor finden Sie heraus, worauf es bei Ihrem Teil ankommt.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/teileklar/suche">
                <span>Teile suchen</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/produkt">Artikel ansehen</a>
            </div>
          </div>
          <div className={"identity-media"}>
            <figure className={"identity-hero-photo"}>
              <img sizes="(max-width: 820px) 100vw, 60vw" alt="Markeninszenierung: Pascal und ein Gesprächspartner betrachten Pläne und ein technisches Modell auf einem Arbeitstisch" width="2000" height="1125" loading="eager" fetchPriority="high" decoding="async" srcSet="/site-assets/3c2a16020520a9d2.webp 800w, /site-assets/310f26f4c183ff5d.webp 1280w, /site-assets/df162c342bb041e0.webp 1920w" src="/site-assets/df162c342bb041e0.webp" />
            </figure>
          </div>
        </div>
      </section>
      <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
        <a href="#content-tk-fitment-tk-fitment-customer-1-0">Ihr Fahrzeug genau benennen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-fitment-tk-fitment-customer-2-1">Was die Checkliste leistet<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <section className={"hc-container pc-supplement"}>
        <section className={"tk-form"} aria-labelledby="fit-title">
          <h2 id="fit-title">Passung prüfen: Worauf es ankommt</h2>
          <p className={"tk-meta"}>Ein Artikelname belegt keine Passung. Wählen Sie eine Kategorie und sehen Sie, welche Angaben entscheiden. Eine automatische Passungsprüfung gegen einen Fahrzeugkatalog gibt es noch nicht.</p>
          <div className={"tk-actions"} role="group" aria-label="Kategorie wählen">
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Bremsen</button>
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Batterie</button>
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Beleuchtung</button>
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Filter</button>
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Fahrwerk</button>
            <button aria-pressed="false" type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Reifen</button>
          </div>
          <div className={"tk-actions"}>
            <a className={"hc-text-link"} href="/teileklar/suche">Teilesuche öffnen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/werkstatt">Werkstatt in der Nähe suchen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </div>
        </section>
        <section className={"tk-form"} aria-labelledby="tyre-title">
          <h2 id="tyre-title">Reifenrechner</h2>
          <p className={"tk-meta"}>Vergleicht Durchmesser, Abrollumfang und Tachoabweichung zweier Reifengrößen. Das Ergebnis ersetzt keine Prüfung der Fahrzeugpapiere.</p>
          <fieldset className={"tk-form-grid tk-tyre-size"}>
            <legend>Aktuelle Größe: 205/55 R16</legend>
            <label className={"tk-field"} id="bb-customSelect-irkxD-label">Breite<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-irkxD-panel" aria-activedescendant="bb-customSelect-irkxD-selectedOption" aria-labelledby="bb-customSelect-irkxD-label" tabIndex={0}><span>205</span></span><select tabIndex={-1} defaultValue="155"><option value="155">155</option><option value="165">165</option><option value="175">175</option><option value="185">185</option><option value="195">195</option><option value="205">205</option><option value="215">215</option><option value="225">225</option><option value="235">235</option><option value="245">245</option><option value="255">255</option><option value="265">265</option><option value="275">275</option><option value="285">285</option><option value="295">295</option><option value="305">305</option><option value="315">315</option></select><div id="bb-customSelect-irkxD-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">155</div><div className={"bb-custom-select-option"} role="option">165</div><div className={"bb-custom-select-option"} role="option">175</div><div className={"bb-custom-select-option"} role="option">185</div><div className={"bb-custom-select-option"} role="option">195</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-irkxD-selectedOption">205</div><div className={"bb-custom-select-option"} role="option">215</div><div className={"bb-custom-select-option"} role="option">225</div><div className={"bb-custom-select-option"} role="option">235</div><div className={"bb-custom-select-option"} role="option">245</div><div className={"bb-custom-select-option"} role="option">255</div><div className={"bb-custom-select-option"} role="option">265</div><div className={"bb-custom-select-option"} role="option">275</div><div className={"bb-custom-select-option"} role="option">285</div><div className={"bb-custom-select-option"} role="option">295</div><div className={"bb-custom-select-option"} role="option">305</div><div className={"bb-custom-select-option"} role="option">315</div></div></div></label>
            <label className={"tk-field"} id="bb-customSelect-qkcVY-label">Höhe (%)<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-qkcVY-panel" aria-activedescendant="bb-customSelect-qkcVY-selectedOption" aria-labelledby="bb-customSelect-qkcVY-label" tabIndex={0}><span>55</span></span><select tabIndex={-1} defaultValue="30"><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option><option value="50">50</option><option value="55">55</option><option value="60">60</option><option value="65">65</option><option value="70">70</option><option value="75">75</option><option value="80">80</option></select><div id="bb-customSelect-qkcVY-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">30</div><div className={"bb-custom-select-option"} role="option">35</div><div className={"bb-custom-select-option"} role="option">40</div><div className={"bb-custom-select-option"} role="option">45</div><div className={"bb-custom-select-option"} role="option">50</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-qkcVY-selectedOption">55</div><div className={"bb-custom-select-option"} role="option">60</div><div className={"bb-custom-select-option"} role="option">65</div><div className={"bb-custom-select-option"} role="option">70</div><div className={"bb-custom-select-option"} role="option">75</div><div className={"bb-custom-select-option"} role="option">80</div></div></div></label>
            <label className={"tk-field"} id="bb-customSelect-yAAjR-label">Zoll<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-yAAjR-panel" aria-activedescendant="bb-customSelect-yAAjR-selectedOption" aria-labelledby="bb-customSelect-yAAjR-label" tabIndex={0}><span>16</span></span><select tabIndex={-1} defaultValue="13"><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option></select><div id="bb-customSelect-yAAjR-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">13</div><div className={"bb-custom-select-option"} role="option">14</div><div className={"bb-custom-select-option"} role="option">15</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-yAAjR-selectedOption">16</div><div className={"bb-custom-select-option"} role="option">17</div><div className={"bb-custom-select-option"} role="option">18</div><div className={"bb-custom-select-option"} role="option">19</div><div className={"bb-custom-select-option"} role="option">20</div><div className={"bb-custom-select-option"} role="option">21</div><div className={"bb-custom-select-option"} role="option">22</div></div></div></label>
          </fieldset>
          <fieldset className={"tk-form-grid tk-tyre-size"}>
            <legend>Geplante Größe: 225/45 R17</legend>
            <label className={"tk-field"} id="bb-customSelect-EaJWz-label">Breite<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-EaJWz-panel" aria-activedescendant="bb-customSelect-EaJWz-selectedOption" aria-labelledby="bb-customSelect-EaJWz-label" tabIndex={0}><span>225</span></span><select tabIndex={-1} defaultValue="155"><option value="155">155</option><option value="165">165</option><option value="175">175</option><option value="185">185</option><option value="195">195</option><option value="205">205</option><option value="215">215</option><option value="225">225</option><option value="235">235</option><option value="245">245</option><option value="255">255</option><option value="265">265</option><option value="275">275</option><option value="285">285</option><option value="295">295</option><option value="305">305</option><option value="315">315</option></select><div id="bb-customSelect-EaJWz-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">155</div><div className={"bb-custom-select-option"} role="option">165</div><div className={"bb-custom-select-option"} role="option">175</div><div className={"bb-custom-select-option"} role="option">185</div><div className={"bb-custom-select-option"} role="option">195</div><div className={"bb-custom-select-option"} role="option">205</div><div className={"bb-custom-select-option"} role="option">215</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-EaJWz-selectedOption">225</div><div className={"bb-custom-select-option"} role="option">235</div><div className={"bb-custom-select-option"} role="option">245</div><div className={"bb-custom-select-option"} role="option">255</div><div className={"bb-custom-select-option"} role="option">265</div><div className={"bb-custom-select-option"} role="option">275</div><div className={"bb-custom-select-option"} role="option">285</div><div className={"bb-custom-select-option"} role="option">295</div><div className={"bb-custom-select-option"} role="option">305</div><div className={"bb-custom-select-option"} role="option">315</div></div></div></label>
            <label className={"tk-field"} id="bb-customSelect-9PioH-label">Höhe (%)<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-9PioH-panel" aria-activedescendant="bb-customSelect-9PioH-selectedOption" aria-labelledby="bb-customSelect-9PioH-label" tabIndex={0}><span>45</span></span><select tabIndex={-1} defaultValue="30"><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option><option value="50">50</option><option value="55">55</option><option value="60">60</option><option value="65">65</option><option value="70">70</option><option value="75">75</option><option value="80">80</option></select><div id="bb-customSelect-9PioH-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">30</div><div className={"bb-custom-select-option"} role="option">35</div><div className={"bb-custom-select-option"} role="option">40</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-9PioH-selectedOption">45</div><div className={"bb-custom-select-option"} role="option">50</div><div className={"bb-custom-select-option"} role="option">55</div><div className={"bb-custom-select-option"} role="option">60</div><div className={"bb-custom-select-option"} role="option">65</div><div className={"bb-custom-select-option"} role="option">70</div><div className={"bb-custom-select-option"} role="option">75</div><div className={"bb-custom-select-option"} role="option">80</div></div></div></label>
            <label className={"tk-field"} id="bb-customSelect-Aj3TF-label">Zoll<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-Aj3TF-panel" aria-activedescendant="bb-customSelect-Aj3TF-selectedOption" aria-labelledby="bb-customSelect-Aj3TF-label" tabIndex={0}><span>17</span></span><select tabIndex={-1} defaultValue="13"><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option></select><div id="bb-customSelect-Aj3TF-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">13</div><div className={"bb-custom-select-option"} role="option">14</div><div className={"bb-custom-select-option"} role="option">15</div><div className={"bb-custom-select-option"} role="option">16</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-Aj3TF-selectedOption">17</div><div className={"bb-custom-select-option"} role="option">18</div><div className={"bb-custom-select-option"} role="option">19</div><div className={"bb-custom-select-option"} role="option">20</div><div className={"bb-custom-select-option"} role="option">21</div><div className={"bb-custom-select-option"} role="option">22</div></div></div></label>
          </fieldset>
          <dl className={"tk-tyre-results"} aria-live="polite">
            <div>
              <dt>Durchmesser</dt>
              <dd>631,9 mm → 634,3 mm</dd>
            </div>
            <div>
              <dt>Abrollumfang</dt>
              <dd>1.985 mm → 1.993 mm</dd>
            </div>
            <div>
              <dt>Abweichung</dt>
              <dd>+0,38 %</dd>
            </div>
            <div>
              <dt>Bodenfreiheit</dt>
              <dd>+1,2 mm</dd>
            </div>
            <div>
              <dt>Tacho zeigt 100 km/h, tatsächlich</dt>
              <dd>100,4 km/h</dd>
            </div>
          </dl>
          <p className={"tk-tyre-verdict is-ok"} role="status">Abweichung unter 1,5 %: unkritisch</p>
          <h3>Vor der Montage prüfen</h3>
          <ul className={"tk-checklist"}>
            <li>Die Größe muss in der Zulassungsbescheinigung Teil I (Feld 15) oder im CoC stehen. Sonst sind Teilegutachten und Eintragung nötig.</li>
            <li>Der Tragfähigkeitsindex (LI) darf nie unter dem Wert der Fahrzeugpapiere liegen.</li>
            <li>Der Geschwindigkeitsindex muss zur bauartbedingten Höchstgeschwindigkeit passen.</li>
            <li>Die Felgenbreite muss zur Reifenbreite passen.</li>
            <li>Bei geändertem Durchmesser die Freigängigkeit bei vollem Lenkeinschlag und voller Beladung prüfen.</li>
            <li>RDKS-Sensoren müssen nach dem Wechsel neu angelernt werden.</li>
          </ul>
        </section>
      </section>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-fitment-tk-fitment-customer-1-0" tabIndex={-1} aria-labelledby="content-tk-fitment-tk-fitment-customer-1-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-fitment-tk-fitment-customer-1-0-title">Ihr Fahrzeug genau benennen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Halten Sie HSN und TSN aus dem Fahrzeugschein bereit, oder Modell, Motor und Baujahr. Eine Herstellernummer vom alten Teil hilft zusätzlich.</p>
            <div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/teileklar/suche">Teil, Marke oder Nummer suchen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-fitment-tk-fitment-customer-2-1" tabIndex={-1} aria-labelledby="content-tk-fitment-tk-fitment-customer-2-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-fitment-tk-fitment-customer-2-1-title">Was die Checkliste leistet</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Sie zeigt je Teileart, welche Angaben entscheiden und wo der häufigste Irrtum liegt. Eine automatische Prüfung gegen einen Fahrzeugkatalog gibt es noch nicht; im Zweifel fragen Sie eine Werkstatt.</p>
          </div>
        </section>
      </div>
      <section className={"hc-container pc-guide"} aria-label="Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE">
        <details className={"hc-service-detail"}>
          <summary>
            <span>
              <strong className={"hc-service-name"}>Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE</strong>
            </span>
            <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14m-7-7v14" />
            </svg>
          </summary>
          <div className={"hc-service-body"}>
            <p>Die Seitenführung verbindet unsere Leistungen, Produkte und Projektwege. Sie können jeden Bereich auch direkt öffnen.</p>
            <div className={"pc-guide-controls"}>
              <label id="bb-customSelect-OMFup-label">Welchen Bereich möchten Sie erkunden?<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-OMFup-panel" aria-activedescendant="bb-customSelect-OMFup-selectedOption" aria-labelledby="bb-customSelect-OMFup-label" tabIndex={0}><span>Ihr Fahrzeug. Die passende Anfrage.</span></span><select tabIndex={-1} defaultValue="business-website"><option value="business-website">Markenstart</option><option value="business-automation">KI im Betrieb</option><option value="business-growth">Wachstum &amp; Kampagnen</option><option value="business-apps">Digitale Arbeitsräume</option><option value="business-api">Agentische KI &amp; Integrationen</option><option value="knowledge-to-project">Ihr Projektbriefing</option><option value="teileklar-selection">Ihr Fahrzeug. Die passende Anfrage.</option><option value="teileklar-workshop">Werkstatt &amp; Zusammenarbeit</option><option value="teileklar-vouchers">Gutschein &amp; Bedingungen</option><option value="existing-client">Zusammenarbeit mit der FACTORY</option><option value="nex2fly-trial">NeX AIFly Suite · Ihr eigener Bereich</option></select><div id="bb-customSelect-OMFup-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">Markenstart</div><div className={"bb-custom-select-option"} role="option">KI im Betrieb</div><div className={"bb-custom-select-option"} role="option">Wachstum &amp; Kampagnen</div><div className={"bb-custom-select-option"} role="option">Digitale Arbeitsräume</div><div className={"bb-custom-select-option"} role="option">Agentische KI &amp; Integrationen</div><div className={"bb-custom-select-option"} role="option">Ihr Projektbriefing</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-OMFup-selectedOption">Ihr Fahrzeug. Die passende Anfrage.</div><div className={"bb-custom-select-option"} role="option">Werkstatt &amp; Zusammenarbeit</div><div className={"bb-custom-select-option"} role="option">Gutschein &amp; Bedingungen</div><div className={"bb-custom-select-option"} role="option">Zusammenarbeit mit der FACTORY</div><div className={"bb-custom-select-option"} role="option">NeX AIFly Suite · Ihr eigener Bereich</div></div></div></label>
              <button type="button" aria-pressed="false">Begleitung starten</button>
            </div>
          </div>
        </details>
      </section>
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-fitment">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-fitment">Passende Themen</h2>
          </div>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
        </header>
        <ol>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Am sichersten finden Sie Ihr Teil über eine Nummer: Herstellernummer, EAN oder Artikelnummer. Sie können auch nach Bezeichnung oder Marke suchen.</p>
            <a aria-label="Teil, Marke oder Nummer suchen. – Seite ansehen" className={"hc-text-link"} href="/teileklar/suche">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/produkt">Alles zum Artikel. Vor dem Kauf.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Technische Daten, Lieferumfang, Preis und Lieferung stehen getrennt und klar am Artikel. So sehen Sie, was Sie bekommen.</p>
            <a aria-label="Alles zum Artikel. Vor dem Kauf. – Seite ansehen" className={"hc-text-link"} href="/teileklar/produkt">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Zubehör und Teile mit klaren Angaben: Originalfotos des Lieferanten, Preise inklusive Mehrwertsteuer und Versandkosten, die Sie vor dem Kauf sehen.</p>
            <a aria-label="TEILEKLAR. Für Auto und Motorrad. – Seite ansehen" className={"hc-text-link"} href="/teileklar">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Sie wissen, was Sie brauchen, aber nicht, wie es heißt? Stöbern Sie nach Teileart – von Zubehör bis Pflege.</p>
            <a aria-label="Alle Kategorien auf einen Blick. – Seite ansehen" className={"hc-text-link"} href="/teileklar/kategorien">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
        </ol>
      </section>
      <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-tk-fitment">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Im Detail</span>
          <h2 id="finish-title-tk-fitment">Wie möchten Sie fortfahren?</h2>
        </div>
        <div className={"hc-finish-next"}>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/teileklar/suche">Teile suchen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/produkt">Artikel ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Frage stellen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
    </div>
  </main>
  <footer className={"site-footer structured-footer footer-refined"}>
    <div className={"footer-inner"}>
      <div className={"footer-invitation"}>
        <div>
          <h2>Lassen Sie uns über Ihr Vorhaben sprechen.</h2>
          <p>Erzählen Sie uns, was Sie verändern möchten. Wir klären gemeinsam den passenden nächsten Schritt.</p>
        </div>
        <a className={"nexify-control primary-button "} data-variant="primary" href="/kontakt">Projekt besprechen<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
      </div>
      <div className={"footer-main"}>
        <div className={"footer-brand-block"}>
          <a aria-label="Zur Startseite" className={"brand"} href="/teileklar">
            <span className={"nx-logo"} data-groesse="s">
              <span className={"nx-logo-wort"}>
                <span className={"nx-logo-name"}>TEILE<span className={"nx-logo-x"}>KLAR</span></span>
                <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
              </span>
            </span>
          </a>
          <p>Teile, Fahrzeugfragen und Werkstattkontakte. Beschreiben Sie, was Sie benötigen.</p>
          <a className={"nexify-control  footer-contact"} data-variant="text" href="/kontakt">Anliegen beschreiben <span aria-hidden="true">→</span></a>
        </div>
        <div className={"footer-link-groups "}>
          <nav aria-label={"Produkte & Arbeitsbereiche"}>
            <h2>Produkte &amp; Arbeitsbereiche</h2>
            <a href="/teileklar">TEILEKLAR</a>
            <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
            <a href="#">Passt das Teil? So prüfen Sie es.</a>
            <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
            <a href="/teileklar/partner-werden">Partner werden</a>
            <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
          </nav>
          <nav aria-label={"Leistungen & Zusammenarbeit"}>
            <h2>Leistungen &amp; Zusammenarbeit</h2>
            <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
            <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
            <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
          </nav>
          <nav aria-label="NeXify AI">
            <h2>NeXify AI</h2>
            <a href="/unternehmen">Über NeXify</a>
            <a href="/kontakt">Kontakt</a>
            <a href="/anmelden">Anmelden</a>
            <a href="/registrieren">Registrieren</a>
          </nav>
          <nav aria-label="Rechtliches">
            <h2>Rechtliches</h2>
            <a href="/teileklar/rechtliches">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</a>
            <a href="/ki-hinweise">KI-Hinweise</a>
            <a href="/barrierefreiheit">Barrierefreiheit</a>
            <a href="/cookies">Datenschutzeinstellungen</a>
          </nav>
        </div>
      </div>
      <div className={"footer-bottom"}>
        <span className={"footer-claim"}>TEILEKLAR — Na KLAR! <span aria-hidden="true">·</span> Teile · Fahrzeugzuordnung · Werkstatt · Partnerschaft</span>
        <a className={"footer-crosslink"} href="/">NeXify AI <span aria-hidden="true">→</span></a>
        <details className={"footer-overview"}>
          <summary aria-expanded="false" aria-controls="_r_9_">
            <span>Seitenübersicht</span>
            <span className={"footer-overview-marker"} aria-hidden="true">+</span>
          </summary>
          <div className={"footer-overview-panel"} id="_r_9_">
            <p className={"footer-overview-hint"}>Alle Seiten dieses Bereichs, nach Themen geordnet</p>
            <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
              <div className={"footer-overview-group"}>
                <h3>TEILEKLAR</h3>
                <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
                <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
                <a href="/teileklar/kategorie">Ähnliche Teile sicher unterscheiden.</a>
                <a href="/teileklar/produkt">Alles zum Artikel. Vor dem Kauf.</a>
                <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
                <a href="/teileklar/kasse">Zur Kasse. Schritt für Schritt.</a>
                <a href="#">Passt das Teil? So prüfen Sie es.</a>
                <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
                <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
                <a href="/teileklar/partner-werden">Werkstatt? Werden Sie Partner.</a>
                <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
                <a href="/teileklar/shop">Auto &amp; Motorrad. Klar ausgewählt.</a>
                <a href="/teileklar/reifenrechner">Reifengrößen vergleichen.</a>
                <a href="/teileklar/batterie-berater">Die passende Batterie finden.</a>
              </div>
              <div className={"footer-overview-group"}>
                <h3>Rechtliches</h3>
                <a href="/teileklar/rechtliches">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</a>
              </div>
            </nav>
          </div>
        </details>
      </div>
      <div className={"footer-legal"}>
        <nav className={"footer-legal-direct"} aria-label="Rechtsdokumente">
          <a href="/teileklar/rechtliches">TEILEKLAR: Anbieterinformationen und Datenschutz</a>
        </nav>
        <details className={"footer-legal-details"}>
          <summary aria-expanded="false" aria-controls="_r_8_">Hinweise zu den Rechtsdokumenten</summary>
          <div id="_r_8_">
            <p>Die Rechtsinformationen für TEILEKLAR sind direkt erreichbar. Vollständige Angaben zum Anbieter, Datenschutz und Verbraucherrechten im Shop stehen noch zur Prüfung und Freigabe.</p>
            <p>Eine öffentliche Übersicht der Drittanbieter-Komponenten und ihrer Lizenzen ist noch nicht verfügbar.</p>
          </div>
        </details>
      </div>
    </div>
    <div className={"footer-utilities"}>
      <details className={"diagnostic-consent"}>
        <summary>Fehlerdiagnose-Einstellungen</summary>
        <div className={"diagnostic-consent-content"}>
          <p>Optional: Fehlerdiagnose mit PostHog. Mit Ihrer Zustimmung können technische Fehlerstellen, Fehlertyp und App-Version übermittelt werden. Eingaben und Fehlertexte werden entfernt. Keine Marketing- oder Klickerfassung und keine Sitzungsaufzeichnung.</p>
          <p>Bei einer Übertragung erhält der Dienst Netzwerkdaten wie Ihre IP-Adresse.</p>
          <p>Ihre Auswahl gilt nur bis zum Neuladen und wird nicht gespeichert. Ablehnen schränkt die Seitenfunktionen nicht ein.</p>
          <p className={"diagnostic-consent-status"} role="status" aria-live="polite">Aus · noch keine Auswahl</p>
          <div className={"diagnostic-consent-actions"} role="group" aria-label="Fehlerdiagnose-Einstellungen">
            <button type="button" className={"\x6futline-button"}>Zulassen</button>
            <button type="button" className={"\x6futline-button"}>Ablehnen</button>
          </div>
          <a href="/datenschutz">Datenschutzhinweise</a>
        </div>
      </details>
    </div>
  </footer>
</div>
<aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" style={{ "--chat-viewport-height": "864px", "--chat-viewport-top": "0px" } as CSSProperties}>
  <div className={"chat-resize-handle"} role="separator" aria-orientation="vertical" aria-label="Chatbreite anpassen" tabIndex={0} aria-valuemin={360} aria-valuemax={952} aria-valuenow={360} />
  <div className={"panel-heading"}>
    <div className={"panel-heading-copy"}>
      <div className={"panel-identity"}>
        <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
          <img alt="" width="34" height="34" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
        </span>
        <h2 className={"nx-oracle-name panel-brandline"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></h2>
      </div>
    </div>
    <button aria-label="Beratung einklappen" title="Beratung einklappen" type="button" className={"nexify-control icon-button panel-minimize"} data-variant="icon">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
  <div className={"sdk-orientation-view"}>
    <section className={"public-orientation"} aria-label="Willkommen bei TEILEKLAR" style={{ "--ca-fuss": "0px" } as CSSProperties}>
      <div className={"orientation-content"}>
        <div className={"orientation-intro"}>
          <div className={"orientation-host"}>
            <span className={"orientation-host-figure"} aria-hidden="true">
              <img alt="" width="512" height="512" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
            </span>
            <p className={"nx-oracle-name orientation-host-name"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></p>
          </div>
          <h3>Willkommen bei TEILEKLAR</h3>
          <p className={"orientation-intro-body"}>Willkommen bei TEILEKLAR. Worum geht es bei Ihnen: ein Ersatzteil, ein Werkstattbesuch oder eine Zusammenarbeit? Bei einer Teile- oder Werkstattfrage nennen Sie bitte Ihr Fahrzeug und beschreiben Sie Ihr Anliegen. Eine vorhandene Teilenummer hilft bei der Zuordnung.</p>
        </div>
        <div className={"orientation-history"} role="log" aria-live="polite" aria-relevant="additions text" aria-busy="false" />
        <div className={"orientation-starters"} role="group" aria-label="Ihr Fahrzeug-/Teile-Anliegen">
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">01</span>
            <span className={"orientation-starter-copy"}>
              <strong>Fahrzeug &amp; Teil</strong>
              <small>Mit Fahrzeugdaten und vorhandenem Hinweis zum passenden Teil starten.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">02</span>
            <span className={"orientation-starter-copy"}>
              <strong>Werkstatt-Anfrage</strong>
              <small>Leistung, Fahrzeug und Standort für die Werkstattsuche einordnen.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">03</span>
            <span className={"orientation-starter-copy"}>
              <strong>Zusammenarbeit</strong>
              <small>Werkstattprofil, Zusammenarbeit und gemeinsamen Serviceweg besprechen.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
        <ol className={"orientation-path orientation-path-quiet"} aria-label="Vom Anliegen zur passenden Anlaufstelle.">
          <li data-state="open"><small>01</small>Fahrzeug nennen</li>
          <li data-state="open"><small>02</small>Anliegen eingrenzen</li>
          <li data-state="open"><small>03</small>Nächsten Weg wählen</li>
        </ol>
      </div>
      <form className={"orientation-composer"}>
        <label htmlFor="orientation-message">Ihr Fahrzeug-/Teile-Anliegen</label>
        <textarea id="orientation-message" maxLength={1000} rows={1} placeholder="Ihr Fahrzeug-/Teile-Anliegen" aria-describedby="orientation-keys" required style={{ height: "0px" }} {...({ enterkeyhint: "send" } as any)} />
        <span id="orientation-keys" className={"visually-hidden"}>Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.</span>
        <div className={"orientation-composer-actions"}>
          <button className={"primary-button"} disabled aria-label="Nachricht senden">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      <p className={"connection-note orientation-status"} role="status" />
      <p className={"connection-note"}>Bitte keine Passwörter oder Zahlungsdaten eingeben. <a href="/teileklar/rechtliches">Datenschutz</a></p>
    </section>
  </div>
</aside>
</Fragment>}
</>);
  return (
    <>
      <style>{capturedCSS}</style>
      <div hidden />
      <div id="atelier" className={"workspace-shell site-teileklar is-closed"} data-site-import-carousel-root="0">{carouselContent0}</div>

    </>
  );
}
