// 2026-11-19 19:20 (Europe/Berlin): Gemeinsames Gerüst für die Rechtsseiten.
// Warum: Datenschutz, Cookies, KI-Hinweise und Barrierefreiheit hatten je zwei Platzhalter-Abschnitte
//   und eine doppelt gepflegte Anker-Navigation. Ein Bauteil hält Anker und Abschnitte synchron.
// Umfang: gibt ausschließlich die vorhandenen Gestaltungsklassen (hc-anchors, pc-sections, hc-intro) aus.
import { Fragment, type ReactNode } from "react";

export interface LegalSection {
  id: string;
  title: string;
  blocks: ReactNode[];
}

const pad = (n: number) => String(n).padStart(2, "0");

const ARROW = (
  <svg
    className={"hc-arrow"}
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...({ focusable: "false" } as Record<string, string>)}
  >
    <path d="M12 4v16M5 13l7 7 7-7" />
  </svg>
);

export function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.title}
            {ARROW}
          </a>
        ))}
      </nav>
      <div className={"pc-sections"}>
        {sections.map((section, index) => (
          <section
            key={section.id}
            className={"hc-intro hc-container pc-section"}
            id={section.id}
            tabIndex={-1}
            aria-labelledby={`${section.id}-title`}
          >
            <div>
              <span className={"hc-kicker"}>
                {pad(index + 1)} / {pad(sections.length)}
              </span>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
            </div>
            <div className={"pc-section-body"}>
              {section.blocks.map((block, blockIndex) => (
                <Fragment key={blockIndex}>{block}</Fragment>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
