import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** NeXify AI logo (mascot + word mark) linking home; the same mark the imported headers show. */
export function BrandMark({ className, claim = true }: { className?: string; claim?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="NeXify AI · Startseite"
      className={cn(
        "group inline-flex items-center gap-3 rounded-full pr-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className,
      )}
    >
      <img
        src="/site-assets/9176c58a16ff634a.png"
        alt=""
        aria-hidden="true"
        width={40}
        height={40}
        decoding="async"
        draggable={false}
        className="size-10 transition-transform duration-500 ease-brand group-hover:-rotate-6 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[17px] font-semibold tracking-[-0.03em] text-foreground">
          Ne<span className="text-brand-signal">X</span>ify AI
        </span>
        {claim ? (
          <span className="mt-1 text-[11px] tracking-[0.02em] text-muted-foreground">
            Chat it. Automate it.
          </span>
        ) : null}
      </span>
    </Link>
  );
}
