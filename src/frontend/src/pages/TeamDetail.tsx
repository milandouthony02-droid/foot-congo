import { AppHeader } from "@/components/AppHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { MatchCard } from "@/components/cards/MatchCard";
import { useMatches, useTeam } from "@/hooks/useFootballData";
import { getRouteApi } from "@tanstack/react-router";
import { CalendarClock, History, MapPin, Users } from "lucide-react";
import { useMemo } from "react";

const routeApi = getRouteApi("/equipes/$id");

const DATE_FORMAT = new Intl.DateTimeFormat("fr-FR", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const STATUS_LABELS: Record<string, string> = {
  upcoming: "À venir",
  live: "En direct",
  finished: "Terminé",
};

function formatKickoff(kickoff: bigint): string {
  const date = new Date(Number(kickoff / 1_000_000n));
  if (Number.isNaN(date.getTime())) return "Date à confirmer";
  return DATE_FORMAT.format(date);
}

/** Team detail: squad, recent results and upcoming fixtures. */
export default function TeamDetail() {
  const { id } = routeApi.useParams();
  const teamId = BigInt(id);

  const {
    data: team,
    isLoading: teamLoading,
    isError: teamError,
    refetch: refetchTeam,
  } = useTeam(teamId);
  const {
    data: matches,
    isLoading: matchesLoading,
    isError: matchesError,
    refetch: refetchMatches,
  } = useMatches();

  const { results, upcoming } = useMemo(() => {
    const list = matches ?? [];
    const teamName = team?.name;
    if (!teamName) return { results: [], upcoming: [] };
    const played = list.filter(
      (match) => match.homeTeam === teamName || match.awayTeam === teamName,
    );
    return {
      results: played
        .filter((match) => match.status === "finished")
        .sort((a, b) => Number(b.kickoff - a.kickoff))
        .slice(0, 5),
      upcoming: played
        .filter((match) => match.status !== "finished")
        .sort((a, b) => Number(a.kickoff - b.kickoff))
        .slice(0, 5),
    };
  }, [matches, team]);

  const isLoading = teamLoading || matchesLoading;
  const isError = teamError || matchesError;

  return (
    <>
      <AppHeader title={team?.name ?? "Équipe"} backTo="/equipes" />

      <div className="space-y-6 px-4 pt-4">
        {isLoading ? (
          <LoadingState rows={4} />
        ) : isError ? (
          <ErrorState
            onRetry={() => {
              void refetchTeam();
              void refetchMatches();
            }}
          />
        ) : !team ? (
          <EmptyState
            title="Équipe introuvable"
            description="Cette équipe n'existe pas ou n'est plus disponible."
          />
        ) : (
          <>
            <section
              data-ocid="team.header"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-subtle"
            >
              <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                <img
                  src={team.logo || "/assets/images/placeholder.svg"}
                  alt={`Logo de ${team.name}`}
                  className="size-full object-contain p-2"
                />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-display text-xl font-bold tracking-tight">
                  {team.name}
                </h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{team.city}</span>
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="size-3.5 shrink-0" aria-hidden="true" />
                  {team.squad.length} joueur
                  {team.squad.length > 1 ? "s" : ""}
                </p>
              </div>
            </section>

            <section data-ocid="team.squad_section" className="space-y-3">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <Users className="size-4" aria-hidden="true" />
                Effectif
              </h3>
              {team.squad.length === 0 ? (
                <EmptyState
                  title="Effectif non communiqué"
                  description="La liste des joueurs sera publiée prochainement."
                />
              ) : (
                <ul
                  data-ocid="team.squad_list"
                  className="grid grid-cols-2 gap-2"
                >
                  {team.squad.map((player, index) => (
                    <li
                      key={player}
                      data-ocid={`team.squad_item.${index + 1}`}
                      className="truncate rounded-lg border border-border bg-card px-3 py-2 text-sm"
                    >
                      {player}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section data-ocid="team.results_section" className="space-y-3">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <History className="size-4" aria-hidden="true" />
                Derniers résultats
              </h3>
              {results.length === 0 ? (
                <EmptyState
                  title="Aucun résultat"
                  description="Aucun match terminé pour cette équipe."
                />
              ) : (
                <div className="space-y-3">
                  {results.map((match, index) => (
                    <MatchCard
                      key={match.id.toString()}
                      id={match.id}
                      homeTeam={match.homeTeam}
                      awayTeam={match.awayTeam}
                      homeScore={match.homeScore}
                      awayScore={match.awayScore}
                      status={match.status}
                      competition={match.competition}
                      kickoffLabel={formatKickoff(match.kickoff)}
                      statusLabel={STATUS_LABELS[match.status] ?? match.status}
                      index={index + 1}
                    />
                  ))}
                </div>
              )}
            </section>

            <section data-ocid="team.upcoming_section" className="space-y-3">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <CalendarClock className="size-4" aria-hidden="true" />
                Prochains matchs
              </h3>
              {upcoming.length === 0 ? (
                <EmptyState
                  title="Aucun match à venir"
                  description="Le calendrier de cette équipe n'est pas encore connu."
                />
              ) : (
                <div className="space-y-3">
                  {upcoming.map((match, index) => (
                    <MatchCard
                      key={match.id.toString()}
                      id={match.id}
                      homeTeam={match.homeTeam}
                      awayTeam={match.awayTeam}
                      homeScore={match.homeScore}
                      awayScore={match.awayScore}
                      status={match.status}
                      competition={match.competition}
                      kickoffLabel={formatKickoff(match.kickoff)}
                      statusLabel={STATUS_LABELS[match.status] ?? match.status}
                      index={index + 1}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
}
