import { useHeaderMenus } from "@/lib/imported-site";
import { useCurrentPage } from "@/hooks/use-current-page";

/** NeXify site header (brand, main and product navigation, phone menu, language, theme, call to action), shared by every NeXify page. */
export function NexifyHeader() {
  const { openMenu, productsSummary, mobileSummary, toggleMenu, closeMenu } = useHeaderMenus();
  const here = useCurrentPage();
  return (
    <header className={"site-header"}>
      <a aria-label="NeXify AI · Startseite" className={"brand"} href="/" {...here("/")}>
        <span className={"nx-logo"}>
          <span className={"nx-logo-figur"} aria-hidden="true">
            <img
              src="/site-assets/9176c58a16ff634a.png"
              alt=""
              width="512"
              height="512"
              decoding="async"
              draggable="false"
            />
          </span>
          <span className={"nx-logo-wort"}>
            <span className={"nx-logo-name"}>
              Ne<span className={"nx-logo-x"}>X</span>ify AI
            </span>
            <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
          </span>
        </span>
      </a>
      <nav className={"main-navigation"} aria-label="Hauptnavigation">
        <a href="/leistungen" {...here("/leistungen")}>
          Leistungen
        </a>
        <details className={"product-navigation"} open={openMenu === "products"}>
          <summary
            ref={productsSummary}
            aria-expanded={openMenu === "products"}
            aria-controls="_R_14lb_-products"
            onClick={toggleMenu("products")}
          >
            Produkte
            <span className={"navigation-chevron"} aria-hidden="true">
              ⌄
            </span>
          </summary>
          <div className={"product-navigation-menu"} id="_R_14lb_-products">
            <div className={"megamenu-heading"}>
              <p>Marke, Systeme und Wachstum – verbunden durch die FACTORY.</p>
              <a href="/leistungen" {...here("/leistungen")}>
                Leistungen der FACTORY
                <svg
                  className={"nx-zeichen"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
            <div className={"megamenu-columns"}>
              <div className={"megamenu-group"}>
                <h2>NeXify AI</h2>
                <a href="/produkte/nex2fly" {...here("/produkte/nex2fly")}>
                  <span>NeX AIFly Suite</span>
                  <svg
                    className={"nx-zeichen"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/produkte/one" {...here("/produkte/one")}>
                  <span>NeX Agentic AI</span>
                  <svg
                    className={"nx-zeichen"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/produkte/api" {...here("/produkte/api")}>
                  <span>API &amp; Integrationen</span>
                  <svg
                    className={"nx-zeichen"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
              <div className={"megamenu-group"}>
                <h2>TEILEKLAR</h2>
                <a href="/teileklar" {...here("/teileklar")}>
                  <span>TEILEKLAR entdecken</span>
                  <svg
                    className={"nx-zeichen"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/teileklar/werkstatt" {...here("/teileklar/werkstatt")}>
                  <span>Werkstattprofile</span>
                  <svg
                    className={"nx-zeichen"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/teileklar/partner-werden" {...here("/teileklar/partner-werden")}>
                  <span>Werkstattpartner werden</span>
                  <svg
                    className={"nx-zeichen"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
              <div className={"megamenu-group"}>
                <h2>Projekt &amp; Wachstum</h2>
                <a href="/loesungen" {...here("/loesungen")}>
                  <span>Kampagne und Zielseite aus einem Guss.</span>
                  <svg
                    className={"nx-zeichen"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/preise-ablauf" {...here("/preise-ablauf")}>
                  <span>Preise &amp; Ablauf</span>
                  <svg
                    className={"nx-zeichen"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/leistungsumfang" {...here("/leistungsumfang")}>
                  <span>Projektstart</span>
                  <svg
                    className={"nx-zeichen"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/wissen/projekt-vorbereiten" {...here("/wissen/projekt-vorbereiten")}>
                  <span>Projekt vorbereiten</span>
                  <svg
                    className={"nx-zeichen"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
            <div className={"megamenu-bottom"}>
              <span>Ihr Projekt verdient einen klaren Rahmen.</span>
              <a href="/leistungsumfang" {...here("/leistungsumfang")}>
                Projektumfang festlegen
                <svg
                  className={"nx-zeichen"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </details>
        <a href="/wissen" {...here("/wissen")}>
          Arbeitsweise
        </a>
        <a href="/kontakt" {...here("/kontakt")}>
          Kontakt
        </a>
      </nav>
      <details className={"mobile-navigation"} open={openMenu === "mobile"}>
        <summary
          ref={mobileSummary}
          aria-label="Menü"
          aria-expanded={openMenu === "mobile"}
          aria-controls="_R_14lb_-mobile"
          onClick={toggleMenu("mobile")}
        >
          <span className={"mobile-menu-mark"} aria-hidden="true">
            <i />
            <i />
          </span>
        </summary>
        <nav
          className={"mobile-navigation-panel"}
          id="_R_14lb_-mobile"
          aria-label="Hauptnavigation"
        >
          <div className={"mobile-primary-links"}>
            <a href="/leistungen" {...here("/leistungen")}>
              Leistungen
            </a>
            <a href="/wissen" {...here("/wissen")}>
              Arbeitsweise
            </a>
            <a href="/kontakt" {...here("/kontakt")}>
              Kontakt
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>NeXify AI</h2>
            <a href="/produkte/nex2fly" {...here("/produkte/nex2fly")}>
              <span>NeX AIFly Suite</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/produkte/one" {...here("/produkte/one")}>
              <span>NeX Agentic AI</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/produkte/api" {...here("/produkte/api")}>
              <span>API &amp; Integrationen</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>TEILEKLAR</h2>
            <a href="/teileklar" {...here("/teileklar")}>
              <span>TEILEKLAR entdecken</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/teileklar/werkstatt" {...here("/teileklar/werkstatt")}>
              <span>Werkstattprofile</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/teileklar/partner-werden" {...here("/teileklar/partner-werden")}>
              <span>Werkstattpartner werden</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>Projekt &amp; Wachstum</h2>
            <a href="/loesungen" {...here("/loesungen")}>
              <span>Kampagne und Zielseite aus einem Guss.</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/preise-ablauf" {...here("/preise-ablauf")}>
              <span>Preise &amp; Ablauf</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/leistungsumfang" {...here("/leistungsumfang")}>
              <span>Projektstart</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/wissen/projekt-vorbereiten" {...here("/wissen/projekt-vorbereiten")}>
              <span>Projekt vorbereiten</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>Ihr Konto</h2>
            <a href="/anmelden" {...here("/anmelden")}>
              <span>Anmelden und weiterarbeiten.</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/registrieren" {...here("/registrieren")}>
              <span>NeX AIFly Suite. In Ruhe testen.</span>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <button
            type="button"
            className={"nexify-control  "}
            data-variant="quiet"
            onClick={closeMenu}
          >
            Menü schließen
          </button>
        </nav>
      </details>
      <div className={"header-actions"}>
        {/* 2026-11-20 01:30: Sprachumschalter entfernt — es gibt keine Uebersetzungen; der Regler tat nachweislich nichts. */}
        {/* 2026-11-20 01:30: Theme-Switch entfernt — die Seite hat nur ein Dark-Token-Set, der Regler hatte keine Wirkung. */}
        <a className={"header-cta"} href="/kontakt" {...here("/kontakt")}>
          <span aria-hidden="true" />
          Projektgespräch anfragen
        </a>
      </div>
    </header>
  );
}
