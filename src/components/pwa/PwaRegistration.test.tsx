import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SW_PATH } from "@/lib/pwa-config";
import { PwaRegistration } from "./PwaRegistration";

const register = vi.fn().mockResolvedValue({});

function browser({ saveData = false, bereit = "complete" as DocumentReadyState } = {}) {
  Object.defineProperty(navigator, "serviceWorker", {
    configurable: true,
    value: { register, getRegistrations: async () => [] },
  });
  Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData } });
  Object.defineProperty(document, "readyState", { configurable: true, get: () => bereit });
}

beforeEach(() => {
  vi.useFakeTimers();
  register.mockClear();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  Reflect.deleteProperty(navigator, "serviceWorker");
  Reflect.deleteProperty(navigator, "connection");
  Reflect.deleteProperty(document, "readyState");
});

describe("Anmelden des Service Workers im Browser", () => {
  it("meldet im Produktions-Build nach dem Laden mit Verzögerung /sw.js für die ganze Website an", () => {
    vi.stubEnv("PROD", true);
    browser();
    render(<PwaRegistration />);
    expect(register).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1500);
    expect(register).toHaveBeenCalledExactlyOnceWith(SW_PATH, { scope: "/" });
  });

  it("wartet auf das Laden der Seite", () => {
    vi.stubEnv("PROD", true);
    browser({ bereit: "loading" });
    render(<PwaRegistration />);
    vi.advanceTimersByTime(5000);
    expect(register).not.toHaveBeenCalled();
    window.dispatchEvent(new Event("load"));
    vi.advanceTimersByTime(1500);
    expect(register).toHaveBeenCalledTimes(1);
  });

  it("meldet nichts an: außerhalb der Produktion, im Datensparmodus, ohne Unterstützung", () => {
    browser();
    render(<PwaRegistration />).unmount();
    vi.advanceTimersByTime(5000);
    vi.stubEnv("PROD", true);
    browser({ saveData: true });
    render(<PwaRegistration />).unmount();
    vi.advanceTimersByTime(5000);
    Reflect.deleteProperty(navigator, "serviceWorker");
    render(<PwaRegistration />).unmount();
    vi.advanceTimersByTime(5000);
    expect(register).not.toHaveBeenCalled();
  });

  it("verlässt der Besucher die Seite vor Ablauf der Verzögerung, bleibt die Anmeldung aus", () => {
    vi.stubEnv("PROD", true);
    browser();
    const { unmount } = render(<PwaRegistration />);
    vi.advanceTimersByTime(1000);
    unmount();
    vi.advanceTimersByTime(5000);
    expect(register).not.toHaveBeenCalled();
  });
});
