import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { isRequestedModel, PUBLIC_AI_TIMEOUT_MS } from "./ai-model-guard";
import {
  buildOracleInstructions,
  oracleAnswerSchema,
  oracleEntryLinks,
  oracleInputSchema,
  type OracleAnswer,
} from "./oracle-products";

/** Projektvorgabe: exakt dieses Modell; der NeXify-Router meldet es so zurück. */
const ORACLE_MODEL = "deepseek/deepseek-v4.1-flash-1017";
/** Kennung desselben Modells im NeXify-9router (Weg über OpenRouter). */
const ROUTER_MODEL_ID = "openrouter/deepseek-v4.1-flash-1017";
const ROUTER_GATEWAY_URL = "https://connector-gateway.lovable.dev/udc_nexify_9router";
const UNAVAILABLE =
  "Die KI-Beratung ist gerade nicht erreichbar. Ihre Eingabe bleibt erhalten; Sie können die Produktseiten direkt ansehen.";

export type OracleResult =
  | { ok: true; advice: OracleAnswer; links: ReturnType<typeof oracleEntryLinks> }
  | { ok: false; error: string };

/** Public, bounded advisory RPC; has no account/database/MCP access. */
export const adviseOracle = createServerFn({ method: "POST" })
  .validator((input: unknown) => oracleInputSchema.parse(input))
  .handler(async ({ data }): Promise<OracleResult> => {
    setResponseHeader("Cache-Control", "no-store");
    const lovableKey = process.env.LOVABLE_API_KEY;
    const routerKey = process.env.UDC_NEXIFY_9ROUTER_API_KEY;
    if (!lovableKey || !routerKey) {
      console.error("ORACLE router credentials missing");
      return { ok: false, error: UNAVAILABLE };
    }
    try {
      const response = await fetch(`${ROUTER_GATEWAY_URL}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": routerKey,
        },
        body: JSON.stringify({
          model: ROUTER_MODEL_ID,
          stream: false,
          reasoning: { effort: "high" },
          max_tokens: 6000,
          messages: [
            { role: "system", content: buildOracleInstructions() },
            ...data.messages.map(({ role, content }) => ({ role, content })),
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
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
        }),
        signal: AbortSignal.timeout(PUBLIC_AI_TIMEOUT_MS),
      });
      if (!response.ok) {
        console.error("ORACLE router failure", { status: response.status, body: (await response.text()).slice(0, 500) });
        if (response.status === 402)
          return {
            ok: false,
            error:
              "Die KI-Beratung ist wegen ihres Nutzungsbudgets vorübergehend nicht verfügbar. Die Produktseiten bleiben erreichbar.",
          };
        if (response.status === 429)
          return {
            ok: false,
            error: "ORACLE ist gerade stark ausgelastet. Bitte warten Sie vor einem weiteren Versuch.",
          };
        return { ok: false, error: UNAVAILABLE };
      }
      const body = (await response.json()) as {
        model?: unknown;
        choices?: { finish_reason?: string; message?: { content?: string | null; refusal?: string | null } }[];
      };
      const choice = body.choices?.[0];
      if (choice?.message?.refusal) {
        return {
          ok: false,
          error:
            "Diese Anfrage kann ORACLE nicht beantworten. Beschreiben Sie bitte Ihr Vorhaben mit Suite oder API.",
        };
      }
      if (choice?.finish_reason !== "stop" || !choice.message?.content) {
        return {
          ok: false,
          error: "Die Beratung konnte nicht abgeschlossen werden. Ihre Eingabe bleibt erhalten.",
        };
      }
      if (!isRequestedModel(ORACLE_MODEL, body.model)) {
        console.error("ORACLE model mismatch", { requested: ORACLE_MODEL, reported: body.model });
        return {
          ok: false,
          error:
            "Die Beratung konnte nicht geprüft abgeschlossen werden. Ihre Eingabe bleibt erhalten.",
        };
      }
      const advice = oracleAnswerSchema.parse(JSON.parse(choice.message.content));
      return { ok: true, advice, links: oracleEntryLinks(advice.recommendation) };
    } catch {
      console.error("ORACLE response could not be processed");
      return { ok: false, error: UNAVAILABLE };
    }
  });
        return {
          ok: false,
          error:
            "Die Beratung konnte nicht geprüft abgeschlossen werden. Ihre Eingabe bleibt erhalten.",
        };
      }
      const text = parts
        .flatMap((part) => (part.type === "output_text" ? [part.text] : []))
        .join("");
      const advice = oracleAnswerSchema.parse(JSON.parse(text));
      return { ok: true, advice, links: oracleEntryLinks(advice.recommendation) };
    } catch (error) {
      if (error instanceof GatewayError) {
        console.error("ORACLE Gateway failure", {
          code: error.code,
          outcome: error.outcome,
          ids: error.ids,
          remote: error.remote,
        });
        if (error.code === "payment_required")
          return {
            ok: false,
            error:
              "Die KI-Beratung ist wegen ihres Nutzungsbudgets vorübergehend nicht verfügbar. Die Produktseiten bleiben erreichbar.",
          };
        if (error.code === "rate_limited")
          return {
            ok: false,
            error:
              "ORACLE ist gerade stark ausgelastet. Bitte warten Sie vor einem weiteren Versuch.",
          };
      } else console.error("ORACLE response could not be processed");
      return {
        ok: false,
        error:
          "Die KI-Beratung ist gerade nicht erreichbar. Ihre Eingabe bleibt erhalten; Sie können die Produktseiten direkt ansehen.",
      };
    }
  });
