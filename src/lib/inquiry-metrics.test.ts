import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import type { Database } from "@/integrations/supabase/types";
import { countInquiryWeek } from "./inquiry-metrics";

function countedClient(counts: (number | null)[]) {
  const filters: unknown[][] = [];
  const from = vi.fn(() => {
    const count = counts.shift() ?? null;
    const q = {
      select: vi.fn((...args: unknown[]) => { filters.push(args); return q; }),
      eq: vi.fn((...args: unknown[]) => { filters.push(args); return q; }),
      in: vi.fn((...args: unknown[]) => { filters.push(args); return q; }),
      gte: vi.fn((...args: unknown[]) => { filters.push(args); return q; }),
      lt: vi.fn((...args: unknown[]) => { filters.push(args); return Promise.resolve({ count, error: null }); }),
    };
    return q;
  });
  return { client: { from } as unknown as SupabaseClient<Database>, filters, from };
}

describe("NX-LEAD-01 exakte Wochenzahl", () => {
  it("zählt kind contact separat von TEILEKLAR und nicht nur 500 geladene Zeilen", async () => {
    const mock = countedClient([507, 3, 2]);
    const result = await countInquiryWeek(mock.client, new Date("2026-11-16T14:00:00Z"));
    expect(result).toEqual({ start: "2026-11-09T14:00:00.000Z", end: "2026-11-16T14:00:00.000Z", contact: 507, teileklar: 5 });
    expect(mock.filters).toContainEqual(["kind", "contact"]);
    expect(mock.filters.filter(row => row[0] === "id")).toEqual(Array(3).fill(["id", { count: "exact", head: true }]));
  });
  it("nutzt dieselben exakten halb offenen Zeitgrenzen für sieben Tage", async () => {
    const mock = countedClient([0, 0, 0]);
    await countInquiryWeek(mock.client, new Date("2026-11-16T14:00:00Z"));
    expect(mock.filters.filter(row => row[0] === "created_at")).toEqual(Array(3).fill([["created_at", "2026-11-09T14:00:00.000Z"], ["created_at", "2026-11-16T14:00:00.000Z"]]).flat());
  });
  it("meldet unbekannte Zählung statt falscher Null", async () => {
    const mock = countedClient([null, 2, 1]);
    await expect(countInquiryWeek(mock.client)).rejects.toThrow("nicht geladen");
  });
});