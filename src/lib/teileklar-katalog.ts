const ANBIETER = "https://teileklar.shop";
export const SEITENGROESSE = 24;
const MAX_SEITE = 500;

export interface KatalogSuche {
  q: string;
  seite: number;
}

export interface KatalogArtikel {
  id: string;
  name: string;
  sku: string;
  preis: number | null;
  bild?: string;
}

export type KatalogErgebnis =
  { status: "bereit"; gesamt: number; artikel: KatalogArtikel[] } | { status: "nicht-verfuegbar" };

export function katalogSuche(eingabe: Record<string, unknown>): KatalogSuche {
  const q = typeof eingabe["q"] === "string" ? eingabe["q"].trim().slice(0, 120) : "";
  const roh = eingabe["seite"];
  const seite =
    typeof roh === "number" || (typeof roh === "string" && /^\d+$/.test(roh)) ? Number(roh) : 1;
  return { q, seite: Number.isSafeInteger(seite) && seite > 0 ? Math.min(seite, MAX_SEITE) : 1 };
}

function istObjekt(wert: unknown): wert is Record<string, unknown> {
  return typeof wert === "object" && wert !== null && !Array.isArray(wert);
}

function artikelAus(wert: unknown): KatalogArtikel | null {
  if (
    !istObjekt(wert) ||
    typeof wert["id"] !== "string" ||
    !wert["id"].trim() ||
    typeof wert["name"] !== "string" ||
    !wert["name"].trim()
  )
    return null;
  const roh = typeof wert["price"] === "string" ? wert["price"].trim() : "";
  const preis = /^\d{1,7}(?:[.,]\d{1,2})?\s*€?$/.test(roh)
    ? Number(roh.replace(/\s*€$/, "").replace(",", "."))
    : null;
  const art: KatalogArtikel = {
    id: wert["id"].trim().slice(0, 100),
    name: wert["name"].trim().slice(0, 300),
    sku: typeof wert["sku"] === "string" ? wert["sku"].trim().slice(0, 100) : "",
    preis,
  };
  if (
    typeof wert["image"] === "string" &&
    wert["image"].length <= 1024 &&
    wert["image"].startsWith("/api/shop/image?")
  ) {
    const bild = new URL(wert["image"], ANBIETER);
    const quelle = URL.canParse(bild.searchParams.get("src") ?? "")
      ? new URL(bild.searchParams.get("src")!)
      : null;
    if (
      bild.origin === ANBIETER &&
      quelle?.origin === "https://cdnbigbuy.com" &&
      quelle.pathname.startsWith("/images/")
    )
      art.bild = bild.href;
  }
  return art;
}

export async function ladeKatalog(
  eingabe: KatalogSuche,
  abruf: typeof fetch = fetch,
): Promise<KatalogErgebnis> {
  const suche = katalogSuche({ ...eingabe });
  const url = new URL("/api/shop/products", ANBIETER);
  url.searchParams.set("limit", String(SEITENGROESSE));
  const offset = (suche.seite - 1) * SEITENGROESSE;
  url.searchParams.set("offset", String(offset));
  if (suche.q) url.searchParams.set("q", suche.q);
  try {
    const response = await abruf(url, {
      headers: { accept: "application/json" },
      redirect: "manual",
      signal: AbortSignal.timeout(4500),
    });
    if (!response.ok) return { status: "nicht-verfuegbar" };
    const data: unknown = await response.json();
    if (
      !istObjekt(data) ||
      typeof data["total"] !== "number" ||
      !Number.isSafeInteger(data["total"]) ||
      data["total"] < 0 ||
      !Array.isArray(data["items"]) ||
      data["items"].length > SEITENGROESSE ||
      data["items"].length > Math.max(0, data["total"] - offset)
    )
      return { status: "nicht-verfuegbar" };
    const artikel = data["items"]
      .map(artikelAus)
      .filter((item): item is KatalogArtikel => item !== null);
    if (data["items"].length !== artikel.length || (!artikel.length && data["total"] > offset))
      return { status: "nicht-verfuegbar" };
    return { status: "bereit", gesamt: data["total"], artikel };
  } catch {
    return { status: "nicht-verfuegbar" };
  }
}
