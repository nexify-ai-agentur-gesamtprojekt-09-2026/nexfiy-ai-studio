import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useSyncExternalStore } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/captured.css?raw";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Ein Gespräch. Ein Projekt, das passt. · NeXify AI" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "data-theme": "dark", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  const isMobile = useSyncExternalStore(subscribeMobile, () => matchMedia("(max-width: 767px)").matches, () => false);
  const [chatPreference, setChatPreference] = useState<boolean | null>(null);
  const chatOpen = chatPreference ?? !isMobile;
  const [scrolled, setScrolled] = useState(false);
  const [heroActionVisible, setHeroActionVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const reopenRef = useRef<HTMLButtonElement>(null);
  const focusAfterToggle = useRef<"composer" | "launcher" | null>(null);
  const openChat = () => {
    focusAfterToggle.current = "composer";
    setChatPreference(true);
  };
  const closeChat = () => {
    focusAfterToggle.current = "launcher";
    setChatPreference(false);
  };
  useEffect(() => {
    const target = focusAfterToggle.current;
    focusAfterToggle.current = null;
    if (target === "composer") document.getElementById("orientation-message")?.focus();
    if (target === "launcher") reopenRef.current?.focus();
  }, [chatOpen]);
  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector(".site-header details[open]")) closeChat();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chatOpen]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setViewportHeight(window.innerHeight);
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const observers: IntersectionObserver[] = [];
    const heroAction = document.querySelector(".identity-primary-link");
    if (heroAction) {
      const observer = new IntersectionObserver(([entry]) => setHeroActionVisible(entry.isIntersecting));
      observer.observe(heroAction);
      observers.push(observer);
    }
    const footer = document.querySelector("#atelier footer");
    if (footer) {
      const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
      observer.observe(footer);
      observers.push(observer);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);
  useImportedLayout();
  useAtelierFilms();
  return (
    <>
      <style>{capturedCSS}</style>
      <div hidden />
      <div className={chatOpen ? "workspace-shell site-nexify is-open" : "workspace-shell site-nexify is-closed"} id="atelier" data-hero-action-visible={heroActionVisible ? "true" : undefined} data-scrolled={scrolled ? "true" : "false"} data-chat-compact={isMobile ? undefined : "false"} data-footer-visible={footerVisible ? "true" : "false"}>
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
          <ImportedHeaderNeXifyAI />
          <main id="page-content" tabIndex={-1}>
            <div className={"home-concept"} data-fx="on">
              <ImportedSectionEinGesprChEin onOpenChat={openChat} />
              <section className={"hc-intro hc-container is-in"} aria-labelledby="hc-intro-title">
                <div>
                  <span className={"hc-kicker"}>Hier fängt die Arbeit an</span>
                  <h2 id="hc-intro-title">Wo hakt es gerade?</h2>
                </div>
                <p>Eine Website, die Ihr Angebot nicht erklärt. Ein Vorgang, der jeden Tag Zeit kostet. Eine Idee ohne nächsten Schritt. Zeigen Sie uns die Stelle, an der es hakt.</p>
              </section>
              <ImportedNavWoHaktEsGerade />
              <ImportedSectionWasKNnenWir />
              <section id="zusammenarbeit" className={"hc-section hc-process hc-container"} aria-labelledby="hc-process-title">
                <header className={"hc-section-heading is-in"} data-site-import-scroll-header={"{\"desktop\":{\"added\":[\"is-in\"],\"removed\":[],\"threshold\":2592}}"}>
                  <div>
                    <span className={"hc-kicker"}>Zusammenarbeit</span>
                    <h2 id="hc-process-title">Mit Pascal am Tisch.</h2>
                  </div>
                  <p>Pascal begleitet Ihr Projekt vom ersten Gespräch bis zur Übergabe. Sie sehen früh, welche Richtung entsteht, was enthalten ist und welche Entscheidung als Nächstes gebraucht wird.</p>
                </header>
                <figure className={"hc-plate hc-plate-process"}>
                  <img src="/site-assets/5c592a5dc791fcc3.webp" srcSet="/site-assets/b4c1010258293e22.webp 800w, /site-assets/55ecd78d79c41c10.webp 1280w, /site-assets/5c592a5dc791fcc3.webp 1920w" sizes="(max-width: 820px) 100vw, 80vw" width="2000" height="1125" alt="Markeninszenierung: Pascal bespricht gedruckte Entwürfe und Materialmuster mit einem Gesprächspartner am Tisch" loading="lazy" decoding="async" />
                </figure>
                <ol>
                  <li className={"is-in"}>
                    <h3>Wir verstehen, was Sie erreichen möchten.</h3>
                    <p>Wir sprechen über Ihr Angebot, Ihre Kunden, die bisherige Lösung und den Maßstab, an dem das Ergebnis bestehen muss.</p>
                  </li>
                  <li className={"is-in"}>
                    <h3>Sie erhalten einen klaren Leistungsrahmen.</h3>
                    <p>Leistungen, Mitwirkung, Termine, sinnvolle Optionen und Kosten werden verständlich voneinander getrennt.</p>
                  </li>
                  <li className={"is-in"}>
                    <h3>Konzept, Text und Design entstehen gemeinsam.</h3>
                    <p>Sie sehen an vereinbarten Punkten ein schlüssiges Gesamtbild und entscheiden, wie es weitergeht.</p>
                  </li>
                  <li className={"is-in"}>
                    <h3>Wir prüfen, übergeben und bleiben erreichbar.</h3>
                    <p>Das vereinbarte Ergebnis wird geprüft und nachvollziehbar übergeben. Pflege und Weiterentwicklung können Sie passend ergänzen.</p>
                  </li>
                </ol>
              </section>
              <ImportedSectionEigeneWerkzeugeFR />
              <section id="budget" className={"hc-section hc-budget hc-container"} aria-labelledby="hc-budget-title">
                <div className={"hc-budget-story"}>
                  <header className={"hc-section-heading is-in"} data-site-import-scroll-header={"{\"desktop\":{\"added\":[\"is-in\"],\"removed\":[],\"threshold\":5184}}"}>
                    <span className={"hc-kicker"}>Kosten und Umfang</span>
                    <h2 id="hc-budget-title">Sie wissen vor dem Start, was enthalten ist.</h2>
                    <p>Vor dem Start erhalten Sie ein Angebot mit klar abgegrenztem Umfang. Sie entscheiden, was jetzt entsteht und was später folgt.</p>
                    <div className={"hc-rate is-in"} aria-label="Individuell nach vereinbartem Umfang" data-site-import-scroll-header={"{\"desktop\":{\"added\":[\"is-in\"],\"removed\":[],\"threshold\":5832}}"}>
                      <span>Klare Kalkulationsbasis</span>
                      <strong>Individuell</strong>
                      <small>nach vereinbartem Umfang</small>
                      <p>Konzept, Text, Design und technische Umsetzung werden nach dem vereinbarten Umfang geplant. Externe Kosten weisen wir separat aus.</p>
                    </div>
                    <a className={"hc-text-link"} href="/preise-ablauf">Mehr zu Kosten und Ablauf<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                  </header>
                  <div className={"hc-costs is-in"}>
                    <div>
                      <h3>Entwicklung</h3>
                      <p>Konzept, Text, Design und technische Umsetzung werden im Angebot einem konkreten Ergebnis zugeordnet.</p>
                    </div>
                    <div>
                      <h3>Betreuung danach</h3>
                      <p>Pflege, Weiterentwicklung und persönliche Unterstützung werden als eigener, nachvollziehbarer Baustein vereinbart.</p>
                    </div>
                    <div>
                      <h3>Externe Kosten</h3>
                      <p>Hosting, Software, KI-Nutzung, Medien- und Werbebudget werden offen ausgewiesen statt im Projektpreis versteckt.</p>
                    </div>
                  </div>
                </div>
              </section>
              <section className={"hc-section hc-finish hc-container"} aria-labelledby="hc-finish-title">
                <div className={"hc-finish-heading is-in"}>
                  <span className={"hc-kicker"}>Kommen Sie rein.</span>
                  <h2 id="hc-finish-title">Woran arbeiten Sie gerade?</h2>
                </div>
                <div className={"hc-finish-next is-in"}>
                  <p>Website, Shop oder ein Ablauf, der jeden Tag Zeit kostet: Ein paar Sätze genügen für den Anfang. Sie entscheiden, ob daraus eine persönliche Anfrage wird.</p>
                  <div className={"hc-finish-actions"}>
                    <button aria-controls="aifly-panel" aria-expanded={chatOpen} type="button" className={"nexify-control primary-button hc-finish-primary"} data-variant="primary" onClick={openChat}>Vorhaben schildern<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
                  </div>
                  <small />
                </div>
              </section>
            </div>
          </main>
          <ImportedFooterLassenSieUnsBer />
        </div>
        {!chatOpen && (
          <button ref={reopenRef} aria-expanded="false" aria-controls="aifly-panel" type="button" className={"nexify-control secondary-button reopen-chat"} data-variant="secondary" onClick={openChat}>
            <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
              <img alt="" width="34" height="34" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
            </span>
            Ihr Projekt mit NeXify
          </button>
        )}
        <ImportedAsideAIFlyORACLE open={chatOpen} isMobile={isMobile} viewportHeight={viewportHeight} onClose={closeChat} />
      </div>
    </>
  );
}

