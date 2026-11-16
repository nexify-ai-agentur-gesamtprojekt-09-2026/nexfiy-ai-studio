/** Spoken text of a brand film as timed cues; captions and transcript derive from the same cues. */
export interface FilmCue {
  /** Seconds from the start of the film. */
  start: number;
  end: number;
  text: string;
}

export function formatVttTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0)
    throw new Error(`Ungültige Untertitelzeit: ${seconds}`);
  const totalMs = Math.round(seconds * 1000);
  const ms = totalMs % 1000;
  const totalSeconds = (totalMs - ms) / 1000;
  const s = totalSeconds % 60;
  const m = Math.floor(totalSeconds / 60) % 60;
  const h = Math.floor(totalSeconds / 3600);
  const pad = (value: number, size = 2) => String(value).padStart(size, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
}

/** Fails loudly on cues that a player would show out of order, overlapping or empty. */
export function assertValidCues(cues: readonly FilmCue[], duration: number): void {
  if (cues.length === 0)
    throw new Error("Ein Film mit Sprache braucht mindestens einen Untertitel.");
  cues.forEach((cue, index) => {
    if (!cue.text.trim()) throw new Error(`Untertitel ${index + 1} ist leer.`);
    if (cue.end <= cue.start)
      throw new Error(`Untertitel ${index + 1} endet nicht nach seinem Beginn.`);
    if (cue.end > duration) throw new Error(`Untertitel ${index + 1} endet nach dem Film.`);
    const previous = cues[index - 1];
    if (previous && cue.start < previous.end)
      throw new Error(`Untertitel ${index + 1} überschneidet den vorherigen.`);
  });
}

export function toWebVtt(cues: readonly FilmCue[]): string {
  const blocks = cues.map(
    (cue, index) =>
      `${index + 1}\n${formatVttTime(cue.start)} --> ${formatVttTime(cue.end)}\n${cue.text}`,
  );
  return `WEBVTT\n\n${blocks.join("\n\n")}\n`;
}

/** Reading version of the captions for the "Gesprochener Text" disclosure. */
export function filmTranscript(cues: readonly FilmCue[]): string {
  return cues.map((cue) => cue.text.trim()).join(" ");
}

export function filmCaptionsPath(film: string): string {
  return `/site-assets/captions/${film}.vtt`;
}
