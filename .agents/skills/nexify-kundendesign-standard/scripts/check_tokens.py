#!/usr/bin/env python3
"""Prüft eine Token-Datei (Graphite-Rollen) auf Vollständigkeit und WCAG-Kontraste – dunkel und hell.

Aufruf:  python3 check_tokens.py <tokens.css> [<weitere tokens.css> ...]
Mehrere Dateien werden in Reihenfolge überlagert (z. B. Graphite-Basis, dann tokens.<kunde>.css).
Exit-Code 1 bei fehlender Rolle oder unterschrittenem Kontrast, damit der Lauf laut scheitert.
"""
import math
import re
import sys

REQUIRED = [
    "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
    "primary", "primary-foreground", "secondary", "secondary-foreground", "muted",
    "muted-foreground", "accent", "accent-foreground", "destructive", "border", "border-strong",
    "input", "ring", "signal-text", "radius", "font-brand-text", "font-brand-display",
]
# (Text, Fläche, Mindestkontrast[, nur Hinweis]) – 4.5 für Text, 3.0 für Fokus und Indikatoren ohne Text.
# primary auf background ist nur ein Hinweis: Schaltflächen tragen Text; als Rahmen, Fokus oder Schrift
# dann --ring bzw. --signal-text verwenden.
PAIRS = [
    ("foreground", "background", 4.5), ("card-foreground", "card", 4.5),
    ("popover-foreground", "popover", 4.5), ("primary-foreground", "primary", 4.5),
    ("secondary-foreground", "secondary", 4.5), ("muted-foreground", "background", 4.5),
    ("muted-foreground", "card", 4.5), ("accent-foreground", "accent", 4.5),
    ("primary", "background", 3.0, True), ("ring", "background", 3.0),
    ("signal-text", "background", 4.5), ("signal-text", "card", 4.5),
]


def blocks(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    found = {"dark": {}, "light": {}}
    for selector, body in re.findall(r"([^{}]+)\{([^{}]*)\}", css):
        sel = " ".join(selector.split())
        if "@" in sel or "supports" in sel:
            continue
        theme = "light" if 'data-theme="light"' in sel else "dark" if sel in (":root", "html") else None
        if theme is None:
            continue
        for name, value in re.findall(r"--([\w-]+)\s*:\s*([^;]+);", body):
            found[theme][name] = " ".join(value.split())
    return found


def resolve(tokens, value, depth=0):
    match = re.fullmatch(r"var\(--([\w-]+)\)", value.strip())
    if match and depth < 10:
        return resolve(tokens, tokens.get(match.group(1), ""), depth + 1)
    return value


def to_rgb(value):
    """oklch(L C H) oder #rrggbb → lineares sRGB; None bei Transparenz oder unbekanntem Format."""
    value = value.strip()
    hexa = re.fullmatch(r"#([0-9a-fA-F]{6})", value)
    if hexa:
        rgb = [int(hexa.group(1)[i:i + 2], 16) / 255 for i in (0, 2, 4)]
        return [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
    m = re.fullmatch(r"oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*(?:/\s*([\d.]+)(%?))?\s*\)", value)
    if not m:
        return None
    if m.group(5) is not None:
        alpha = float(m.group(5)) / (100 if m.group(6) else 1)
        if alpha < 0.999:
            return None
    lightness = float(m.group(1)) / (100 if m.group(2) else 1)
    chroma, hue = float(m.group(3)), math.radians(float(m.group(4)))
    a, b = chroma * math.cos(hue), chroma * math.sin(hue)
    l_ = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m_ = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s_ = (lightness - 0.0894841775 * a - 1.2914855480 * b) ** 3
    rgb = [
        4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
        -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
        -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_,
    ]
    return [min(1.0, max(0.0, c)) for c in rgb]


def contrast(fg, bg):
    lum = lambda rgb: 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
    hi, lo = sorted((lum(fg), lum(bg)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)


def main(paths):
    merged = {"dark": {}, "light": {}}
    for path in paths:
        with open(path, encoding="utf-8") as handle:
            part = blocks(handle.read())
        merged["dark"].update(part["dark"])
        merged["light"].update(part["light"])
    failures = 0
    missing = [name for name in REQUIRED if name not in merged["dark"]]
    for name in missing:
        print(f"FEHLT   --{name}")
        failures += 1
    for theme in ("dark", "light"):
        tokens = dict(merged["dark"])
        if theme == "light":
            if not merged["light"]:
                print("HINWEIS keine helle Ansicht definiert – nur zulässig, wenn das Projekt sie bewusst nicht anbietet")
                continue
            tokens.update(merged["light"])
        for fg_name, bg_name, minimum, *soft in PAIRS:
            fg = to_rgb(resolve(tokens, tokens.get(fg_name, "")))
            bg = to_rgb(resolve(tokens, tokens.get(bg_name, "")))
            if fg is None or bg is None:
                print(f"PRÜFEN  {theme:5} {fg_name} auf {bg_name}: nicht berechenbar (Transparenz/Format) – im Browser messen")
                continue
            ratio = contrast(fg, bg)
            ok = ratio >= minimum
            label = "OK     " if ok else ("HINWEIS" if soft else "ZU NIEDRIG")
            failures += 0 if ok or soft else 1
            print(f"{label} {theme:5} {fg_name} auf {bg_name}: {ratio:.2f} (min. {minimum})")
    print("Ergebnis:", "bestanden" if failures == 0 else f"{failures} Mängel")
    return 1 if failures else 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1:]))
