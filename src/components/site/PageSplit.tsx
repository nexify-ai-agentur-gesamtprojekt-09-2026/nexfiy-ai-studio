import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePanelRef } from "react-resizable-panels";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { pageSplitSizes } from "@/lib/page-split";

/** The library owns dragging, pointer capture, keyboard bounds and panel sizing. */
export function PageSplit({ page, chat, open, mobile }: { page: ReactNode; chat: ReactNode; open: boolean; mobile: boolean }) {
  const panelRef = usePanelRef();
  const [width, setWidth] = useState(1440);
  const preference = useRef<number | null>(null);
  const adjusting = useRef(false);
  const bounds = pageSplitSizes(width);
  useEffect(() => {
    const sync = () => setWidth(window.innerWidth);
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);
  useEffect(() => {
    if (mobile || !open) return;
    adjusting.current = true;
    panelRef.current?.resize(Math.min(bounds.max, Math.max(bounds.min, preference.current === null ? bounds.preferred : width * preference.current)));
    const frame = requestAnimationFrame(() => { adjusting.current = false; });
    return () => cancelAnimationFrame(frame);
  }, [width, open, mobile, bounds.min, bounds.max, bounds.preferred, panelRef]);
  const reset = () => {
    preference.current = null;
    adjusting.current = true;
    panelRef.current?.resize(bounds.preferred);
    requestAnimationFrame(() => { adjusting.current = false; });
  };
  if (mobile || !open) return <>{page}{chat}</>;
  return <ResizablePanelGroup className="site-page-split" orientation="horizontal">
    <ResizablePanel id="website-pane" minSize={440} className="site-page-pane">{page}</ResizablePanel>
    <ResizableHandle className="site-page-divider" aria-label="Chatbreite anpassen" title="Chatbreite anpassen" onDoubleClick={reset} withHandle />
    <ResizablePanel id="oracle-pane" panelRef={panelRef} defaultSize={bounds.preferred} minSize={bounds.min} maxSize={bounds.max} className="site-oracle-pane" onResize={(size, _id, previous) => {
      if (previous && !adjusting.current) preference.current = size.asPercentage / 100;
    }}>{chat}</ResizablePanel>
  </ResizablePanelGroup>;
}