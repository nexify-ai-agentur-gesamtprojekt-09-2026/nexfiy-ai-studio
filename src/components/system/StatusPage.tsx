import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "./BrandMark";
import type { PageSuggestion } from "@/lib/system-pages";

export interface StatusPageProps {
  /** Large decorative code behind the headline, e.g. "404". Hidden from assistive tech. */
  code?: string;
  kicker: string;
  title: string;
  description: ReactNode;
  /** Extra line under the description, e.g. the requested path. */
  detail?: ReactNode;
  actions: ReactNode;
  suggestions?: PageSuggestion[];
  suggestionsLabel?: string;
  /** "alert" for failures so screen readers announce them; "none" for ordinary pages like 404. */
  tone?: "neutral" | "alert";
  children?: ReactNode;
}

/** Full-screen system page in the NeXify look (graphite stage, lime signal). Used for 404 and errors. */
export function StatusPage({
  code,
  kicker,
  title,
  description,
  detail,
  actions,
  suggestions,
  suggestionsLabel = "Vielleicht suchen Sie",
  tone = "neutral",
  children,
}: StatusPageProps) {
  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-background font-sans text-foreground antialiased">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-(image:--gradient-stage-glow)" />
      {code ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[4vw] top-1/2 -z-10 -translate-y-1/2 select-none font-heading text-[clamp(12rem,34vw,30rem)] font-bold leading-none tracking-[-0.06em] text-transparent opacity-60 [-webkit-text-stroke:1px_var(--border-strong)]"
        >
          {code}
        </span>
      ) : null}

      <header className="mx-auto w-full max-w-6xl px-6 pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-10">
        <BrandMark />
      </header>

      <main id="page-content" className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16 sm:px-10">
        <section
          aria-labelledby="status-title"
          role={tone === "alert" ? "alert" : undefined}
          className="max-w-2xl animate-status-rise"
        >
          <p className="flex items-center gap-2.5 font-label text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-signal shadow-[0_0_12px_var(--brand-signal)]" />
            {kicker}
          </p>
          <h1
            id="status-title"
            className="mt-6 text-balance font-heading text-[clamp(2.5rem,6.5vw,4.75rem)] font-semibold leading-[1.06] tracking-[-0.035em]"
          >
            {title}
          </h1>
          <div className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{description}</div>
          {detail ? <div className="mt-4 text-sm text-muted-foreground">{detail}</div> : null}
          <div className="mt-10 flex flex-wrap items-center gap-3">{actions}</div>
          {children}
        </section>

        {suggestions && suggestions.length > 0 ? (
          <nav aria-labelledby="status-suggestions" className="mt-20 animate-status-rise [animation-delay:120ms]">
            <h2 id="status-suggestions" className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {suggestionsLabel}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((suggestion) => (
                <li key={suggestion.to}>
                  <Link
                    to={suggestion.to}
                    className="group flex h-full flex-col gap-2 rounded-[18px] border border-border bg-(image:--gradient-surface) p-5 shadow-(--elevation-card) outline-none transition-[transform,border-color] duration-300 ease-brand hover:-translate-y-0.5 hover:border-border-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="flex items-center justify-between gap-3 font-heading text-base font-semibold tracking-[-0.02em]">
                      {suggestion.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted-foreground transition-[transform,color] duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-signal"
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{suggestion.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </main>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-xs text-muted-foreground sm:px-10">
        <p>
          NeXify AI <span aria-hidden="true">·</span> Chat it. Automate it. <span aria-hidden="true">·</span>{" "}
          <a className="underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground" href="mailto:mail@nexifyai.cloud">
            mail@nexifyai.cloud
          </a>
        </p>
      </footer>
    </div>
  );
}
