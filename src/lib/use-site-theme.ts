import { useEffect, useState } from "react";

/** Read preferences only after hydration; captured and semantic themes share one attribute. */
export function useSiteTheme() {
  const [light, setLight] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setLight(localStorage.getItem("nexify-theme") === "light");
    } catch {
      /* Storage may be disabled. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset["theme"] = light ? "light" : "dark";
    document.documentElement.style.colorScheme = light ? "light" : "dark";
    try {
      localStorage.setItem("nexify-theme", light ? "light" : "dark");
    } catch {
      /* In-memory theme remains usable. */
    }
  }, [light, ready]);
  return { light, toggleTheme: () => setLight((value) => !value) };
}
