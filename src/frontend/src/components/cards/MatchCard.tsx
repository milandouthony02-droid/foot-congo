import type { MatchStatus } from "@/backend";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

interface MatchCardProps {
  id: bigint;
  homeTeam: string;
  awayTeam: string;
  homeScore?: bigint;
  awayScore?: bigint;
  status: MatchStatus;
  competition: string;
  kickoffLabel: string;
  statusLabel: string;
  index?: number;
  className?: string;
}

const STATUS_STYLES: Record<MatchStatus, string> = {
  upcoming: "bg-muted text-muted-foreground",
  live: "bg-destructive/15 text-destructive",
  finished: "bg-secondary text-secondary-foreground",
};

/** Match fixture/result card linking to the match detail page. */
export function MatchCard({
  id,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  competition,
  kickoffLabel,
  statusLabel,
  index,
  className,
}: MatchCardProps) {
  const hasScore = homeScore !== undefined && awayScore !== undefined;
  return (
    <Link
      to="/matchs/$id"
      params={{ id: id.toString() }}
      data-ocid={index !== undefined ? `match.item.${index}` : "match.item"}
      className={cn(
        "block overflow-hidden rounded-xl border border-border bg-card p-4 shadow-subtle transition-smooth hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
          <MapPin className="size-3 shrink-0" aria-hidden="true" />
          <span className="truncate">{competition}</span>
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider",
            STATUS_STYLES[status],
          )}
        >
          {status === "live" ? (
            <span
              className="size-1.5 animate-pulse-live rounded-full bg-destructive"
              aria-hidden="true"
            />
          ) : null}
          {statusLabel}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="truncate text-sm font-semibold">{homeTeam}</p>
          <p className="truncate text-sm font-semibold">{awayTeam}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          {hasScore ? (
            <>
              <span className="tabular-score font-mono text-lg font-bold leading-none">
                {homeScore?.toString()}
              </span>
              <span className="tabular-score font-mono text-lg font-bold leading-none">
                {awayScore?.toString()}
              </span>
            </>
          ) : (
            <span className="font-display text-sm font-semibold text-muted-foreground">
              vs
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 border-t border-border pt-2 text-xs text-muted-foreground">
        {kickoffLabel}
      </p>
    </Link>
  );
}
