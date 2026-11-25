import { describe, expect, it } from "vitest";
import { legacyWeiterleitungFuer, pfadNormalisierung, weiterleitungFuer } from "./server-routing";

describe("legacyWeiterleitungFuer", () => {
  it("leitet alte Wissens- und Staedteadressen dauerhaft auf die zustaendige Seite", () => {
    expect(legacyWeiterleitungFuer("/wissen/ki-fuer-handwerker")).toEqual({
      ziel: "/wissen",
      status: 301,
    });
    expect(legacyWeiterleitungFuer("/stadt/ki-agentur-heidelberg")).toEqual({
      ziel: "/regionen",
      status: 301,
    });
    expect(legacyWeiterleitungFuer("/wissen/ki-fuer-e-commerce/")).toEqual({
      ziel: "/wissen",
      status: 301,
    });
  });

  it("laesst echte Seiten und unbeteiligte Pfade in Ruhe", () => {
    expect(legacyWeiterleitungFuer("/wissen/projekt-vorbereiten")).toBeNull();
    expect(legacyWeiterleitungFuer("/wissen")).toBeNull();
    expect(legacyWeiterleitungFuer("/kontakt")).toBeNull();
  });

  it("greift unabhaengig von Gross- und Kleinschreibung", () => {
    expect(legacyWeiterleitungFuer("/WISSEN/KI-FUER-HANDWERKER")).toEqual({
      ziel: "/wissen",
      status: 301,
    });
  });

  it("veraendert die festen Weiterleitungen nicht", () => {
    expect(weiterleitungFuer("/preise")).toEqual({ ziel: "/preise-ablauf", status: 301 });
  });
});

describe("pfadNormalisierung", () => {
  it("führt Großschreibung und Schrägstrich am Ende auf eine Adresse", () => {
    expect(pfadNormalisierung("/LEISTUNGEN")).toEqual({ ziel: "/leistungen", status: 301 });
    expect(pfadNormalisierung("/Preise-Ablauf")).toEqual({ ziel: "/preise-ablauf", status: 301 });
    expect(pfadNormalisierung("/leistungen/")).toEqual({ ziel: "/leistungen", status: 301 });
    expect(pfadNormalisierung("/ki-beratung/")).toEqual({ ziel: "/ki-beratung", status: 301 });
  });

  it("lässt normale Adressen und die Wurzel in Ruhe", () => {
    expect(pfadNormalisierung("/leistungen")).toBeNull();
    expect(pfadNormalisierung("/")).toBeNull();
    expect(pfadNormalisierung("/ki-beratung")).toBeNull();
  });
});
