import { describe, expect, it } from "vitest";
import { heroFilmSofortStarten } from "./hero-film";

describe("heroFilmSofortStarten", () => {
  it("startet im ungebremsten Fall", () => {
    expect(heroFilmSofortStarten({ reduzierteBewegung: false })).toBe(true);
    expect(heroFilmSofortStarten({ reduzierteBewegung: false, netztyp: "4g" })).toBe(true);
  });

  it("hält sich bei reduzierter Bewegung zurück", () => {
    expect(heroFilmSofortStarten({ reduzierteBewegung: true })).toBe(false);
  });

  it("hält sich im Datensparmodus und in langsamen Netzen zurück", () => {
    expect(heroFilmSofortStarten({ reduzierteBewegung: false, datensparmodus: true })).toBe(false);
    for (const netz of ["slow-2g", "2g", "3g"])
      expect(heroFilmSofortStarten({ reduzierteBewegung: false, netztyp: netz })).toBe(false);
  });
});
