import { describe, expect, it } from "vitest";
import { validateAuthInput } from "./auth-form-validation";
describe("auth field validation", () => {
  it("marks only the malformed email", () => { expect(Object.keys(validateAuthInput("login","wrong","existing"))).toEqual(["email"]); });
  it("requires eight characters for a new password but not login", () => { expect(validateAuthInput("signup","person@example.test","1234567").password).toBeDefined(); expect(validateAuthInput("signup","person@example.test","12345678")).toEqual({}); expect(validateAuthInput("login","person@example.test","1")).toEqual({}); });
  it("does not validate unused fields", () => { expect(validateAuthInput("forgot","person@example.test","")).toEqual({}); expect(validateAuthInput("reset","","12345678")).toEqual({}); });
});