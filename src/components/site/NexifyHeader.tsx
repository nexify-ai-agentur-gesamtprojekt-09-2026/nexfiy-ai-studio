import { useHeaderMenus } from "@/lib/imported-site";
import { useCurrentPage } from "@/hooks/use-current-page";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { useSiteTheme } from "@/lib/use-site-theme";

/** NeXify site header (brand, main and product navigation, phone menu, language, theme, call to action), shared by every NeXify page. */
export function NexifyHeader() {
  const { openMenu, productsSummary, mobileSummary, toggleMenu, closeMenu } = useHeaderMenus();
  const here = useCurrentPage();
  const id = useId();
  const { light, toggleTheme } = useSiteTheme();
  return (
    <header className={"site-header"}>
      <a aria-label="NeXify AI · Startseite" className={"brand"} href="/" {...here("/")}>
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
        <a href="/leistungen" {...here("/leistungen")}>Leistungen</a>
        <details className={"product-navigation"} open={openMenu === "products"}>
          <summary ref={productsSummary} aria-expanded={openMenu === "products"} aria-controls={`${id}-products`} onClick={toggleMenu("products")}>Produkte<span className={"navigation-chevron"} aria-hidden="true">⌄</span></summary>
          <div className={"product-navigation-menu"} id={`${id}-products`}>
            <div className={"megamenu-heading"}>
              <p>Marke, Systeme und Wachstum – verbunden durch die FACTORY.</p>
              <a href="/leistungen" {...here("/leistungen")}>Leistungen der FACTORY<svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
            </div>
            <div className={"megamenu-columns"}>
              <div className={"megamenu-group"}>
                <h2>NeXify AI</h2>
                <a href="/produkte/nex2fly" {...here("/produkte/nex2fly")}>
                  <span>NeX AIFly Suite</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/produkte/one" {...here("/produkte/one")}>
                  <span>NeX Agentic AI</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/produkte/api" {...here("/produkte/api")}>
                  <span>API &amp; Integrationen</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
              <div className={"megamenu-group"}>
                <h2>TEILEKLAR</h2>
                <a href="/teileklar" {...here("/teileklar")}>
                  <span>TEILEKLAR entdecken</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/teileklar/werkstatt" {...here("/teileklar/werkstatt")}>
                  <span>Werkstattprofile</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/teileklar/partner-werden" {...here("/teileklar/partner-werden")}>
                  <span>Werkstattpartner werden</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
              <div className={"megamenu-group"}>
                <h2>Projekt &amp; Wachstum</h2>
                <a href="/loesungen" {...here("/loesungen")}>
                  <span>Kampagne und Zielseite aus einem Guss.</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/preise-ablauf" {...here("/preise-ablauf")}>
                  <span>Preise &amp; Ablauf</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/leistungsumfang" {...here("/leistungsumfang")}>
                  <span>Projektstart</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/wissen/projekt-vorbereiten" {...here("/wissen/projekt-vorbereiten")}>
                  <span>Projekt vorbereiten</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
            <div className={"megamenu-bottom"}>
              <span>Ihr Projekt verdient einen klaren Rahmen.</span>
              <a href="/leistungsumfang" {...here("/leistungsumfang")}>Projektumfang festlegen<svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
            </div>
          </div>
        </details>
        <a href="/wissen" {...here("/wissen")}>Arbeitsweise</a>
        <a href="/kontakt" {...here("/kontakt")}>Kontakt</a>
      </nav>
      <div className="header-tools">
      <details className={"mobile-navigation"} open={openMenu === "mobile"}>
        <summary ref={mobileSummary} aria-label="Menü" aria-expanded={openMenu === "mobile"} aria-controls={`${id}-mobile`} onClick={toggleMenu("mobile")}>
          <span className={"mobile-menu-mark"} aria-hidden="true">
            <i />
            <i />
          </span>
        </summary>
        <nav className={"mobile-navigation-panel"} id={`${id}-mobile`} aria-label="Hauptnavigation">
          <div className={"mobile-primary-links"}>
            <a href="/leistungen" {...here("/leistungen")}>Leistungen</a>
            <a href="/wissen" {...here("/wissen")}>Arbeitsweise</a>
            <a href="/kontakt" {...here("/kontakt")}>Kontakt</a>
          </div>
          <div className={"megamenu-group"}>
            <h2>NeXify AI</h2>
            <a href="/produkte/nex2fly" {...here("/produkte/nex2fly")}>
              <span>NeX AIFly Suite</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/produkte/one" {...here("/produkte/one")}>
              <span>NeX Agentic AI</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/produkte/api" {...here("/produkte/api")}>
              <span>API &amp; Integrationen</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>TEILEKLAR</h2>
            <a href="/teileklar" {...here("/teileklar")}>
              <span>TEILEKLAR entdecken</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/teileklar/werkstatt" {...here("/teileklar/werkstatt")}>
              <span>Werkstattprofile</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/teileklar/partner-werden" {...here("/teileklar/partner-werden")}>
              <span>Werkstattpartner werden</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>Projekt &amp; Wachstum</h2>
            <a href="/loesungen" {...here("/loesungen")}>
              <span>Kampagne und Zielseite aus einem Guss.</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/preise-ablauf" {...here("/preise-ablauf")}>
              <span>Preise &amp; Ablauf</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/leistungsumfang" {...here("/leistungsumfang")}>
              <span>Projektstart</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/wissen/projekt-vorbereiten" {...here("/wissen/projekt-vorbereiten")}>
              <span>Projekt vorbereiten</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>Ihr Konto</h2>
            <a href="/anmelden" {...here("/anmelden")}>
              <span>Anmelden und weiterarbeiten.</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/registrieren" {...here("/registrieren")}>
              <span>NeX AIFly Suite. In Ruhe testen.</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <Button variant="ghost" type="button" className={"nexify-control"} data-variant="quiet" onClick={closeMenu}>Menü schließen</Button>
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
        <Button variant="ghost" size="icon" type="button" className={"theme-switch"} role="switch" aria-checked={light} aria-label="Helle Ansicht" title={light ? "Dunkle Ansicht" : "Helle Ansicht"} onClick={toggleTheme}>
          <svg className={"theme-sun"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
          </svg>
          <svg className={"theme-moon"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          </svg>
        </Button>
        <a className={"header-cta"} href="/kontakt" {...here("/kontakt")}><span aria-hidden="true" />Projektgespräch anfragen</a>
      </div>
      </div>
    </header>
  );
}
