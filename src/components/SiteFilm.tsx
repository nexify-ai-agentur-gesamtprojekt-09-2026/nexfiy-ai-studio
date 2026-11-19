import { useId } from "react";
import filmCSS from "../styles/site-film.css?url";
import { SITE_FILMS, type SiteFilmId } from "../lib/site-films";

const PLAY_PATH = "M6 3.8a.7.7 0 0 1 1.05-.6l9.2 6.2a.7.7 0 0 1 0 1.2l-9.2 6.2A.7.7 0 0 1 6 16.2Z";

/** One brand film with the site-wide discreet controls. Behaviour is wired by useAtelierFilms(). */
export function SiteFilm({ film, eager = false }: { film: SiteFilmId; eager?: boolean }) {
  const data = SITE_FILMS[film];
  const volumeId = `${useId()}-volume`;
  return (
    <div className="atelier-film atelier-film-hero" data-film={film}>
      <link rel="stylesheet" href={filmCSS} precedence="site-film" />
      <div className="atelier-film-picture">
        <img
          className="atelier-film-fallback"
          src={data.poster}
          alt={data.alt}
          width={1280}
          height={720}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
        />
        <video
          src={data.src}
          poster={data.poster}
          width={1280}
          height={720}
          preload={eager ? "auto" : "metadata"}
          playsInline
          muted
          aria-label={data.label}
        />
        <div className="atelier-film-controls">
          <button type="button" aria-label="Film abspielen">
            <svg
              className="atelier-playback-icon"
              viewBox="0 0 20 20"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d={PLAY_PATH} />
            </svg>
            <span>Abspielen</span>
          </button>
          <button type="button" aria-label="Film mit Ton starten">
            <svg
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
              <path d="M4 9h4l5-4v14l-5-4H4Z" />
              <path d="m17 9 5 6m0-6-5 6" />
            </svg>
            <span>Ton an</span>
          </button>
          <details className="atelier-volume">
            <summary aria-label="Lautstärke">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M3 12h8m6 0h4" strokeLinecap="round" />
                <circle cx="14" cy="12" r="3" />
              </svg>
              <span className="visually-hidden">Lautstärke</span>
            </summary>
            <div>
              <label htmlFor={volumeId}>
                Lautstärke
                <input id={volumeId} type="range" min="0" max="1" step="0.05" defaultValue="0.8" />
              </label>
            </div>
          </details>
        </div>
        <div className="atelier-film-progress" aria-hidden="true">
          <span style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
      {data.transcript ? (
        <details className="atelier-film-transcript">
          <summary>Gesprochener Text</summary>
          <p lang="de">{data.transcript}</p>
        </details>
      ) : null}
    </div>
  );
}
