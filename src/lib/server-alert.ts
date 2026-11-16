import { z } from "zod";

/** Der Server darf ausschließlich Betriebsstatus ohne Anfrage- oder Kontoinhalte melden. */
export const serverAlertSchema = z
  .object({
    quelle: z.enum(["ueberwachung", "freistellung"]),
    stand: z.enum(["fehler", "wieder-ok", "bericht"]),
    detail: z.string().min(1).max(300),
  })
  .strict();
