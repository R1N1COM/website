// The daily schedule shown in the hero. Times are the published schedule from the
// buyX and MMCC write-ups, not live telemetry.

export const CHECKS_PER_DAY = 288; // buyX health check every five minutes
export const RELEASE_HOURS = [8, 13, 18]; // MMCC YouTube releases
export const MORNING = [6, 9] as const; // rehearsal, page audit, lead summary

/** Hours since midnight in London, e.g. 12.5 for 12:30. */
export function londonHours(date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  return h + m / 60;
}

export function londonClock(date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
}

export function progressAt(hours: number) {
  return {
    checks: Math.min(CHECKS_PER_DAY, Math.floor((hours * 60) / 5) + 1),
    releases: RELEASE_HOURS.filter((h) => h <= hours).length,
  };
}
