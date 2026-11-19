import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type RefObject,
} from "react";

/**
 * Shared behaviour for the imported nexifyai.cloud pages (chat panel, header menus,
 * scroll-driven shell attributes and the "atelier" film players). Markup stays in each route.
 */

const PHONE_QUERY = "(max-width: 767px)";

function subscribePhone(onChange: () => void) {
  const query = matchMedia(PHONE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True on phone widths (the breakpoint the imported pages switch their chat panel to a dialog). False during SSR. */
export function useImportedMobile() {
  return useSyncExternalStore(
    subscribePhone,
    () => matchMedia(PHONE_QUERY).matches,
    () => false,
  );
}

/** Plays muted looping background videos only while they are on screen (decorative loops of some imported pages). */
export function useLoopingVideos() {
  useEffect(() => {
    const loopingVideos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video[loop]:not([autoplay]):not([controls])"),
    )
      .filter((video) => video.muted && !video.closest("[data-site-import-carousel-store]"))
      .slice(0, 32);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      }
    });
    loopingVideos.forEach((video) => observer.observe(video));
    return () => {
      observer.disconnect();
      loopingVideos.forEach((video) => video.pause());
    };
  }, []);
}

export function useShellSignals(heroActionSelector?: string) {
  const [scrolled, setScrolled] = useState(false);
  const [heroActionVisible, setHeroActionVisible] = useState(Boolean(heroActionSelector));
  const [footerVisible, setFooterVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setViewportHeight(window.innerHeight);
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const observers: IntersectionObserver[] = [];
    const heroAction = heroActionSelector ? document.querySelector(heroActionSelector) : null;
    if (heroAction) {
      const observer = new IntersectionObserver((entries) =>
        setHeroActionVisible(entries.at(-1)?.isIntersecting ?? true),
      );
      observer.observe(heroAction);
      observers.push(observer);
    }
    const footer = document.querySelector("#atelier footer");
    if (footer) {
      const observer = new IntersectionObserver((entries) =>
        setFooterVisible(entries.at(-1)?.isIntersecting ?? false),
      );
      observer.observe(footer);
      observers.push(observer);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [heroActionSelector]);
  return { scrolled, heroActionVisible, footerVisible, viewportHeight };
}

/** Chat panel open state; `defaultOpen` applies until the visitor toggles it. */
export function useChatPanel(defaultOpen: boolean) {
  const [preference, setPreference] = useState<boolean | null>(null);
  const chatOpen = preference ?? defaultOpen;
  const reopenRef = useRef<HTMLButtonElement>(null);
  const focusAfterToggle = useRef<"composer" | "launcher" | null>(null);
  const openChat = () => {
    focusAfterToggle.current = "composer";
    setPreference(true);
  };
  const closeChat = () => {
    focusAfterToggle.current = "launcher";
    setPreference(false);
  };
  useEffect(() => {
    const target = focusAfterToggle.current;
    focusAfterToggle.current = null;
    if (target === "composer") document.getElementById("orientation-message")?.focus();
    if (target === "launcher") reopenRef.current?.focus();
  }, [chatOpen]);
  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector(".site-header details[open]"))
        closeChat();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chatOpen]);
  return { chatOpen, openChat, closeChat, reopenRef };
}

export type HeaderMenu = "products" | "mobile";

/** Disclosure menus in the NeXify header: one open at a time, Escape closes and returns focus. */
export function useHeaderMenus() {
  const [openMenu, setOpenMenu] = useState<HeaderMenu | null>(null);
  const productsSummary = useRef<HTMLElement>(null);
  const mobileSummary = useRef<HTMLElement>(null);
  const summaryFor = (menu: HeaderMenu | null): RefObject<HTMLElement | null> =>
    menu === "mobile" ? mobileSummary : productsSummary;
  const closeMenu = () => {
    const summary = summaryFor(openMenu).current;
    setOpenMenu(null);
    summary?.focus();
  };
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      const summary = summaryFor(openMenu).current;
      setOpenMenu(null);
      summary?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);
  const toggleMenu = (menu: HeaderMenu) => (event: MouseEvent) => {
    event.preventDefault();
    setOpenMenu((current) => (current === menu ? null : menu));
  };
  return { openMenu, productsSummary, mobileSummary, toggleMenu, closeMenu };
}

export function fitComposer(textarea: HTMLTextAreaElement) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

/** Sizes the chat composer like the original whenever the panel opens or the viewport changes. */
export function useComposerFit(open: boolean, ...deps: unknown[]) {
  const composerRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (open && composerRef.current) fitComposer(composerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ...deps]);
  // Like the original, a panel that is open on page load starts scrolled to its latest entry.
  const openOnLoad = useRef(open);
  useEffect(() => {
    const log = composerRef.current
      ?.closest(".public-orientation")
      ?.querySelector<HTMLElement>(".orientation-content");
    if (!openOnLoad.current || !log) return;
    const toLatest = () => {
      log.scrollTop = log.scrollHeight;
    };
    toLatest();
    const frame = requestAnimationFrame(toLatest);
    const timer = window.setTimeout(toLatest, 400);
    window.addEventListener("load", toLatest, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("load", toLatest);
    };
  }, []);
  return composerRef;
}

