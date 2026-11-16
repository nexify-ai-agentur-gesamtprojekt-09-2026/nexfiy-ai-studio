import { createServerFn } from "@tanstack/react-start";
import {
  CATALOG_PAGE_SIZE,
  normalizeCatalogQuery,
  normalizePage,
  type CatalogSpec,
} from "./teileklar-catalog";

export interface CatalogListItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price_value: number | null;
  image_path: string;
  image_alt: string;
  stock: number;
  delivery_note: string;
}
export interface CatalogProduct extends CatalogListItem {
  ean: string;
  oe_number: string;
  condition: string;
  specs: CatalogSpec[];
  status_label: string;
  synced_at: string;
}
export interface CatalogListResult {
  items: CatalogListItem[];
  total: number;
  page: number;
  pages: number;
  q: string;
  category: string;
}
export interface CatalogCategory {
  category: string;
  product_count: number;
}

const LIST_COLUMNS =
  "id, name, brand, category, price_value, image_path, image_alt, stock, delivery_note";

/** Öffentlicher Lesezugriff mit Publishable-Key; die Datenbank gibt nur aktive Katalogartikel frei. */
async function catalogClient() {
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Katalogzugang ist nicht konfiguriert.");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`)
          headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const listCatalogProducts = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
    return {
      q: normalizeCatalogQuery(raw["q"]),
      category: typeof raw["category"] === "string" ? raw["category"].slice(0, 120) : "",
      page: normalizePage(raw["page"]),
    };
  })
  .handler(async ({ data }): Promise<CatalogListResult> => {
    const client = await catalogClient();
    let query = client.from("teileklar_products").select(LIST_COLUMNS, { count: "exact" });
    if (data.category) query = query.eq("category", data.category);
    for (const term of data.q.split(" ").filter(Boolean).slice(0, 5)) {
      query = query.or(
        `name.ilike.%${term}%,brand.ilike.%${term}%,id.ilike.%${term}%,ean.ilike.%${term}%,oe_number.ilike.%${term}%`,
      );
    }
    const from = (data.page - 1) * CATALOG_PAGE_SIZE;
    const result = await query
      .order("has_image", { ascending: false })
      .order("name", { ascending: true })
      .order("id", { ascending: true })
      .range(from, from + CATALOG_PAGE_SIZE - 1);
    if (result.error && result.error.code !== "PGRST103")
      throw new Error(`Katalog nicht abrufbar: ${result.error.message}`);
    const total = result.count ?? 0;
    return {
      items: (result.data ?? []) as CatalogListItem[],
      total,
      page: data.page,
      pages: Math.max(1, Math.ceil(total / CATALOG_PAGE_SIZE)),
      q: data.q,
      category: data.category,
    };
  });

export const getCatalogProduct = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    const id =
      input && typeof input === "object" ? (input as Record<string, unknown>)["id"] : undefined;
    return { id: typeof id === "string" ? id.trim().slice(0, 80) : "" };
  })
  .handler(async ({ data }): Promise<CatalogProduct | null> => {
    if (!data.id) return null;
    const client = await catalogClient();
    const result = await client
      .from("teileklar_products")
      .select(`${LIST_COLUMNS}, ean, oe_number, condition, specs, status_label, synced_at`)
      .eq("id", data.id)
      .maybeSingle();
    if (result.error) throw new Error(`Artikel nicht abrufbar: ${result.error.message}`);
    if (!result.data) return null;
    return {
      ...result.data,
      specs: Array.isArray(result.data.specs)
        ? (result.data.specs as unknown as CatalogSpec[])
        : [],
    } as CatalogProduct;
  });

export const listCatalogCategories = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ categories: CatalogCategory[]; total: number; syncedAt: string | null }> => {
    const client = await catalogClient();
    const [categories, latest] = await Promise.all([
      client
        .from("teileklar_categories")
        .select("category, product_count")
        .order("product_count", { ascending: false }),
      client
        .from("teileklar_products")
        .select("synced_at")
        .order("synced_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);
    if (categories.error) throw new Error(`Kategorien nicht abrufbar: ${categories.error.message}`);
    if (latest.error) throw new Error(`Katalogstand nicht abrufbar: ${latest.error.message}`);
    const list = (categories.data ?? []).filter(
      (row): row is CatalogCategory =>
        typeof row.category === "string" && typeof row.product_count === "number",
    );
    return {
      categories: list,
      total: list.reduce((sum, row) => sum + row.product_count, 0),
      syncedAt: latest.data?.synced_at ?? null,
    };
  },
);
