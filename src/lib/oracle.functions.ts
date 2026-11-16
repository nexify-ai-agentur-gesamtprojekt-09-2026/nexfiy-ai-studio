import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { buildOracleInstructions, oracleAnswerSchema, oracleEntryLinks, oracleInputSchema, type OracleAnswer } from "./oracle-products";

export type OracleResult =
  | { ok: true; advice: OracleAnswer; links: ReturnType<typeof oracleEntryLinks> }
  | { ok: false; error: string };

/** Public, bounded advisory RPC; has no account/database/MCP access. */
export const adviseOracle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => oracleInputSchema.parse(input))
  .handler(async ({ data }): Promise<OracleResult> => {
    setResponseHeader("Cache-Control", "no-store");
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    try {
      const response = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: buildOracleInstructions(),
        input: data.messages.map(({ role, content }) => ({ role, content })),
        reasoning: { effort: "low" },
        max_output_tokens: 1800,
        text: {
          format: {
            type: "json_schema",
            name: "oracle_product_advice",
            strict: true,
            schema: {
              type: "object",
              properties: {
                answer: { type: "string" },
                recommendation: { type: "string", enum: ["suite", "api", "both", "clarify"] },
              },
              required: ["answer", "recommendation"],
              additionalProperties: false,
            },
          },
        },
      });
      const parts = response.output.flatMap((item) => item.type === "message" ? item.content : []);
      if (parts.some((part) => part.type === "refusal")) {
        return { ok: false, error: "Diese Anfrage kann ORACLE nicht beantworten. Beschreiben Sie bitte Ihr Vorhaben mit Suite oder API." };
      }
      if (response.status !== "completed") {
        return { ok: false, error: "Die Beratung konnte nicht abgeschlossen werden. Ihre Eingabe bleibt erhalten." };
      }
      const text = parts.flatMap((part) => part.type === "output_text" ? [part.text] : []).join("");
      const advice = oracleAnswerSchema.parse(JSON.parse(text));
      return { ok: true, advice, links: oracleEntryLinks(advice.recommendation) };
    } catch (error) {
      if (error instanceof GatewayError) {
        console.error("ORACLE Gateway failure", { code: error.code, outcome: error.outcome, ids: error.ids, remote: error.remote });
        if (error.code === "payment_required") return { ok: false, error: "Die KI-Beratung ist wegen ihres Nutzungsbudgets vorübergehend nicht verfügbar. Die Produktseiten bleiben erreichbar." };
        if (error.code === "rate_limited") return { ok: false, error: "ORACLE ist gerade stark ausgelastet. Bitte warten Sie vor einem weiteren Versuch." };
      } else console.error("ORACLE response could not be processed");
      return { ok: false, error: "Die KI-Beratung ist gerade nicht erreichbar. Ihre Eingabe bleibt erhalten; Sie können die Produktseiten direkt ansehen." };
    }
  });