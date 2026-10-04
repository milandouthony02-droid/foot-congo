import type { MatchStatus } from "@/backend";
import { AppHeader } from "@/components/AppHeader";
import { EmptyState, ErrorState, PageLoading } from "@/components/States";
import { useMatch } from "@/hooks/useFootballData";
import {
  formatDateTime,
  formatMinute,
  formatScore,
  matchStatusLabel,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import { useParams } from "@tanstack/react-router";
import { CalendarDays, Goal, MapPin, Users } from "lucide-react";

const STATUS_STYLES: Record<MatchStatus, string> = {
  upcoming: "bg-accent/15 text-accent",
  live: "bg-destructive/15 text-destructive",
  finished: "bg-secondary text-secondary-foreground",
};

/** Full match detail: scoreline, scorers, lineups and summary. */
export function MatchDetail() {
  const { id } = useParams({ from: "/matchs/$id" });
  const matchId = BigInt(id);
  const matchQuery = useMatch(matchId);
  const match = matchQuery.data;

  if (matchQuery.isLoading) {
    return (
      <div>
        <AppHeader title="Match" backTo="/matchs" />
        <PageLoading />
      </div>
    );
  }

  if (matchQuery.isError) {
    return (
      <div>
        <AppHeader title="Match" backTo="/matchs" />
        <div className="px-4 pt-6">
          <ErrorState onRetry={() => void matchQuery.refetch()} />
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div>
        <AppHeader title="Match" backTo="/matchs" />
        <div className="px-4 pt-6">
          <EmptyState
            title="Match introuvable"
            description="Cette rencontre n'existe pas ou n'est plus disponible."
          />
        </div>
      </div>
    );
  }

  const score = formatScore(match.homeScore, match.awayScore);
  const hasScore = score !== null;

  return (
    <div className="animate-fade-in-up">
      <AppHeader title="Détail du match" backTo="/matchs" />

      <div className="space-y-6 px-4 pt-4">
        <section
          data-ocid="match.score_panel"
          className="overflow-hidden rounded-xl border border-border bg-card shadow-subtle"
        >
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
            <span className="flex min-w-0 items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{match.competition}</span>
            </span>
            <span
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-sm px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider",
                STATUS_STYLES[match.status],
              )}
            >
              {match.status === "live" ? (
                <span
                  className="size-1.5 animate-pulse-live rounded-full bg-destructive"
                  aria-hidden="true"
                />
              ) : null}
              {matchStatusLabel(match.status)}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-6">
            <p className="min-w-0 text-right font-display text-base font-bold leading-tight">
              {match.homeTeam}
            </p>
            <div className="flex flex-col items-center">
              {hasScore ? (
                <span className="tabular-score font-mono text-3xl font-bold leading-none">
                  {score}
                </span>
              ) : (
                <span className="font-display text-xl font-bold text-muted-foreground">
                  vs
                </span>
              )}
            </div>
            <p className="min-w-0 font-display text-base font-bold leading-tight">
              {match.awayTeam}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-border px-4 py-3 text-sm text-muted-foreground">
            <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
            <span>{formatDateTime(match.kickoff)}</span>
          </div>
        </section>

        <section aria-labelledby="scorers-heading" className="space-y-3">
          <h2
            id="scorers-heading"
            className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-muted-foreground"
          >
            <Goal className="size-4" aria-hidden="true" />
            Buteurs
          </h2>
          {match.scorers.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border bg-card/50 px-4 py-4 text-sm text-muted-foreground">
              Aucun buteur pour ce match.
            </p>
          ) : (
            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
              {match.scorers.map((scorer, index) => (
                <li
                  key={`${scorer.playerName}-${scorer.minute.toString()}-${index}`}
                  data-ocid={`match.scorer.${index + 1}`}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {scorer.playerName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {scorer.teamName}
                    </p>
                  </div>
                  <span className="tabular-score shrink-0 font-mono text-sm font-bold text-primary">
                    {formatMinute(scorer.minute)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="lineups-heading" className="space-y-3">
          <h2
            id="lineups-heading"
            className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-muted-foreground"
          >
            <Users className="size-4" aria-hidden="true" />
            Compositions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <LineupColumn
              team={match.homeTeam}
              players={match.lineup.home}
              ocid="match.lineup.home"
            />
            <LineupColumn
              team={match.awayTeam}
              players={match.lineup.away}
              ocid="match.lineup.away"
            />
          </div>
        </section>

        <section aria-labelledby="summary-heading" className="space-y-3">
          <h2
            id="summary-heading"
            className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground"
          >
            Résumé
          </h2>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
              {match.summary.trim().length > 0
                ? match.summary
                : "Aucun résumé disponible pour ce match."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

interface LineupColumnProps {
  team: string;
  players: string[];
  ocid: string;
}

function LineupColumn({ team, players, ocid }: LineupColumnProps) {
  const seen = new Map<string, number>();
  const rows = players.map((player) => {
    const occurrence = seen.get(player) ?? 0;
    seen.set(player, occurrence + 1);
    return { key: `${player}-${occurrence}`, player };
  });
  return (
    <div
      data-ocid={ocid}
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      <p className="truncate border-b border-border bg-muted/40 px-3 py-2 font-display text-xs font-bold uppercase tracking-wider">
        {team}
      </p>
      {rows.length === 0 ? (
        <p className="px-3 py-3 text-xs text-muted-foreground">
          Composition non disponible.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {rows.map((row, index) => (
            <li
              key={row.key}
              className="flex items-center gap-2 px-3 py-2 text-sm"
            >
              <span className="tabular-score w-5 shrink-0 font-mono text-xs text-muted-foreground">
                {index + 1}
              </span>
              <span className="min-w-0 truncate">{row.player}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
