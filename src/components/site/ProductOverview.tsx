import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Shared presentation; product facts and examples are supplied by each route. */
export function ProductOverview({
  id,
  label,
  title,
  summary,
  facts,
  example,
  links,
}: {
  id: string;
  label: string;
  title: string;
  summary: string;
  facts: { label: string; content: ReactNode }[];
  example: ReactNode;
  links: { label: string; href: string }[];
}) {
  return (
    <section className="product-overview hc-container" aria-labelledby={`${id}-title`}>
      <header className="product-overview-heading">
        <span className="hc-kicker">{label}</span>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{summary}</p>
      </header>
      <dl className="product-overview-facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.content}</dd>
          </div>
        ))}
      </dl>
      <div className="product-overview-example">
        <h3>Ein konkreter Ausgangspunkt</h3>
        <p>{example}</p>
      </div>
      <nav className="product-overview-links" aria-label={`${title} – nächste Schritte`}>
        {links.map((link) => (
          <Button asChild variant="glass" key={link.href}>
            <a href={link.href}>
              {link.label}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        ))}
      </nav>
    </section>
  );
}
