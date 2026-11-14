import { useCallback } from "react";
import { useLocation } from "@tanstack/react-router";

/** Returns a helper that marks a link to the current page with aria-current="page". */
export function useCurrentPage() {
  const pathname = useLocation({ select: (location) => location.pathname.replace(/\/+$/, "") || "/" });
  return useCallback(
    (href: string) => ((href.replace(/\/+$/, "") || "/") === pathname ? { "aria-current": "page" as const } : undefined),
    [pathname],
  );
}
