export interface TyreSize { width: number; aspect: number; rim: number }

export function tyreDiameter(size: TyreSize) {
  if (![size.width, size.aspect, size.rim].every((value) => Number.isFinite(value) && value > 0)) return null;
  return size.rim * 25.4 + 2 * size.width * size.aspect / 100;
}

/** Nominal geometry only; this calculation never grants road approval or fitment. */
export function compareTyres(current: TyreSize, planned: TyreSize) {
  const before = tyreDiameter(current);
  const after = tyreDiameter(planned);
  if (before === null || after === null) return null;
  const ratio = after / before;
  return { before, after, circumferenceBefore: before * Math.PI, circumferenceAfter: after * Math.PI, differencePercent: (ratio - 1) * 100, clearance: (after - before) / 2, speedAt100: 100 * ratio };
}