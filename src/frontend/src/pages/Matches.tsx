import { MatchStatus } from "@/backend";
import { AppHeader } from "@/components/AppHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { MatchCard } from "@/components/cards/MatchCard";
import { Button } from "@/components/ui/button";
import { useCompetitions, useMatches } from "@/hooks/useFootballData";
import { formatDateTime, matchStatusLabel } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  CalendarX2,
  SlidersHorizontal,
} from "lucide-react";

interface StatusFilter {
  value: MatchStatus | null;
  label: string;
}

type SortOrder = "date-asc" | "date-desc";

interface SortOption {
  value: SortOrder;
  label: string;
}

const STATUS_FILTERS: StatusFilter[] = [
  { value: null, label: "Tous" },
  { value: MatchStatus.upcoming, label: "À venir" },
  { value: MatchStatus.live, label: "En direct" },
  { value: MatchStatus.finished, label: "Terminés" },
];

const SORT_OPTIONS: SortOption[] = [
  { value: "date-asc", label: "Date croissante" },
  { value: "date-desc", label: "Date décroissante" },
];

const DEFAULT_SORT: SortOrder = "date-asc";

/** Match list with competition and status filters persisted in the URL. */
export function Matches() {
  const search = useSearch({ from: "/matchs" });
  const navigate = useNavigate({ from: "/matchs" });

  const competition = search.competition ?? null;
  const status = (search.status as MatchStatus | undefined) ?? null;
  const sort = (search.sort as SortOrder | undefined) ?? DEFAULT_SORT;

  const matchesQuery = useMatches(competition, status);
  const competitionsQuery = useCompetitions();

  const competitions = competitionsQuery.data ?? [];
  const matches = matchesQuery.data ?? [];

  const sortedMatches = [...matches].sort((a, b) => {
    const aTime = Number(a.kickoff);
    const bTime = Number(b.kickoff);
    return sort === "date-asc" ? aTime - bTime : bTime - aTime;
  });

  function setCompetition(next: string | null) {
    void navigate({
      search: (prev) => ({ ...prev, competition: next ?? undefined }),
      replace: true,
    });
  }

  function setStatus(next: MatchStatus | null) {
    void navigate({
      search: (prev) => ({ ...prev, status: next ?? undefined }),
      replace: true,
    });
  }

  function setSort(next: SortOrder) {
    void navigate({
      search: (prev) => ({ ...prev, sort: next }),
      replace: true,
    });
  }

  function resetFilters() {
    void navigate({ search: {}, replace: true });
  }

  const hasActiveFilters =
    competition !== null || status !== null || sort !== DEFAULT_SORT;

  return (
    <div className="animate-fade-in-up">
      <AppHeader title="Matchs" />

      <div className="space-y-4 px-4 pt-4">
        <section aria-label="Filtres" className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Filtres
            </span>
          </div>

          <fieldset className="scroll-x-snap -mx-4 flex min-w-0 gap-2 border-0 px-4 pb-1">
            <legend className="sr-only">Filtrer par statut</legend>
            {STATUS_FILTERS.map((filter) => {
              const active = status === filter.value;
              return (
                <button
                  key={filter.label}
                  type="button"
                  data-ocid={`matches.status_filter.${filter.value ?? "all"}`}
                  aria-pressed={active}
                  onClick={() => setStatus(filter.value)}
                  className={cn(
                    "snap-item shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </fieldset>

          {competitions.length > 0 ? (
            <fieldset className="scroll-x-snap -mx-4 flex min-w-0 gap-2 border-0 px-4 pb-1">
              <legend className="sr-only">Filtrer par compétition</legend>
              <button
                type="button"
                data-ocid="matches.competition_filter.all"
                aria-pressed={competition === null}
                onClick={() => setCompetition(null)}
                className={cn(
                  "snap-item shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  competition === null
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
              >
                Toutes
              </button>
              {competitions.map((name) => {
                const active = competition === name;
                return (
                  <button
                    key={name}
                    type="button"
                    data-ocid={`matches.competition_filter.${name}`}
                    aria-pressed={active}
                    onClick={() => setCompetition(name)}
                    className={cn(
                      "snap-item shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground",
                    )}
                  >
                    {name}
                  </button>
                );
              })}
            </fieldset>
          ) : null}

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Trier par
            </span>
            <fieldset
              aria-label="Trier par date de coup d'envoi"
              className="flex items-center gap-1 rounded-full border border-border bg-card p-0.5"
            >
              {SORT_OPTIONS.map((option) => {
                const active = sort === option.value;
                const Icon =
                  option.value === "date-asc"
                    ? ArrowUpWideNarrow
                    : ArrowDownWideNarrow;
                return (
                  <button
                    key={option.value}
                    type="button"
                    data-ocid={`matches.sort.${option.value}`}
                    aria-pressed={active}
                    onClick={() => setSort(option.value)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                    {option.label}
                  </button>
                );
              })}
            </fieldset>
          </div>

          {hasActiveFilters ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              data-ocid="matches.reset_filters_button"
              onClick={resetFilters}
              className="text-muted-foreground"
            >
              Réinitialiser les filtres
            </Button>
          ) : null}
        </section>

        <section aria-label="Liste des matchs" className="space-y-3">
          {matchesQuery.isLoading ? (
            <LoadingState rows={5} />
          ) : matchesQuery.isError ? (
            <ErrorState onRetry={() => void matchesQuery.refetch()} />
          ) : matches.length === 0 ? (
            <EmptyState
              icon={<CalendarX2 className="size-6" aria-hidden="true" />}
              title="Aucun match trouvé"
              description="Aucune rencontre ne correspond à ces filtres pour le moment."
              action={
                hasActiveFilters ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    data-ocid="matches.empty_reset_button"
                    onClick={resetFilters}
                  >
                    Voir tous les matchs
                  </Button>
                ) : undefined
              }
            />
          ) : (
            <ul className="space-y-3">
              {sortedMatches.map((match, index) => (
                <li key={match.id.toString()}>
                  <MatchCard
                    id={match.id}
                    homeTeam={match.homeTeam}
                    awayTeam={match.awayTeam}
                    homeScore={match.homeScore}
                    awayScore={match.awayScore}
                    status={match.status}
                    competition={match.competition}
                    kickoffLabel={formatDateTime(match.kickoff)}
                    statusLabel={matchStatusLabel(match.status)}
                    index={index + 1}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
