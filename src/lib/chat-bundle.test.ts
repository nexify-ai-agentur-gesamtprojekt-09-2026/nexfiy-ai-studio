// @vitest-environment node
/**
 * Die Systemvorgabe des Chats und ihre Kennung dürfen den Browser nie erreichen (Review M1).
 * Geprüft werden die Importe der Browserdateien und – sobald gebaut wurde – das Build-Ergebnis.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CHAT_KANARIENWERT, CHAT_SYSTEMPROMPT } from "@/lib/chat-wissen.server";

const NUR_SERVER = /chat-wissen|chat-api|chat-leitplanken/;
const BROWSERDATEIEN = [
  "src/components/chat/ChatDock.tsx",
  "src/components/chat/ChatText.tsx",
  "src/components/site/NexifyShell.tsx",
  "src/lib/chat-client.ts",
  "src/lib/chat-dock.ts",
  "src/lib/chat-seiten.ts",
];

function dateien(ordner: string): string[] {
  return readdirSync(ordner).flatMap((name) => {
    const pfad = join(ordner, name);
    return statSync(pfad).isDirectory() ? dateien(pfad) : [pfad];
  });
}

/** Sätze aus dem Regelwerk, die in keinem Seitentext vorkommen. */
const REGELSAETZE = CHAT_SYSTEMPROMPT.split("\n")
  .filter((zeile) => /^\d+\. /.test(zeile))
  .map((zeile) => zeile.replace(/^\d+\. /, "").slice(0, 60));

describe("Chat: Systemvorgabe bleibt auf dem Server", () => {
  it("hat genug Regelsätze zum Suchen", () => {
    expect(REGELSAETZE.length).toBeGreaterThan(8);
    expect(CHAT_KANARIENWERT.length).toBeGreaterThan(10);
  });

  it.each(BROWSERDATEIEN)("%s importiert kein Servermodul des Chats", (pfad) => {
    const importe = [...readFileSync(pfad, "utf8").matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]);
    expect(importe.filter((ziel) => NUR_SERVER.test(ziel ?? ""))).toEqual([]);
  });

  const OEFFENTLICH = ".output/public";
  const gebaut = existsSync(OEFFENTLICH);

  it.skipIf(!gebaut)(
    "Build-Ergebnis .output/public enthält weder Kennung noch Regeltext (nach `npm run build`)",
    () => {
      const texte = dateien(OEFFENTLICH).filter((pfad) =>
        /\.(js|mjs|css|html|json|map|txt)$/.test(pfad),
      );
      expect(texte.length).toBeGreaterThan(10);
      const treffer: string[] = [];
      for (const pfad of texte) {
        const inhalt = readFileSync(pfad, "utf8");
        if (inhalt.includes(CHAT_KANARIENWERT)) treffer.push(`${pfad}: Kennung`);
        for (const satz of REGELSAETZE) if (inhalt.includes(satz)) treffer.push(`${pfad}: ${satz}`);
      }
      expect(treffer).toEqual([]);
      // Gegenprobe: Im Serverteil steht die Kennung – die Suche findet sie also, wenn sie da ist.
      const server = dateien(".output/server").filter((pfad) => /\.(js|mjs)$/.test(pfad));
      expect(server.some((pfad) => readFileSync(pfad, "utf8").includes(CHAT_KANARIENWERT))).toBe(
        true,
      );
    },
  );
});