function ImportedHeaderNeXifyAI() {
  const [openMenu, setOpenMenu] = useState<"products" | "mobile" | null>(null);
  const productsSummary = useRef<HTMLElement>(null);
  const mobileSummary = useRef<HTMLElement>(null);
  const closeMenu = () => {
    const summary = openMenu === "mobile" ? mobileSummary.current : productsSummary.current;
    setOpenMenu(null);
    summary?.focus();
  };
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      const summary = openMenu === "mobile" ? mobileSummary.current : productsSummary.current;
      setOpenMenu(null);
      summary?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);
  const toggleMenu = (menu: "products" | "mobile") => (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenMenu((current) => (current === menu ? null : menu));
  };
  return (
    <header className={"site-header"}>
      <a aria-label="NeXify AI · Startseite" className={"brand"} href="/">
        <span className={"nx-logo"}>
          <span className={"nx-logo-figur"} aria-hidden="true">
            <img src="/site-assets/9176c58a16ff634a.png" alt="" width="512" height="512" decoding="async" draggable="false" />
          </span>
          <span className={"nx-logo-wort"}>
            <span className={"nx-logo-name"}>Ne<span className={"nx-logo-x"}>X</span>ify AI</span>
            <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
          </span>
        </span>
      </a>
      <nav className={"main-navigation"} aria-label="Hauptnavigation">
        <a href="/leistungen">Leistungen</a>
        <details className={"product-navigation"} open={openMenu === "products"}>
          <summary ref={productsSummary} aria-expanded={openMenu === "products"} aria-controls="_R_14lb_-products" onClick={toggleMenu("products")}>Produkte<span className={"navigation-chevron"} aria-hidden="true">⌄</span></summary>
          <div className={"product-navigation-menu"} id="_R_14lb_-products">
            <div className={"megamenu-heading"}>
              <p>Marke, Systeme und Wachstum – verbunden durch die FACTORY.</p>
              <a href="/leistungen">Leistungen der FACTORY<svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
            </div>
            <div className={"megamenu-columns"}>
              <div className={"megamenu-group"}>
                <h2>NeXify AI</h2>
                <a href="/produkte/nex2fly">
                  <span>NeX AIFly Suite</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/produkte/one">
                  <span>NeX Agentic AI</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/produkte/api">
                  <span>API &amp; Integrationen</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
              <div className={"megamenu-group"}>
                <h2>TEILEKLAR</h2>
                <a href="/teileklar">
                  <span>TEILEKLAR entdecken</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/teileklar/werkstatt">
                  <span>Werkstattprofile</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/teileklar/partner-werden">
                  <span>Werkstattpartner werden</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
              <div className={"megamenu-group"}>
                <h2>Projekt &amp; Wachstum</h2>
                <a href="/loesungen">
                  <span>Kampagne und Zielseite aus einem Guss.</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/preise-ablauf">
                  <span>Preise &amp; Ablauf</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/leistungsumfang">
                  <span>Projektstart</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/wissen/projekt-vorbereiten">
                  <span>Projekt vorbereiten</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
            <div className={"megamenu-bottom"}>
              <span>Ihr Projekt verdient einen klaren Rahmen.</span>
              <a href="/leistungsumfang">Projektumfang festlegen<svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
            </div>
          </div>
        </details>
        <a href="/wissen">Arbeitsweise</a>
        <a href="/kontakt">Kontakt</a>
      </nav>
      <details className={"mobile-navigation"} open={openMenu === "mobile"}>
        <summary ref={mobileSummary} aria-label="Menü" aria-expanded={openMenu === "mobile"} aria-controls="_R_14lb_-mobile" onClick={toggleMenu("mobile")}>
          <span className={"mobile-menu-mark"} aria-hidden="true">
            <i />
            <i />
          </span>
        </summary>
        <nav className={"mobile-navigation-panel"} id="_R_14lb_-mobile" aria-label="Hauptnavigation">
          <div className={"mobile-primary-links"}>
            <a href="/leistungen">Leistungen</a>
            <a href="/wissen">Arbeitsweise</a>
            <a href="/kontakt">Kontakt</a>
          </div>
          <div className={"megamenu-group"}>
            <h2>NeXify AI</h2>
            <a href="/produkte/nex2fly">
              <span>NeX AIFly Suite</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/produkte/one">
              <span>NeX Agentic AI</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/produkte/api">
              <span>API &amp; Integrationen</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>TEILEKLAR</h2>
            <a href="/teileklar">
              <span>TEILEKLAR entdecken</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/teileklar/werkstatt">
              <span>Werkstattprofile</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/teileklar/partner-werden">
              <span>Werkstattpartner werden</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>Projekt &amp; Wachstum</h2>
            <a href="/loesungen">
              <span>Kampagne und Zielseite aus einem Guss.</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/preise-ablauf">
              <span>Preise &amp; Ablauf</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/leistungsumfang">
              <span>Projektstart</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/wissen/projekt-vorbereiten">
              <span>Projekt vorbereiten</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>Ihr Konto</h2>
            <a href="/anmelden">
              <span>Anmelden und weiterarbeiten.</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/registrieren">
              <span>NeX AIFly Suite. In Ruhe testen.</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <button type="button" className={"nexify-control  "} data-variant="quiet" onClick={closeMenu}>Menü schließen</button>
        </nav>
      </details>
      <div className={"header-actions"}>
        <label className={"visually-hidden"} htmlFor="locale">Sprache</label>
        <select id="locale" aria-describedby="locale-hint" defaultValue="de">
          <option value="de">DE</option>
          <option value="nl">NL</option>
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
        <span id="locale-hint" className={"visually-hidden"}>Auswahl mit der Eingabetaste bestätigen.</span>
        <button type="button" className={"theme-switch"} role="switch" aria-checked="false" aria-label="Helle Ansicht" title="Helle Ansicht">
          <svg className={"theme-sun"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
          </svg>
          <svg className={"theme-moon"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          </svg>
        </button>
        <a className={"header-cta"} href="/kontakt"><span aria-hidden="true" />Projektgespräch anfragen</a>
      </div>
    </header>
  );
}

function ImportedSectionEinGesprChEin({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section className={"identity-hero"} aria-labelledby="home-headline">
      <div className={"identity-scene"}>
        <div className={"identity-copy"}>
          <h1 id="home-headline">
            <span>Ein Gespräch.{" "}</span>
            <span>Ein Projekt,{" "}</span>
            <span className={"identity-title-accent"}>das passt.</span>
          </h1>
          <p className={"identity-subtitle"}>Websites, Apps, Shops und KI – aus dem, was Ihr Unternehmen wirklich braucht.</p>
          <p className={"identity-body"}>Pascal begleitet Ihr Projekt persönlich, vom ersten Gespräch bis zur Übergabe. Und Sie wissen vor dem Start, was enthalten ist.</p>
          <div className={"identity-links"}>
            <button aria-controls="aifly-panel" type="button" className={"nexify-control primary-button identity-primary-link"} data-variant="primary" onClick={onOpenChat}>
              <span>Vorhaben schildern</span>
              <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
            </button>
          </div>
        </div>
        <div className={"identity-media"}>
          <figure className={"identity-hero-photo"}>
            <div className={"atelier-film atelier-film-hero"}>
              <div className={"atelier-film-picture"}>
                <img className={"atelier-film-fallback"} alt="Markeninszenierung: Pascal, NeX und AIFly ORACLE im Eingangsbereich eines Gebäudes" aria-hidden="false" width="1280" height="720" src="/site-assets/05c51cdebbdd2aa6.webp" />
                <video src="/site-assets/e27f88efd05374ec.mp4" poster="/site-assets/05c51cdebbdd2aa6.webp" width="1280" height="720" preload="auto" playsInline muted aria-label="Pascal im Studio">
                  <track kind="captions" label="Deutsch" {...({ srclang: "de" } as any)} />
                </video>
                <div className={"atelier-film-controls"}>
                  <button type="button" aria-label="Erneut abspielen">
                    <svg className={"atelier-playback-icon"} viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M6 3.8a.7.7 0 0 1 1.05-.6l9.2 6.2a.7.7 0 0 1 0 1.2l-9.2 6.2A.7.7 0 0 1 6 16.2Z" />
                    </svg>
                    <span>Abspielen</span>
                  </button>
                  <button type="button" aria-label="Film mit Ton starten">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M4 9h4l5-4v14l-5-4H4Z" />
                      <path d="m17 9 5 6m0-6-5 6" />
                    </svg>
                    <span>Ton an</span>
                  </button>
                  <button type="button" aria-label="Untertitel" aria-pressed="false">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <rect x="2" y="5" width="20" height="14" rx="3" />
                      <path d="M10 9a3 3 0 1 0 0 6m9-6a3 3 0 1 0 0 6" />
                    </svg>
                    <span>Untertitel</span>
                  </button>
                  <details className={"atelier-volume"}>
                    <summary aria-label="Lautstärke">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...({ focusable: "false" } as any)}>
                        <path d="M3 12h8m6 0h4" strokeLinecap="round" />
                        <circle cx="14" cy="12" r="3" />
                      </svg>
                      <span className={"visually-hidden"}>Lautstärke</span>
                    </summary>
                    <div>
                      <label htmlFor="_R_4ainmlb_-volume">Lautstärke<input id="_R_4ainmlb_-volume" type="range" min="0" max="1" step="0.05" defaultValue="0.8" /></label>
                    </div>
                  </details>
                </div>
                <div className={"atelier-film-progress"} aria-hidden="true">
                  <span style={{ transform: "scaleX(0.602545)" }} data-site-import-responsive="601" />
                </div>
              </div>
              <details className={"atelier-film-transcript"}>
                <summary>Gesprochener Text</summary>
                <p lang="de">Guten Tag, ich bin Pascal. Wir bauen Websites, Shops und KI-Lösungen in höchster Qualität und zu einem fairen Preis. Erzählen Sie mir, woran Sie gerade arbeiten.</p>
              </details>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

function ImportedNavWoHaktEsGerade() {
  return (
    <nav className={"hc-gallery hc-container"} aria-label="Wo hakt es gerade?">
      <article className={"hc-gallery-card is-in"}>
        <div className={"identity-media hc-art hc-art-0"}>
          <figure className={"identity-hero-photo"}>
            <div className={"atelier-film atelier-film-hero"}>
              <div className={"atelier-film-picture"}>
                <img className={"atelier-film-fallback"} src="/site-assets/5c592a5dc791fcc3.webp" alt="Markeninszenierung: Pascal bespricht gedruckte Entwürfe und Materialmuster mit einem Gesprächspartner am Tisch" aria-hidden="false" width="1280" height="720" />
                <video src="/site-assets/e3638738b1263f00.mp4" poster="/site-assets/5c592a5dc791fcc3.webp" width="1280" height="720" preload="auto" playsInline muted aria-label="Ihr Angebot, auf den Punkt." />
                <div className={"atelier-film-controls"}>
                  <button type="button" aria-label="Film abspielen">
                    <svg className={"atelier-playback-icon"} viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M6 3.8a.7.7 0 0 1 1.05-.6l9.2 6.2a.7.7 0 0 1 0 1.2l-9.2 6.2A.7.7 0 0 1 6 16.2Z" />
                    </svg>
                    <span>Abspielen</span>
                  </button>
                  <button type="button" aria-label="Film mit Ton starten">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M4 9h4l5-4v14l-5-4H4Z" />
                      <path d="m17 9 5 6m0-6-5 6" />
                    </svg>
                    <span>Ton an</span>
                  </button>
                  <details className={"atelier-volume"}>
                    <summary aria-label="Lautstärke">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...({ focusable: "false" } as any)}>
                        <path d="M3 12h8m6 0h4" strokeLinecap="round" />
                        <circle cx="14" cy="12" r="3" />
                      </svg>
                      <span className={"visually-hidden"}>Lautstärke</span>
                    </summary>
                    <div>
                      <label htmlFor="_R_aiinmlb_-volume">Lautstärke<input id="_R_aiinmlb_-volume" type="range" min="0" max="1" step="0.05" defaultValue="0.8" /></label>
                    </div>
                  </details>
                </div>
                <div className={"atelier-film-progress"} aria-hidden="true">
                  <span style={{ transform: "scaleX(0)" }} />
                </div>
              </div>
            </div>
          </figure>
        </div>
        <a className={"hc-gallery-link"} href="/leistungen/websites">
          <span className={"hc-scene-context"}>Marke &amp; Dienstleistung</span>
          <h3>Ihr Angebot, auf den Punkt.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></h3>
          <p>Wir ordnen Leistungen, Sprache und Design so, dass eine Website Ihr Unternehmen verständlich zeigt und den Weg zur Anfrage öffnet.</p>
          <small className={"hc-scene-value"}>Ziel: passende Gespräche mit den richtigen Kunden.</small>
          <span className={"hc-text-link"}>Websites &amp; Markenauftritt<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
        </a>
      </article>
      <article className={"hc-gallery-card is-in"}>
        <div className={"identity-media hc-art hc-art-1"}>
          <figure className={"identity-hero-photo"}>
            <div className={"atelier-film atelier-film-hero"}>
              <div className={"atelier-film-picture"}>
                <img className={"atelier-film-fallback"} src="/site-assets/15fa9607b63661b1.webp" alt="Markeninszenierung: Pascal bespricht Unterlagen mit einem Mitarbeiter an einer Fertigungsanlage; NeX und AIFly ORACLE sind dabei" aria-hidden="false" width="1280" height="720" />
                <video src="/site-assets/8b4870140b46d3f8.mp4" poster="/site-assets/15fa9607b63661b1.webp" width="1280" height="720" preload="auto" playsInline muted aria-label="Mehr Zeit für die Arbeit, die zählt." />
                <div className={"atelier-film-controls"}>
                  <button type="button" aria-label="Film abspielen">
                    <svg className={"atelier-playback-icon"} viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M6 3.8a.7.7 0 0 1 1.05-.6l9.2 6.2a.7.7 0 0 1 0 1.2l-9.2 6.2A.7.7 0 0 1 6 16.2Z" />
                    </svg>
                    <span>Abspielen</span>
                  </button>
                  <button type="button" aria-label="Film mit Ton starten">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M4 9h4l5-4v14l-5-4H4Z" />
                      <path d="m17 9 5 6m0-6-5 6" />
                    </svg>
                    <span>Ton an</span>
                  </button>
                  <details className={"atelier-volume"}>
                    <summary aria-label="Lautstärke">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...({ focusable: "false" } as any)}>
                        <path d="M3 12h8m6 0h4" strokeLinecap="round" />
                        <circle cx="14" cy="12" r="3" />
                      </svg>
                      <span className={"visually-hidden"}>Lautstärke</span>
                    </summary>
                    <div>
                      <label htmlFor="_R_ciinmlb_-volume">Lautstärke<input id="_R_ciinmlb_-volume" type="range" min="0" max="1" step="0.05" defaultValue="0.8" /></label>
                    </div>
                  </details>
                </div>
                <div className={"atelier-film-progress"} aria-hidden="true">
                  <span style={{ transform: "scaleX(0)" }} />
                </div>
              </div>
            </div>
          </figure>
        </div>
        <a className={"hc-gallery-link"} href="/leistungen/agenten-automatisierung">
          <span className={"hc-scene-context"}>Fertigung &amp; Handwerk</span>
          <h3>Mehr Zeit für die Arbeit, die zählt.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></h3>
          <p>Wir betrachten einen wiederkehrenden Vorgang vor Ort und prüfen, wo Daten, Freigaben und KI Ihrem Team konkret Arbeit abnehmen können.</p>
          <small className={"hc-scene-value"}>Ziel: weniger Doppelarbeit und ein verlässlicherer Ablauf.</small>
          <span className={"hc-text-link"}>KI im Arbeitsablauf<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
        </a>
      </article>
      <article className={"hc-gallery-card is-in"} data-site-import-scroll-header={"{\"desktop\":{\"added\":[\"is-in\"],\"removed\":[],\"threshold\":1296}}"}>
        <div className={"identity-media hc-art hc-art-2"}>
          <figure className={"identity-hero-photo"}>
            <div className={"atelier-film atelier-film-hero"}>
              <div className={"atelier-film-picture"}>
                <img className={"atelier-film-fallback"} src="/site-assets/506495187c091a6f.webp" alt="Markeninszenierung: Pascal und eine Mitarbeiterin im Gespräch an einer Förderanlage mit Kartons; begleitet von NeX und AIFly ORACLE" aria-hidden="false" width="1280" height="720" />
                <video src="/site-assets/086cadaa7ccbfdc9.mp4" poster="/site-assets/506495187c091a6f.webp" width="1280" height="720" preload="auto" playsInline muted aria-label="Das richtige Teil. Der richtige Weg." />
                <div className={"atelier-film-controls"}>
                  <button type="button" aria-label="Film abspielen">
                    <svg className={"atelier-playback-icon"} viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M6 3.8a.7.7 0 0 1 1.05-.6l9.2 6.2a.7.7 0 0 1 0 1.2l-9.2 6.2A.7.7 0 0 1 6 16.2Z" />
                    </svg>
                    <span>Abspielen</span>
                  </button>
                  <button type="button" aria-label="Film mit Ton starten">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M4 9h4l5-4v14l-5-4H4Z" />
                      <path d="m17 9 5 6m0-6-5 6" />
                    </svg>
                    <span>Ton an</span>
                  </button>
                  <details className={"atelier-volume"}>
                    <summary aria-label="Lautstärke">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...({ focusable: "false" } as any)}>
                        <path d="M3 12h8m6 0h4" strokeLinecap="round" />
                        <circle cx="14" cy="12" r="3" />
                      </svg>
                      <span className={"visually-hidden"}>Lautstärke</span>
                    </summary>
                    <div>
                      <label htmlFor="_R_eiinmlb_-volume">Lautstärke<input id="_R_eiinmlb_-volume" type="range" min="0" max="1" step="0.05" defaultValue="0.8" /></label>
                    </div>
                  </details>
                </div>
                <div className={"atelier-film-progress"} aria-hidden="true">
                  <span style={{ transform: "scaleX(0)" }} />
                </div>
              </div>
            </div>
          </figure>
        </div>
        <a className={"hc-gallery-link"} href="/teileklar">
          <span className={"hc-scene-context"}>Automotive &amp; Logistik</span>
          <h3>Das richtige Teil. Der richtige Weg.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></h3>
          <p>TEILEKLAR zeigt als eigene Produktwelt, wie Fahrzeug, Teil, Passung und Werkstatt in einem verständlichen Anfrageweg zusammenkommen.</p>
          <small className={"hc-scene-value"}>Ziel: mehr Klarheit vor der nächsten Teile- oder Werkstattfrage.</small>
          <span className={"hc-text-link"}>TEILEKLAR entdecken<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
        </a>
      </article>
    </nav>
  );
}