const PLAY_ICON = "M6 3.8a.7.7 0 0 1 1.05-.6l9.2 6.2a.7.7 0 0 1 0 1.2l-9.2 6.2A.7.7 0 0 1 6 16.2Z";
const PAUSE_ICON = "M5.5 3.5h3v13h-3Zm6 0h3v13h-3Z";

/** Wires the imported film players: play/pause, sound, captions, volume, progress, one-at-a-time, hero autoplay. */
export function useAtelierFilms() {
  useEffect(() => {
    const films = Array.from(document.querySelectorAll<HTMLElement>(".atelier-film")).slice(0, 16);
    const videos: HTMLVideoElement[] = [];
    const cleanups: (() => void)[] = [];
    const autoPaused = new WeakSet<HTMLVideoElement>();
    const listen = (target: EventTarget, type: string, handler: EventListener) => {
      target.addEventListener(type, handler);
      cleanups.push(() => target.removeEventListener(type, handler));
    };
    for (const film of films) {
      const video = film.querySelector("video");
      if (!video) continue;
      video.muted = true;
      videos.push(video);
      const buttons = Array.from(
        film.querySelectorAll<HTMLButtonElement>(".atelier-film-controls > button"),
      );
      const playButton = buttons[0];
      const soundButton = buttons.find((button) =>
        /Ton/.test(button.getAttribute("aria-label") || ""),
      );
      const captionsButton = buttons.find(
        (button) => button.getAttribute("aria-label") === "Untertitel",
      );
      const fallback = film.querySelector<HTMLImageElement>(".atelier-film-fallback");
      const bar = film.querySelector<HTMLElement>(".atelier-film-progress span");
      const volume = film.querySelector<HTMLInputElement>('.atelier-volume input[type="range"]');
      const sync = () => {
        if (playButton) {
          playButton.setAttribute(
            "aria-label",
            video.ended ? "Erneut abspielen" : video.paused ? "Film abspielen" : "Film pausieren",
          );
          const label = playButton.querySelector("span");
          if (label) label.textContent = video.paused ? "Abspielen" : "Pausieren";
          playButton
            .querySelector("path")
            ?.setAttribute("d", video.paused ? PLAY_ICON : PAUSE_ICON);
        }
        if (soundButton) {
          soundButton.setAttribute(
            "aria-label",
            video.muted ? "Film mit Ton starten" : "Ton ausschalten",
          );
          const label = soundButton.querySelector("span");
          if (label) label.textContent = video.muted ? "Ton an" : "Ton aus";
        }
        if (fallback && !video.paused) fallback.hidden = true;
        if (bar && video.duration > 0)
          bar.style.transform = `scaleX(${Math.min(1, video.currentTime / video.duration)})`;
      };
      for (const type of ["play", "pause", "ended", "timeupdate", "volumechange", "loadedmetadata"])
        listen(video, type, sync);
      listen(video, "play", () => {
        for (const other of videos) if (other !== video && !other.paused) other.pause();
      });
      if (playButton)
        listen(playButton, "click", () => {
          autoPaused.delete(video);
          if (video.paused) void video.play().catch(() => {});
          else video.pause();
        });
      if (soundButton)
        listen(soundButton, "click", () => {
          if (video.muted) {
            video.currentTime = 0;
            video.muted = false;
            void video.play().catch(() => {});
          } else video.muted = true;
        });
      if (captionsButton)
        listen(captionsButton, "click", () => {
          const pressed = captionsButton.getAttribute("aria-pressed") !== "true";
          captionsButton.setAttribute("aria-pressed", String(pressed));
          const track = video.textTracks[0];
          if (track) track.mode = pressed ? "showing" : "hidden";
        });
      if (volume) {
        listen(volume, "input", () => {
          video.volume = Number(volume.value);
        });
        video.volume = Number(volume.value);
      }
      sync();
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (!entry.isIntersecting && !video.paused) {
          autoPaused.add(video);
          video.pause();
        } else if (entry.isIntersecting && autoPaused.has(video)) {
          autoPaused.delete(video);
          void video.play().catch(() => {});
        }
      }
    });
    videos.forEach((video) => observer.observe(video));
    const heroVideo = document.querySelector<HTMLVideoElement>(".identity-hero video");
    if (heroVideo && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heroVideo.muted = true;
      void heroVideo.play().catch(() => {});
    }
    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      videos.forEach((video) => video.pause());
    };
  }, []);
}
