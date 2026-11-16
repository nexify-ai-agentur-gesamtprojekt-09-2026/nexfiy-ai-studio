export type InstallDevice = "ios" | "android" | "desktop";

export interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function installDevice(userAgent: string, maxTouchPoints = 0): InstallDevice {
  if (/iPad|iPhone|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && maxTouchPoints > 1)) return "ios";
  return /Android/i.test(userAgent) ? "android" : "desktop";
}

export function isAppInstalled(standaloneDisplay: boolean, iosStandalone?: boolean): boolean {
  return standaloneDisplay || iosStandalone === true;
}

/** A browser prompt is single-use, even when the visitor declines it. */
export async function consumeInstallPrompt(event: InstallPromptEvent): Promise<"accepted" | "dismissed"> {
  await event.prompt();
  return (await event.userChoice).outcome;
}