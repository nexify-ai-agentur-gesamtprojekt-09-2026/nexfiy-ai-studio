import "@testing-library/jest-dom/vitest";

// Tests mit `@vitest-environment node` (z. B. chat-api gegen SQLite) haben kein `window`.
if (typeof window !== "undefined") {
  Object.defineProperty(window, "scrollTo", {
    writable: true,
    value: () => {},
  });

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  // jsdom liefert ohne setzbare Origin keinen Storage (der Getter wirft). Ein Probe-Zugriff
  // wuerde den Fehler nur protokollieren, deshalb direkt setzen — und still scheitern, wenn die
  // Umgebung die Eigenschaft sperrt.
  const speicher = (): Storage => {
    const karte = new Map<string, string>();
    return {
      get length() {
        return karte.size;
      },
      clear: () => karte.clear(),
      getItem: (k) => karte.get(k) ?? null,
      key: (i) => [...karte.keys()][i] ?? null,
      removeItem: (k) => void karte.delete(k),
      setItem: (k, v) => void karte.set(k, String(v)),
    };
  };
  for (const name of ["localStorage", "sessionStorage"] as const) {
    try {
      Object.defineProperty(window, name, { configurable: true, value: speicher() });
    } catch {
      // gesperrt: dann fuehrt der jeweilige Test den Zugriff selbst.
    }
  }
}
