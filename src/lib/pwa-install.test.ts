import { describe, expect, it, vi } from "vitest";
import {
  consumeInstallPrompt,
  installDevice,
  isAppInstalled,
  type InstallPromptEvent,
} from "./pwa-install";

describe("device-specific app installation", () => {
  it("offers the iPhone and iPad home-screen path, including desktop-mode iPad", () => {
    expect(installDevice("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)")).toBe("ios");
    expect(installDevice("Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)")).toBe("ios");
    expect(installDevice("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)", 5)).toBe("ios");
  });
  it("distinguishes Android phones/tablets from desktop browsers", () => {
    expect(installDevice("Mozilla/5.0 (Linux; Android 15; Pixel 9)")).toBe("android");
    expect(installDevice("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")).toBe("desktop");
    expect(installDevice("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)", 0)).toBe("desktop");
  });
  it("does not offer installation inside an already installed app", () => {
    expect(isAppInstalled(true)).toBe(true);
    expect(isAppInstalled(false, true)).toBe(true);
    expect(isAppInstalled(false, false)).toBe(false);
  });
  it("actually invokes the browser prompt and returns an accepted choice", async () => {
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = Object.assign(new Event("beforeinstallprompt"), {
      prompt,
      userChoice: Promise.resolve({ outcome: "accepted" as const, platform: "web" }),
    });
    expect(await consumeInstallPrompt(event as InstallPromptEvent)).toBe("accepted");
    expect(prompt).toHaveBeenCalledTimes(1);
  });
  it("does not treat declining the browser prompt as an installation", async () => {
    const event = Object.assign(new Event("beforeinstallprompt"), {
      prompt: vi.fn().mockResolvedValue(undefined),
      userChoice: Promise.resolve({ outcome: "dismissed" as const, platform: "web" }),
    });
    expect(await consumeInstallPrompt(event as InstallPromptEvent)).toBe("dismissed");
  });
});
