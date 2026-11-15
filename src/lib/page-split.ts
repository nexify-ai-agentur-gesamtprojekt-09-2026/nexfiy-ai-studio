/** Pixel bounds preserve both a readable page and a usable composer. */
export function pageSplitSizes(viewport: number) {
  const max = Math.max(300, Math.min(720, viewport - 440, viewport * 0.55));
  const min = Math.min(320, max);
  return { min, max, preferred: Math.min(max, Math.max(min, Math.min(520, viewport * 0.3))) };
}