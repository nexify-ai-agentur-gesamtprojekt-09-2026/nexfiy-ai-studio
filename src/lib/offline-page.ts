import { KONTAKT } from "./site-facts";

/**
 * Offline-Seite der installierbaren Web-App (`/offline`). Der Service Worker speichert sie beim
 * Installieren und zeigt sie, wenn eine Seite ohne Netz angefragt wird. Deshalb ohne Skripte und
 * ohne das Seitenbündel: sie muss unter jeder Adresse gleich aussehen und darf nichts nachladen
 * außer Markenzeichen und Schriften, die der Worker mit ihr speichert.
 * Farben und Schriften sind die Marken-Tokens aus src/styles.css.
 */
export function renderOfflinePage(): string {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="robots" content="noindex" />
    <meta name="theme-color" content="#1b1e1d" />
    <meta name="color-scheme" content="dark" />
    <title>Sie sind offline · NeXify AI</title>
    <link rel="icon" href="/favicon.ico" />
    <style>
      @font-face { font-family: Inter; src: url("/site-assets/0848630eef4b593d.woff2") format("woff2"); font-weight: 400 700; font-display: swap; }
      @font-face { font-family: "Plus Jakarta Sans"; src: url("/site-assets/f7f6e92afae6f3df.woff2") format("woff2"); font-weight: 400 700; font-display: swap; }
      :root { color-scheme: dark; --grund: #1b1e1d; --schrift: #f1ede6; --leise: #b9c0b9; --signal: #c5f24a; --linie: rgb(255 255 255 / 18%); }
      @supports (color: oklch(0 0 0)) {
        :root { --grund: oklch(0.2315 0.0049 173.96); --schrift: oklch(0.9558 0.0086 84.57); --leise: oklch(0.783 0.0087 157.04); --signal: oklch(0.8861 0.2017 123.37); }
      }
      * { box-sizing: border-box; }
      html { background: var(--grund); }
      body { margin: 0; min-height: 100vh; min-height: 100dvh; display: flex; flex-direction: column; background: radial-gradient(120% 80% at 85% 0%, rgb(197 242 74 / 7%), transparent 60%), var(--grund); color: var(--schrift); font: 400 17px/1.6 Inter, "Segoe UI", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
      header, main, footer { width: 100%; max-width: 72rem; margin: 0 auto; padding-inline: max(1.5rem, env(safe-area-inset-left)) max(1.5rem, env(safe-area-inset-right)); }
      header { padding-top: max(1.5rem, env(safe-area-inset-top)); }
      .marke { display: inline-flex; align-items: center; gap: 0.75rem; color: inherit; text-decoration: none; border-radius: 999px; }
      .marke img { width: 40px; height: 40px; }
      .marke strong { font: 600 17px/1 "Plus Jakarta Sans", Inter, system-ui, sans-serif; letter-spacing: -0.03em; }
      .marke strong span { color: var(--signal); }
      main { flex: 1; display: flex; flex-direction: column; justify-content: center; padding-block: 4rem; }
      .kicker { display: flex; align-items: center; gap: 0.6rem; margin: 0; color: var(--leise); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; }
      .kicker::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--signal); box-shadow: 0 0 12px var(--signal); }
      h1 { max-width: 16ch; margin: 1.5rem 0 0; font: 600 clamp(2.5rem, 6.5vw, 4.75rem)/1.06 "Plus Jakarta Sans", Inter, system-ui, sans-serif; letter-spacing: -0.035em; text-wrap: balance; }
      p { max-width: 36rem; margin: 1.5rem 0 0; color: var(--leise); text-wrap: pretty; }
      .aktionen { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2.5rem; }
      .knopf { display: inline-flex; align-items: center; min-height: 48px; padding: 0 1.5rem; border: 1px solid var(--linie); border-radius: 999px; color: var(--schrift); font-weight: 600; text-decoration: none; }
      .knopf.haupt { border-color: var(--signal); background: var(--signal); color: #14170f; }
      a:focus-visible { outline: 2px solid var(--signal); outline-offset: 4px; }
      footer { padding-bottom: max(1.5rem, env(safe-area-inset-bottom)); color: var(--leise); font-size: 12px; }
      footer p { margin: 0; max-width: none; }
    </style>
  </head>
  <body>
    <header>
      <a class="marke" href="/" aria-label="NeXify AI · Startseite">
        <img src="/site-assets/9176c58a16ff634a.png" alt="" width="40" height="40" />
        <strong>Ne<span>X</span>ify AI</strong>
      </a>
    </header>
    <main id="page-content">
      <p class="kicker">NeXify AI · Keine Verbindung</p>
      <h1>Sie sind offline.</h1>
      <p>
        Diese Seite lässt sich ohne Internetverbindung nicht laden. Sobald Ihr Gerät wieder online
        ist, geht es hier weiter.
      </p>
      <p>
        Dringend? Sie erreichen uns telefonisch unter
        <a href="${KONTAKT.telefonLink}" style="color: inherit; white-space: nowrap">${KONTAKT.telefon}</a>.
      </p>
      <div class="aktionen">
        <a class="knopf haupt" href="">Erneut versuchen</a>
        <a class="knopf" href="${KONTAKT.telefonLink}">Anrufen</a>
      </div>
    </main>
    <footer>
      <p>NeXify AI · Chat it. Automate it. · ${KONTAKT.email}</p>
    </footer>
  </body>
</html>`;
}
