import { describe, expect, it, vi } from "vitest";

import {
  HINWEIS_SCHLUESSEL,
  hinweisGeschlossen,
  hinweisSchliessen,
  isIosSafari,
  registerServiceWorker,
  retireServiceWorker,
  runningStandalone,
} from "./pwa-client";

const ORIGIN = "https://www.nexifyai.de";

describe("Anmelden des Service Workers", () => {
  it("meldet /sw.js für die ganze Website an", async () => {
    const register = vi.fn().mockResolvedValue({});
    expect(await registerServiceWorker({ register, getRegistrations: async () => [] })).toBe(true);
    expect(register).toHaveBeenCalledWith("/sw.js", { scope: "/" });
  });

  it("bleibt ohne Folgen, wenn der Browser ablehnt oder keinen Worker kennt", async () => {
    const register = vi.fn().mockRejectedValue(new Error("SecurityError"));
    expect(await registerServiceWorker({ register, getRegistrations: async () => [] })).toBe(false);
    expect(await registerServiceWorker(undefined)).toBe(false);
  });
});

describe("Rückbau im Browser", () => {
  it("entfernt nur die eigene Registrierung und nur die eigenen Caches", async () => {
    const eigene = {
      active: { scriptURL: `${ORIGIN}/sw.js` },
      unregister: vi.fn().mockResolvedValue(true),
    };
    const wartend = {
      waiting: { scriptURL: "/sw.js" },
      unregister: vi.fn().mockResolvedValue(true),
    };
    const fremde = { active: { scriptURL: `${ORIGIN}/anderer-worker.js` }, unregister: vi.fn() };
    const leer = { unregister: vi.fn() };
    const stores = new Set(["nexify-pwa-static-a", "nexify-pwa-offline-a", "fremder-cache"]);
    const ergebnis = await retireServiceWorker(
      { register: vi.fn(), getRegistrations: async () => [eigene, wartend, fremde, leer] },
      { keys: async () => [...stores], delete: async (key) => stores.delete(key) },
      ORIGIN,
    );
    expect(ergebnis).toEqual({ registrations: 2, caches: 2 });
    expect(fremde.unregister).not.toHaveBeenCalled();
    expect(leer.unregister).not.toHaveBeenCalled();
    expect([...stores]).toEqual(["fremder-cache"]);
  });

  it("ändert nichts, wenn der Zugriff scheitert oder nichts da ist", async () => {
    const kaputt = {
      register: vi.fn(),
      getRegistrations: async () => {
        throw new Error("gesperrt");
      },
    };
    expect(await retireServiceWorker(kaputt, undefined, ORIGIN)).toEqual({
      registrations: 0,
      caches: 0,
    });
    expect(await retireServiceWorker(undefined, undefined, ORIGIN)).toEqual({
      registrations: 0,
      caches: 0,
    });
  });
});

describe("Installationshinweis: wann er sinnvoll ist", () => {
  it("erkennt die installierte Web-App", () => {
    expect(runningStandalone({ matchMedia: () => ({ matches: true }) })).toBe(true);
    expect(
      runningStandalone({
        matchMedia: () => ({ matches: false }),
        navigator: { standalone: true },
      }),
    ).toBe(true);
    expect(runningStandalone({ matchMedia: () => ({ matches: false }), navigator: {} })).toBe(
      false,
    );
    expect(runningStandalone({})).toBe(false);
  });

  it("erkennt Safari auf iPhone und iPad, nicht andere Browser dort", () => {
    const iphone =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
    const chromeIos =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/130.0 Mobile/15E148 Safari/604.1";
    const ipad =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15";
    const android =
      "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36";
    expect(isIosSafari(iphone)).toBe(true);
    expect(isIosSafari(chromeIos)).toBe(false);
    expect(isIosSafari(ipad, 5)).toBe(true);
    expect(isIosSafari(ipad, 0)).toBe(false);
    expect(isIosSafari(android)).toBe(false);
  });

  it("merkt die Ablehnung nur lokal und verträgt gesperrten Speicher", () => {
    const speicher = new Map<string, string>();
    const storage = {
      getItem: (key: string) => speicher.get(key) ?? null,
      setItem: (key: string, value: string) => void speicher.set(key, value),
    };
    expect(hinweisGeschlossen(storage)).toBe(false);
    hinweisSchliessen(storage);
    expect(speicher.get(HINWEIS_SCHLUESSEL)).toBe("1");
    expect(hinweisGeschlossen(storage)).toBe(true);
    const gesperrt = {
      getItem: () => {
        throw new Error("SecurityError");
      },
      setItem: () => {
        throw new Error("SecurityError");
      },
    };
    expect(hinweisGeschlossen(gesperrt)).toBe(false);
    expect(() => hinweisSchliessen(gesperrt)).not.toThrow();
    expect(hinweisGeschlossen(undefined)).toBe(false);
  });
});
