import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePanelRef } from "react-resizable-panels";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { pageSplitSizes } from "@/lib/page-split";

/** The library owns dragging, pointer capture, keyboard bounds and panel sizing. */
export function PageSplit({ page, chat, open, mobile }: { page: ReactNode; chat: ReactNode; open: boolean; mobile: boolean }) {
  const panelRef = usePanelRef();
  const [width, setWidth] = useState(1440);
  const [ready, setReady] = useState(false);
  const preference = useRef<number | null>(null);
  const adjusting = useRef(false);
  const bounds = pageSplitSizes(width);
  useLayoutEffect(() => {
    const sync = () => setWidth(window.innerWidth);
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);
  useLayoutEffect(() => {
    // Keep the conversation mounted across closing and breakpoint changes.
    if (mobile || !open) { panelRef.current?.resize(1); setReady(true); return; }
    adjusting.current = true;
    panelRef.current?.resize(Math.min(bounds.max, Math.max(bounds.min, preference.current === null ? bounds.preferred : width * preference.current)));
    const frame = requestAnimationFrame(() => { adjusting.current = false; setReady(true); });
    return () => cancelAnimationFrame(frame);
  }, [width, open, mobile, bounds.min, bounds.max, bounds.preferred, panelRef]);
  const reset = () => {
    preference.current = null;
    adjusting.current = true;
    panelRef.current?.resize(bounds.preferred);
    requestAnimationFrame(() => { adjusting.current = false; });
  };
  return <ResizablePanelGroup className="site-page-split" data-split-ready={ready ? "true" : "false"} orientation="horizontal" disabled={mobile}>
    <ResizablePanel id="website-pane" defaultSize="70%" minSize={mobile ? 0 : 440} className="site-page-pane">{page}</ResizablePanel>
    <ResizableHandle className={open && !mobile ? "site-page-divider" : "site-page-divider is-hidden"} disabled={!open || mobile} aria-label="Chatbreite anpassen" title="Chatbreite anpassen" disableDoubleClick onDoubleClick={reset} withHandle />
    <ResizablePanel id="oracle-pane" panelRef={panelRef} defaultSize="30%" minSize={mobile || !open ? 1 : bounds.min} maxSize={bounds.max} className="site-oracle-pane" onResize={(size, _id, previous) => {
      if (previous && !mobile && open && size.inPixels >= bounds.min && !adjusting.current) preference.current = size.asPercentage / 100;
    }}>{chat}</ResizablePanel>
  </ResizablePanelGroup>;
}