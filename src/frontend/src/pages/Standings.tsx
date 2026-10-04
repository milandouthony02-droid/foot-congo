import { AppHeader } from "@/components/AppHeader";
import { StandingsTable } from "@/components/StandingsTable";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { useCompetitions, useStanding } from "@/hooks/useFootballData";
import { cn } from "@/lib/utils";
import { ListOrdered } from "lucide-react";
import { useEffect, useState } from "react";

/** Number of leading positions highlighted as the title/championship zone. */
const TOP_ZONE = 3;
/** Number of trailing positions highlighted as the relegation zone. */
const RELEGATION_ZONE = 3;

export default function Standings() {
  const {
    data: competitions,
    isLoading: competitionsLoading,
    isError: competitionsError,
    refetch: refetchCompetitions,
  } = useCompetitions();

  const [selected, setSelected] = useState<string | null>(null);

  // Default to the first available competition once the list arrives.
  useEffect(() => {
    if (selected === null && competitions && competitions.length > 0) {
      setSelected(competitions[0]);
    }
  }, [competitions, selected]);

  const {
    data: standing,
    isLoading: standingLoading,
    isError: standingError,
    refetch: refetchStanding,
  } = useStanding(selected ?? "");

  const rows = standing?.rows ?? [];
  const relegationStart = Math.max(rows.length - RELEGATION_ZONE, 0);

  return (
    <div>
      <AppHeader title="Classements" />

      <div className="space-y-5 px-4 pt-5">
        <section aria-labelledby="competition-heading" className="space-y-2">
          <h2
            id="competition-heading"
            className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Compétition
          </h2>

          {competitionsLoading ? (
            <div
              data-ocid="standings.competitions.loading_state"
              aria-busy="true"
              className="flex gap-2 overflow-x-auto pb-1"
            >
              {Array.from(
                { length: 3 },
                (_, i) => `competition-skeleton-${i}`,
              ).map((id) => (
                <div
                  key={id}
                  className="h-9 w-28 shrink-0 animate-pulse rounded-full bg-muted"
                />
              ))}
            </div>
          ) : competitionsError ? (
            <ErrorState
              title="Impossible de charger les compétitions"
              onRetry={() => void refetchCompetitions()}
            />
          ) : competitions && competitions.length > 0 ? (
            <div
              role="tablist"
              aria-label="Choisir une compétition"
              className="scroll-x-snap -mx-4 flex gap-2 px-4 pb-1"
            >
              {competitions.map((competition) => {
                const isActive = competition === selected;
                return (
                  <button
                    key={competition}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    data-ocid={`standings.competition.tab.${
                      competitions.indexOf(competition) + 1
                    }`}
                    onClick={() => setSelected(competition)}
                    className={cn(
                      "snap-item shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-subtle"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {competition}
                  </button>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Aucune compétition"
              description="Les compétitions apparaîtront ici dès qu'elles seront disponibles."
              icon={<ListOrdered className="size-6" aria-hidden="true" />}
            />
          )}
        </section>

        {selected ? (
          <section aria-labelledby="table-heading" className="space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <h2
                id="table-heading"
                className="font-display text-base font-bold tracking-tight"
              >
                {selected}
              </h2>
              {rows.length > 0 ? (
                <span className="text-xs text-muted-foreground">
                  {rows.length} équipes
                </span>
              ) : null}
            </div>

            {standingLoading ? (
              <LoadingState rows={6} />
            ) : standingError ? (
              <ErrorState onRetry={() => void refetchStanding()} />
            ) : rows.length > 0 ? (
              <>
                <StandingsTable rows={rows} />
                <Legend relegationStart={relegationStart} total={rows.length} />
              </>
            ) : (
              <EmptyState
                title="Classement indisponible"
                description="Aucun classement n'est publié pour cette compétition pour le moment."
                icon={<ListOrdered className="size-6" aria-hidden="true" />}
              />
            )}
          </section>
        ) : null}
      </div>
    </div>
  );
}

interface LegendProps {
  relegationStart: number;
  total: number;
}

/** Colour key explaining the highlighted zones in the table. */
function Legend({ relegationStart, total }: LegendProps) {
  return (
    <div
      data-ocid="standings.legend"
      className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-border bg-card/60 px-3 py-2.5 text-xs text-muted-foreground"
    >
      <span className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
        Places {1}–{Math.min(TOP_ZONE, total)} · Qualification
      </span>
      <span className="flex items-center gap-2">
        <span
          className="size-2.5 rounded-full bg-destructive"
          aria-hidden="true"
        />
        Places {relegationStart + 1}–{total} · Relégation
      </span>
    </div>
  );
}
