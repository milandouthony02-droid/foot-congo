import type { MatchStatus } from "@/backend";

/** Motoko `Time.now()` values are nanosecond bigints. */
export function timestampToDate(timestamp: bigint): Date | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  return Number.isNaN(date.getTime()) ? null : date;
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  return date ? dateFormatter.format(date) : "Date inconnue";
}

export function formatDateTime(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  return date ? dateTimeFormatter.format(date) : "Date inconnue";
}

export function formatTime(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  return date ? timeFormatter.format(date) : "--:--";
}

/** Relative label for news feeds: "il y a 3 h", "hier", "12 mars 2026". */
export function formatRelative(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  if (!date) return "Date inconnue";
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.round(diffMs / 60_000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  if (days === 1) return "hier";
  if (days < 7) return `il y a ${days} j`;
  return dateFormatter.format(date);
}

export const MATCH_STATUS_LABELS: Record<MatchStatus, string> = {
  upcoming: "À venir",
  live: "En direct",
  finished: "Terminé",
};

export function matchStatusLabel(status: MatchStatus): string {
  return MATCH_STATUS_LABELS[status] ?? "Match";
}

/** "2 - 1" when both scores are known, otherwise "vs". */
export function formatScore(
  homeScore?: bigint,
  awayScore?: bigint,
): string | null {
  if (homeScore === undefined || awayScore === undefined) return null;
  return `${homeScore.toString()} - ${awayScore.toString()}`;
}

export function formatMinute(minute: bigint): string {
  return `${minute.toString()}'`;
}

/** Initials for avatar fallbacks: "Jean Mukendi" -> "JM". */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