function ImportedSectionWasKNnenWir() {
  return (
    <section id="leistungen" className={"hc-section hc-container hc-service-story"} aria-labelledby="hc-services-title">
      <div className={"hc-service-layout"}>
        <header className={"hc-section-heading is-in"} data-site-import-scroll-header={"{\"desktop\":{\"added\":[\"is-in\"],\"removed\":[],\"threshold\":1296}}"}>
          <span className={"hc-kicker"}>Was wir für Sie tun</span>
          <h2 id="hc-services-title">Was können wir für Sie bauen?</h2>
          <p>Marken und Websites, vernetzte Abläufe oder Kampagnen: Wir beginnen bei einer konkreten Aufgabe in Ihrem Unternehmen.</p>
          <a className={"hc-text-link"} href="/kontakt">Ihr Vorhaben mit uns besprechen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          <figure className={"hc-plate hc-plate-services"}>
            <img src="/site-assets/5b8e74b98d950c05.webp" srcSet="/site-assets/05d4134e5686af4f.webp 800w, /site-assets/55d521535e5fc86c.webp 1280w, /site-assets/5b8e74b98d950c05.webp 1920w" sizes="(max-width: 820px) 100vw, 40vw" width="2000" height="1125" alt="Markeninszenierung: Pascal mit Layouttafeln, Modellen, NeX und AIFly ORACLE im Atelier" loading="lazy" decoding="async" />
          </figure>
        </header>
        <div className={"hc-service-list"}>
          <details className={"hc-service-detail is-in"} open>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Marke, Text &amp; Website</strong>
                <span className={"hc-service-lead"}>Ein Auftritt, der nach Ihrem Unternehmen aussieht – und sich auch so anfühlt.</span>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <ul>
                <li>Positionierung, Seitenstruktur und klare Texte für Ihr Angebot</li>
                <li>Individuelle Art Direction und Webdesign, eigens für Ihr Unternehmen entworfen</li>
                <li>Responsive Umsetzung, klarer Anfrageweg und persönliche Übergabe</li>
              </ul>
              <p className={"hc-caption"}>Für Neugründung oder Relaunch. Umfang, Sprachen und Funktionen werden vor dem Start fest vereinbart.</p>
              <a className={"hc-text-link"} href="/leistungen/websites">Leistung und Umfang ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </details>
          <details className={"hc-service-detail is-in"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Systeme &amp; Automatisierung</strong>
                <span className={"hc-service-lead"}>Weniger Routine, mehr Überblick – ohne Ihre Arbeitsweise in ein fremdes System zu pressen.</span>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <ul>
                <li>Einen konkreten, wiederkehrenden Ablauf vollständig verstehen</li>
                <li>Vorhandene Systeme, Daten und Freigaben gezielt verbinden</li>
                <li>Fehlerfälle prüfen, Verantwortlichkeiten klären und Bedienung dokumentieren</li>
              </ul>
              <p className={"hc-caption"}>Wir beginnen bewusst mit einem Ablauf. Erst wenn er zuverlässig funktioniert, planen wir den nächsten.</p>
              <a className={"hc-text-link"} href="/leistungen/agenten-automatisierung">Leistung und Umfang ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </details>
          <details className={"hc-service-detail is-in"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Sichtbarkeit &amp; Kampagne</strong>
                <span className={"hc-service-lead"}>Gefunden werden, verstanden werden und den richtigen Anlass für eine Anfrage schaffen.</span>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <ul>
                <li>Angebot, Zielgruppe und Suchintention präzise herausarbeiten</li>
                <li>Landingpage, Inhalte und Werbemittel aus einem visuellen Konzept entwickeln</li>
                <li>SEO, GEO, lokale Signale und Auswertung aufeinander abstimmen</li>
              </ul>
              <p className={"hc-caption"}>Werbebudget, Plattformkosten und laufende Betreuung bleiben transparent getrennt.</p>
              <a className={"hc-text-link"} href="/loesungen">Leistung und Umfang ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionEigeneWerkzeugeFR() {
  return (
    <section id="produktwelt" className={"hc-section hc-container hc-product-story"} aria-labelledby="hc-products-title">
      <header className={"hc-section-heading is-in"} data-site-import-scroll-header={"{\"desktop\":{\"added\":[\"is-in\"],\"removed\":[],\"threshold\":3888}}"}>
        <div>
          <span className={"hc-kicker"}>Produkte von NeXify</span>
          <h2 id="hc-products-title">Eigene Werkzeuge für konkrete Arbeit.</h2>
        </div>
        <p>Die NeX AIFly Suite, die Agenten NeX und AIFly ORACLE, die NeXify API und TEILEKLAR haben je eine eigene Aufgabe. Wir sagen Ihnen offen, was zu Ihrem Vorhaben passt.</p>
      </header>
      <div className={"hc-products"}>
        <a className={"hc-product is-in"} href="/produkte/nex2fly">
          <figure className={"hc-product-art"}>
            <img src="/site-assets/4b45951db0b51136.webp" srcSet="/site-assets/5764558ff1c73ead.webp 800w, /site-assets/fba47bfd29e56755.webp 1280w, /site-assets/4b45951db0b51136.webp 1920w" sizes="(max-width: 900px) 100vw, 50vw" width="2000" height="1125" alt="Markeninszenierung: Pascal und eine Gesprächspartnerin schauen gemeinsam auf ein Tablet; NeX und AIFly ORACLE begleiten sie" loading="lazy" decoding="async" />
          </figure>
          <div>
            <h3>NeX AIFly Suite</h3>
            <p>Ihr eigener Arbeitsbereich für Gespräche, Aufgaben, Dokumente und Projektwissen.</p>
            <span className={"hc-text-link"}>Suite kennenlernen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className={"hc-product is-in"} href="/produkte/one">
          <figure className={"hc-product-art"}>
            <img src="/site-assets/a28276c0cb67aeef.webp" srcSet="/site-assets/4651eb82c8a87835.webp 800w, /site-assets/62994bb0701a3e15.webp 1280w, /site-assets/a28276c0cb67aeef.webp 1920w" sizes="(max-width: 900px) 100vw, 50vw" width="2000" height="1125" alt="Markeninszenierung: Pascal im Gespräch mit einer Person in Hygienekleidung an einer Produktionsanlage" loading="lazy" decoding="async" />
          </figure>
          <div>
            <h3>NeX Agentic AI</h3>
            <p>Der Agent für klar umrissene Aufgaben – mit den Werkzeugen, die Sie zulassen.</p>
            <span className={"hc-text-link"}>Agenten kennenlernen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className={"hc-product is-in"} href="/produkte/api">
          <figure className={"hc-product-art"}>
            <img src="/site-assets/df162c342bb041e0.webp" srcSet="/site-assets/3c2a16020520a9d2.webp 800w, /site-assets/310f26f4c183ff5d.webp 1280w, /site-assets/df162c342bb041e0.webp 1920w" sizes="(max-width: 900px) 100vw, 50vw" width="2000" height="1125" alt="Markeninszenierung: Pascal und ein Gesprächspartner betrachten Pläne und ein technisches Modell auf einem Arbeitstisch" loading="lazy" decoding="async" />
          </figure>
          <div>
            <h3>NeXify API</h3>
            <p>KI-Funktionen von NeXify in Ihrer eigenen Anwendung, genutzt über ein Guthaben.</p>
            <span className={"hc-text-link"}>API ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
          </div>
        </a>
        <a className={"hc-product is-in"} href="/teileklar">
          <figure className={"hc-product-art"}>
            <img src="/site-assets/506495187c091a6f.webp" srcSet="/site-assets/3be13e6036057b5f.webp 800w, /site-assets/5467e1d560fa9ec8.webp 1280w, /site-assets/506495187c091a6f.webp 1920w" sizes="(max-width: 900px) 100vw, 50vw" width="2000" height="1125" alt="Markeninszenierung: Pascal und eine Mitarbeiterin im Gespräch an einer Förderanlage mit Kartons; begleitet von NeX und AIFly ORACLE" loading="lazy" decoding="async" />
          </figure>
          <div>
            <h3>TEILEKLAR</h3>
            <p>Unsere eigene Marke: Zubehör und Teile für Auto und Motorrad, mit klaren Angaben.</p>
            <span className={"hc-text-link"}>Zu TEILEKLAR<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
          </div>
        </a>
      </div>
    </section>
  );
}

function ImportedFooterLassenSieUnsBer() {
  return (
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
            <a aria-label="Zur Startseite" className={"brand"} href="/">
              <span className={"nx-logo"} data-groesse="s">
                <span className={"nx-logo-figur"} aria-hidden="true">
                  <img src="/site-assets/9176c58a16ff634a.png" alt="" width="512" height="512" decoding="async" draggable="false" />
                </span>
                <span className={"nx-logo-wort"}>
                  <span className={"nx-logo-name"}>Ne<span className={"nx-logo-x"}>X</span>ify AI</span>
                  <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
                </span>
              </span>
            </a>
            <p>Websites, digitale Abläufe und Kampagnen für Ihr Unternehmen. Persönlich begleitet von Pascal Courbois.</p>
            <a className={"nexify-control  footer-contact"} data-variant="text" href="/kontakt">Ihr Projekt mit NeXify besprechen{" "}<span aria-hidden="true">→</span></a>
          </div>
          <div className={"footer-link-groups "}>
            <nav aria-label={"Produkte & Arbeitsbereiche"}>
              <h2>Produkte &amp; Arbeitsbereiche</h2>
              <a href="/produkte/nex2fly">NeX AIFly Suite</a>
              <a href="/produkte/one">NeX Agentic AI</a>
              <a href="/produkte/api">NeXify API</a>
              <a href="/teileklar">TEILEKLAR</a>
              <a href="/teileklar/partner-werden">Partner werden</a>
            </nav>
            <nav aria-label={"Leistungen & Zusammenarbeit"}>
              <h2>Leistungen &amp; Zusammenarbeit</h2>
              <a href="/leistungen/websites">Websites &amp; Markenauftritt</a>
              <a href="/leistungen/agenten-automatisierung">Automatisierung &amp; KI</a>
              <a href="/leistungen/apps-portale">Apps &amp; Portale</a>
              <a href="/loesungen">Landingpages &amp; Kampagnen</a>
              <a href="/preise-ablauf">Preise &amp; Zusammenarbeit</a>
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
              <a href="/impressum">Impressum</a>
              <a href="/datenschutz">Datenschutz</a>
              <a href="/vertragsgrundlagen">Vertragsgrundlagen</a>
              <a href="/ki-hinweise">KI-Hinweise</a>
              <a href="/barrierefreiheit">Barrierefreiheit</a>
              <a href="/cookies">Datenschutzeinstellungen</a>
            </nav>
          </div>
        </div>
        <div className={"footer-bottom"}>
          <span className={"footer-claim"}>NeXify AI{" "}<span aria-hidden="true">·</span>{" "}Chat it. Automate it.</span>
          <a className={"footer-crosslink"} href="/teileklar">TEILEKLAR{" "}<span aria-hidden="true">→</span></a>
          <details className={"footer-overview"}>
            <summary aria-expanded="false" aria-controls="_R_8lbH1_">
              <span>Seitenübersicht</span>
              <span className={"footer-overview-marker"} aria-hidden="true">+</span>
            </summary>
            <div className={"footer-overview-panel"} id="_R_8lbH1_">
              <p className={"footer-overview-hint"}>Alle Seiten dieses Bereichs, nach Themen geordnet</p>
              <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
                <div className={"footer-overview-group"}>
                  <h3>Leistungen</h3>
                  <a href="/leistungen">Website, System, Kampagne. Aus einer Hand.</a>
                  <a href="/leistungen/websites">Eine Website, die Ihr Angebot erklärt.</a>
                  <a href="/leistungen/agenten-automatisierung">Routine abgeben. Kontrolle behalten.</a>
                  <a href="/leistungen/apps-portale">Portale und Apps für Ihren Ablauf.</a>
                  <a href="/leistungsumfang">Drei Pakete. Ein klarer Umfang.</a>
                </div>
                <div className={"footer-overview-group"}>
                  <h3>Produkte</h3>
                  <a href="/loesungen">Kampagne und Zielseite aus einem Guss.</a>
                  <a href="/preise-ablauf">Sie kennen die Kosten vor dem Start.</a>
                  <a href="/produkte/nex2fly">NeX AIFly Suite. Ihr KI-Arbeitsbereich.</a>
                  <a href="/produkte/one">Zwei Agenten. Eine klare Aufgabe.</a>
                  <a href="/produkte/api">NeXify API. KI in Ihrer Anwendung.</a>
                  <a href="/produkte/aifly-oracle">AIFly ORACLE. Erst ordnen, dann handeln.</a>
                  <a href="/produkte/nex-agentic-aifly">NeX Agentic AIFly. Der Agent, der ausführt.</a>
                  <a href="/produkte/skills-mcp">Skills und MCP. Ihre Werkzeuge, angebunden.</a>
                </div>
                <div className={"footer-overview-group"}>
                  <h3>Wissen und Unternehmen</h3>
                  <a href="/">Ein Gespräch. Ein Projekt, das passt.</a>
                  <a href="/wissen">So arbeiten wir.</a>
                  <a href="/wissen/projekt-vorbereiten">Ihr Briefing in fünf Fragen.</a>
                  <a href="/unternehmen">Ein Ansprechpartner. Ein Agententeam.</a>
                  <a href="/kontakt">Schildern Sie Ihr Vorhaben.</a>
                </div>
                <div className={"footer-overview-group"}>
                  <h3>Konto</h3>
                  <a href="/anmelden">Anmelden und weiterarbeiten.</a>
                  <a href="/registrieren">NeX AIFly Suite. In Ruhe testen.</a>
                </div>
                <div className={"footer-overview-group"}>
                  <h3>Rechtliches</h3>
                  <a href="/impressum">Impressum · NeXify AI by NeXify</a>
                  <a href="/datenschutz">Ihre Daten. Ein klarer Zweck.</a>
                  <a href="/vertragsgrundlagen">Gute Zusammenarbeit hat klare Grundlagen.</a>
                  <a href="/ki-hinweise">KI mit klarer Verantwortung.</a>
                  <a href="/barrierefreiheit">Qualität soll zugänglich sein.</a>
                  <a href="/cookies">Sie wählen, was zusätzlich aktiv wird.</a>
                </div>
                <div className={"footer-overview-group"}>
                  <h3>Weitere Seiten</h3>
                  <a href="/portale">Portale. Ihr Zugang, Ihr Bereich.</a>
                </div>
              </nav>
            </div>
          </details>
        </div>
        <div className={"footer-legal"}>
          <nav className={"footer-legal-direct"} aria-label="Rechtsdokumente">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </nav>
          <p className={"footer-ai-note"}>
            <a href="/ki-hinweise">Markeninszenierung · KI-generiert</a>
          </p>
          <details className={"footer-legal-details"}>
            <summary aria-expanded="false" aria-controls="_R_8lb_">Hinweise zu den Rechtsdokumenten</summary>
            <div id="_R_8lb_">
              <p>Die Seiten zu Anbieterinformationen und Datenschutz sind direkt erreichbar. Vollständige Pflichtangaben und Rechtstexte stehen noch zur Prüfung und Freigabe.</p>
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
  );
}

function ImportedAsideAIFlyORACLE({ open, isMobile, viewportHeight, onClose }: { open: boolean; isMobile: boolean; viewportHeight: number | null; onClose: () => void }) {
  return (
    <aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" role={isMobile ? "dialog" : undefined} hidden={!open} style={isMobile || viewportHeight === null ? undefined : ({ "--chat-viewport-height": viewportHeight + "px", "--chat-viewport-top": "0px" } as CSSProperties)}>
      <div className={"chat-resize-handle"} role="separator" aria-orientation="vertical" aria-label="Chatbreite anpassen" tabIndex={0} aria-valuemin={360} aria-valuemax={952} aria-valuenow={360} />
      <div className={"panel-heading"}>
        <div className={"panel-heading-copy"}>
          <div className={"panel-identity"}>
            <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
              <img src="/site-assets/9176c58a16ff634a.png" alt="" width="34" height="34" decoding="async" />
            </span>
            <h2 className={"nx-oracle-name panel-brandline"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></h2>
          </div>
        </div>
        <button aria-label="Beratung einklappen" title="Beratung einklappen" type="button" className={"nexify-control icon-button panel-minimize"} data-variant="icon" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className={"sdk-orientation-view"}>
        <section className={"public-orientation"} aria-label="Was planen Sie?" style={{ "--ca-fuss": "128px" } as CSSProperties} data-site-import-responsive="406">
          <div className={"orientation-content"}>
            <div className={"orientation-intro"}>
              <div className={"orientation-host"}>
                <span className={"orientation-host-figure"} aria-hidden="true">
                  <img src="/site-assets/9176c58a16ff634a.png" alt="" width="512" height="512" decoding="async" />
                </span>
                <p className={"nx-oracle-name orientation-host-name"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></p>
              </div>
              <h3>Was planen Sie?</h3>
              <p className={"orientation-intro-body"}>Erzählen Sie mir von Ihrem Unternehmen und Ihrem Vorhaben. Ich helfe Ihnen, passende Leistungen zu finden und Ihr Gespräch mit Pascal vorzubereiten.</p>
            </div>
            <div className={"orientation-history"} role="log" aria-live="polite" aria-relevant="additions text" aria-busy="false" />
            <div className={"orientation-starters"} role="group" aria-label="Wobei können wir Ihnen helfen?">
              <button type="button" className={"orientation-starter"} aria-pressed="false">
                <span className={"orientation-starter-index"} aria-hidden="true">01</span>
                <span className={"orientation-starter-copy"}>
                  <strong>Marke &amp; Web</strong>
                  <small>Auftritt, Website oder Shop gestalten.</small>
                </span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
              <button type="button" className={"orientation-starter"} aria-pressed="false">
                <span className={"orientation-starter-index"} aria-hidden="true">02</span>
                <span className={"orientation-starter-copy"}>
                  <strong>Systeme &amp; KI</strong>
                  <small>Abläufe verbinden und Arbeit erleichtern.</small>
                </span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
              <button type="button" className={"orientation-starter"} aria-pressed="false">
                <span className={"orientation-starter-index"} aria-hidden="true">03</span>
                <span className={"orientation-starter-copy"}>
                  <strong>Ads &amp; Marketing</strong>
                  <small>Menschen erreichen und Nachfrage gewinnen.</small>
                </span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
            <ol className={"orientation-path orientation-path-quiet"} aria-label="Aus einer Idee wird ein klarer nächster Schritt.">
              <li data-state="open"><small>01</small>Vorhaben einordnen</li>
              <li data-state="open"><small>02</small>Passenden Weg finden</li>
              <li data-state="open"><small>03</small>Persönlich vertiefen</li>
            </ol>
          </div>
          <form className={"orientation-composer"}>
            <label htmlFor="orientation-message">Wobei können wir Ihnen helfen?</label>
            <textarea id="orientation-message" maxLength={1000} rows={1} placeholder="Wobei können wir Ihnen helfen?" aria-describedby="orientation-keys" required style={{ height: "48px" }} {...({ enterkeyhint: "send" } as any)} />
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
          <p className={"connection-note"}>Bitte keine Passwörter oder Zahlungsdaten eingeben. <a href="/datenschutz">Datenschutz</a></p>
        </section>
      </div>
    </aside>
  );
}


function useImportedLayout() {
  useEffect(() => {
    const scrollingAreas = Array.from(document.querySelectorAll<HTMLElement>("[data-site-import-scroll-root]"));
    const scrollTop = () =>
      scrollingAreas.find(
        (node) =>
          node.clientHeight > 0 &&
          node.scrollHeight > node.clientHeight &&
          /^(auto|scroll)$/.test(getComputedStyle(node).overflowY),
      )?.scrollTop ?? window.scrollY;
    const scrollHeaders = Array.from(document.querySelectorAll<HTMLElement>("[data-site-import-scroll-header]"))
      .slice(0, 128)
      .flatMap((node) => {
        try {
          const states = JSON.parse(node.dataset["siteImportScrollHeader"] || "{}");
          if (!states || typeof states !== "object") return [];
          for (const key of ["desktop", "mobile"]) {
            const state = states[key];
            if (
              !state ||
              !Array.isArray(state.added) ||
              !Array.isArray(state.removed) ||
              state.added.length + state.removed.length > 32
            )
              delete states[key];
          }
          return [
            {
              node,
              states,
              original: new Set(node.classList),
              originalFill: node.getAttribute("fill"),
              transform: node.style.getPropertyValue("transform"),
              priority: node.style.getPropertyPriority("transform"),
            },
          ];
        } catch {
          return [];
        }
      });
    function syncScrollHeaders(reset = false) {
      for (const { node, states, original, originalFill, transform, priority } of scrollHeaders) {
        if (!reset && node.getAttribute("data-import-menu-open") === "true") continue;
        const state = states[innerWidth < 768 ? "mobile" : "desktop"];
        if ([states.desktop, states.mobile].some((entry) => entry && Object.hasOwn(entry, "fill"))) {
          if (originalFill === null) node.removeAttribute("fill");
          else node.setAttribute("fill", originalFill);
        }
        if (states.desktop?.transform || states.mobile?.transform) {
          if (transform) node.style.setProperty("transform", transform, priority);
          else node.style.removeProperty("transform");
        }
        for (const value of [states.desktop, states.mobile].filter(Boolean) as {
          added: string[];
          removed: string[];
        }[]) {
          for (const token of [...(value.added || []), ...(value.removed || [])]) {
            if (typeof token !== "string" || !token || /\s/.test(token)) continue;
            node.classList.toggle(token, original.has(token));
          }
        }
        if (reset || !state || !Number.isFinite(state.threshold) || scrollTop() < state.threshold) continue;
        let until = state.until;
        if (
          typeof state.untilAnchor === "string" &&
          /^\d$/.test(state.untilAnchor) &&
          Number.isFinite(state.untilProgress) &&
          Math.abs(state.untilProgress) <= 2
        ) {
          const anchor = document.querySelector<HTMLElement>(
            '[data-site-import-header-end="' + state.untilAnchor + '"]',
          );
          if (anchor) until = anchor.getBoundingClientRect().top + scrollTop() + innerHeight * state.untilProgress;
        }
        if (Number.isFinite(until) && scrollTop() >= until) continue;
        if (state.fill === null) node.removeAttribute("fill");
        else if (typeof state.fill === "string" && state.fill.length <= 256 && !/url\(/i.test(state.fill))
          node.setAttribute("fill", state.fill);
        if (
          typeof state.transform === "string" &&
          state.transform.length <= 128 &&
          CSS.supports("transform", state.transform)
        )
          node.style.setProperty("transform", state.transform, "important");
        for (const token of state.added || [])
          if (typeof token === "string" && token && !/\s/.test(token)) node.classList.add(token);
        for (const token of state.removed || [])
          if (typeof token === "string" && token && !/\s/.test(token)) node.classList.remove(token);
      }
    }
    const handleScroll = () => {
      syncScrollHeaders();
    };
    function resizeSummaries() {
      syncScrollHeaders();
    }
    const loopingVideos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video[loop]:not([autoplay]):not([controls])"),
    )
      .filter((video) => video.muted && !video.closest("[data-site-import-carousel-store]"))
      .slice(0, 32);
    const videoObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      }
    });
    loopingVideos.forEach((video) => videoObserver.observe(video));
    document.addEventListener("load", handleScroll, true);
    resizeSummaries();
    const parallaxFrame = requestAnimationFrame(handleScroll);
    window.addEventListener("resize", resizeSummaries);
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    return () => {
      videoObserver.disconnect();
      loopingVideos.forEach((video) => video.pause());
      cancelAnimationFrame(parallaxFrame);
      syncScrollHeaders(true);
      document.removeEventListener("load", handleScroll, true);
      window.removeEventListener("resize", resizeSummaries);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);
}

const PLAY_ICON = "M6 3.8a.7.7 0 0 1 1.05-.6l9.2 6.2a.7.7 0 0 1 0 1.2l-9.2 6.2A.7.7 0 0 1 6 16.2Z";
const PAUSE_ICON = "M5.5 3.5h3v13h-3Zm6 0h3v13h-3Z";

function useAtelierFilms() {
  useEffect(() => {
    const films = Array.from(document.querySelectorAll<HTMLElement>(".atelier-film")).slice(0, 16);
    const videos: HTMLVideoElement[] = [];
    const cleanups: (() => void)[] = [];
    const autoPaused = new WeakSet<HTMLVideoElement>();
    const listen = (target: EventTarget, type: string, handler: EventListener) => {
      target.addEventListener(type, handler);
      cleanups.push(() => target.removeEventListener(type, handler));
    };
    for (const film of films) {
      const video = film.querySelector("video");
      if (!video) continue;
      videos.push(video);
      const buttons = Array.from(film.querySelectorAll<HTMLButtonElement>(".atelier-film-controls > button"));
      const playButton = buttons[0];
      const soundButton = buttons.find((button) => /Ton/.test(button.getAttribute("aria-label") || ""));
      const captionsButton = buttons.find((button) => button.getAttribute("aria-label") === "Untertitel");
      const fallback = film.querySelector<HTMLImageElement>(".atelier-film-fallback");
      const bar = film.querySelector<HTMLElement>(".atelier-film-progress span");
      const volume = film.querySelector<HTMLInputElement>('.atelier-volume input[type="range"]');
      const sync = () => {
        if (playButton) {
          playButton.setAttribute("aria-label", video.ended ? "Erneut abspielen" : video.paused ? "Film abspielen" : "Film pausieren");
          const label = playButton.querySelector("span");
          if (label) label.textContent = video.paused ? "Abspielen" : "Pausieren";
          playButton.querySelector("path")?.setAttribute("d", video.paused ? PLAY_ICON : PAUSE_ICON);
        }
        if (soundButton) {
          soundButton.setAttribute("aria-label", video.muted ? "Film mit Ton starten" : "Ton ausschalten");
          const label = soundButton.querySelector("span");
          if (label) label.textContent = video.muted ? "Ton an" : "Ton aus";
        }
        if (fallback && !video.paused) fallback.hidden = true;
        if (bar && video.duration > 0) bar.style.transform = `scaleX(${Math.min(1, video.currentTime / video.duration)})`;
      };
      for (const type of ["play", "pause", "ended", "timeupdate", "volumechange", "loadedmetadata"]) listen(video, type, sync);
      listen(video, "play", () => {
        for (const other of videos) if (other !== video && !other.paused) other.pause();
      });
      if (playButton)
        listen(playButton, "click", () => {
          autoPaused.delete(video);
          if (video.paused) void video.play().catch(() => {});
          else video.pause();
        });
      if (soundButton)
        listen(soundButton, "click", () => {
          if (video.muted) {
            video.currentTime = 0;
            video.muted = false;
            void video.play().catch(() => {});
          } else video.muted = true;
        });
      if (captionsButton)
        listen(captionsButton, "click", () => {
          const pressed = captionsButton.getAttribute("aria-pressed") !== "true";
          captionsButton.setAttribute("aria-pressed", String(pressed));
          const track = video.textTracks[0];
          if (track) track.mode = pressed ? "showing" : "hidden";
        });
      if (volume) {
        listen(volume, "input", () => {
          video.volume = Number(volume.value);
        });
        video.volume = Number(volume.value);
      }
      sync();
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (!entry.isIntersecting && !video.paused) {
          autoPaused.add(video);
          video.pause();
        } else if (entry.isIntersecting && autoPaused.has(video)) {
          autoPaused.delete(video);
          void video.play().catch(() => {});
        }
      }
    });
    videos.forEach((video) => observer.observe(video));
    const heroVideo = document.querySelector<HTMLVideoElement>(".identity-hero video");
    if (heroVideo && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heroVideo.muted = true;
      void heroVideo.play().catch(() => {});
    }
    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      videos.forEach((video) => video.pause());
    };
  }, []);
}

function subscribeMobile(onChange: () => void) {
  const query = matchMedia("(max-width: 767px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
