/** Automatic playback is limited to one hero, and respects motion preferences. */
export function mayAutoplayFilm(isHero: boolean, reducedMotion: boolean) {
  return isHero && !reducedMotion;
}

export function normalizeVolume(value: number) {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}