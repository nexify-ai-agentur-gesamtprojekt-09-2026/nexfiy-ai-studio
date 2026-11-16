import { describe, expect, it } from "vitest";
import { isRequestedModel } from "./ai-model-guard";

describe("isRequestedModel", () => {
  it("akzeptiert die gemeldete Kennung mit oder ohne Anbieterpräfix", () => {
    expect(isRequestedModel("openai/gpt-6-astra", "gpt-6-astra")).toBe(true);
    expect(isRequestedModel("openai/gpt-6-astra", "openai/gpt-6-astra")).toBe(true);
  });
  it("verwirft ein anderes oder fehlendes Antwortmodell", () => {
    expect(isRequestedModel("openai/gpt-6-astra", "gpt-6-luna")).toBe(false);
    expect(isRequestedModel("openai/gpt-6-astra", "gpt-6-astra-mini")).toBe(false);
    expect(isRequestedModel("openai/gpt-6-astra", undefined)).toBe(false);
    expect(isRequestedModel("openai/gpt-6-astra", "")).toBe(false);
  });
});
