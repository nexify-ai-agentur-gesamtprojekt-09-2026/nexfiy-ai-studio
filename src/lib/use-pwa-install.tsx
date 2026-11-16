import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  consumeInstallPrompt,
  installDevice,
  isAppInstalled,
  type InstallDevice,
  type InstallPromptEvent,
} from "./pwa-install";

interface InstallState {
  device: InstallDevice;
  installed: boolean;
  canPrompt: boolean;
  installing: boolean;
  dismissed: boolean;
  install: () => Promise<"accepted" | "dismissed" | "unavailable" | "error">;
  dismiss: () => void;
  restore: () => void;
}

const InstallContext = createContext<InstallState | null>(null);
const dismissalKey = "nexify-install-dismissed";

/** Keep the browser's one-use event alive across navigation, without caching pages. */
export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const promptRef = useRef<InstallPromptEvent | null>(null);
  const [device, setDevice] = useState<InstallDevice>("desktop");
  const [installed, setInstalled] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDevice(installDevice(navigator.userAgent, navigator.maxTouchPoints));
    try {
      setDismissed(sessionStorage.getItem(dismissalKey) === "true");
    } catch {
      /* Optional preference only. */
    }
    const display = window.matchMedia("(display-mode: standalone)");
    const syncInstalled = () =>
      setInstalled(
        isAppInstalled(
          display.matches,
          (navigator as Navigator & { standalone?: boolean }).standalone,
        ),
      );
    syncInstalled();
    const onPrompt = (event: Event) => {
      if (!("prompt" in event) || !("userChoice" in event)) return;
      event.preventDefault();
      promptRef.current = event as InstallPromptEvent;
      setCanPrompt(true);
    };
    const onInstalled = () => {
      promptRef.current = null;
      setCanPrompt(false);
      setInstalled(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    display.addEventListener("change", syncInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      display.removeEventListener("change", syncInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    const event = promptRef.current;
    if (!event) return "unavailable" as const;
    promptRef.current = null;
    setCanPrompt(false);
    setInstalling(true);
    try {
      // prompt() is reached synchronously from the user's click, before any await.
      return await consumeInstallPrompt(event);
    } catch {
      return "error" as const;
    } finally {
      setInstalling(false);
    }
  }, []);

  const updateDismissed = (value: boolean) => {
    setDismissed(value);
    try {
      sessionStorage.setItem(dismissalKey, String(value));
    } catch {
      /* Works without storage. */
    }
  };

  return (
    <InstallContext.Provider
      value={{
        device,
        installed,
        canPrompt,
        installing,
        dismissed,
        install,
        dismiss: () => updateDismissed(true),
        restore: () => updateDismissed(false),
      }}
    >
      {children}
    </InstallContext.Provider>
  );
}

export function usePwaInstall() {
  const state = useContext(InstallContext);
  if (!state) throw new Error("PwaInstallProvider is required for app installation.");
  return state;
}
