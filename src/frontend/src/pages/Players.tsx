import { AppHeader } from "@/components/AppHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { PlayerCard } from "@/components/cards/PlayerCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlayers, useTeams } from "@/hooks/useFootballData";
import { Search, Users, X } from "lucide-react";
import { useMemo, useState } from "react";

const ALL_VALUE = "__all__";

/** Players page: searchable, filterable list of player cards. */
export default function Players() {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState<string>(ALL_VALUE);
  const [teamName, setTeamName] = useState<string>(ALL_VALUE);

  const { data: players, isLoading, isError, refetch } = usePlayers();
  const { data: teams } = useTeams();

  const positions = useMemo(() => {
    const set = new Set<string>();
    for (const player of players ?? []) {
      if (player.position) set.add(player.position);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "fr"));
  }, [players]);

  const teamNames = useMemo(() => {
    const set = new Set<string>();
    for (const team of teams ?? []) {
      if (team.name) set.add(team.name);
    }
    for (const player of players ?? []) {
      if (player.teamName) set.add(player.teamName);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "fr"));
  }, [teams, players]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (players ?? []).filter((player) => {
      const matchesQuery =
        query.length === 0 || player.name.toLowerCase().includes(query);
      const matchesPosition =
        position === ALL_VALUE || player.position === position;
      const matchesTeam =
        teamName === ALL_VALUE || player.teamName === teamName;
      return matchesQuery && matchesPosition && matchesTeam;
    });
  }, [players, search, position, teamName]);

  const hasActiveFilters =
    search.trim().length > 0 ||
    position !== ALL_VALUE ||
    teamName !== ALL_VALUE;

  function resetFilters() {
    setSearch("");
    setPosition(ALL_VALUE);
    setTeamName(ALL_VALUE);
  }

  return (
    <div data-ocid="players.page" className="pb-4">
      <AppHeader title="Joueurs" />

      <section
        className="space-y-3 px-4 pt-5"
        aria-label="Recherche et filtres"
      >
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un joueur…"
            aria-label="Rechercher un joueur par nom"
            data-ocid="players.search_input"
            className="h-11 pl-9"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger
              data-ocid="players.position_select"
              aria-label="Filtrer par poste"
              className="h-11 w-full"
            >
              <SelectValue placeholder="Poste" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Tous les postes</SelectItem>
              {positions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={teamName} onValueChange={setTeamName}>
            <SelectTrigger
              data-ocid="players.team_select"
              aria-label="Filtrer par équipe"
              className="h-11 w-full"
            >
              <SelectValue placeholder="Équipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Toutes les équipes</SelectItem>
              {teamNames.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            data-ocid="players.reset_button"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-3.5" aria-hidden="true" />
            Réinitialiser les filtres
          </button>
        ) : null}
      </section>

      <section className="pt-5" aria-label="Liste des joueurs">
        {isLoading ? (
          <LoadingState rows={6} className="px-4" />
        ) : isError ? (
          <div className="px-4">
            <ErrorState onRetry={() => void refetch()} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-4">
            <EmptyState
              title={
                hasActiveFilters
                  ? "Aucun joueur ne correspond"
                  : "Aucun joueur disponible"
              }
              description={
                hasActiveFilters
                  ? "Essayez de modifier votre recherche ou vos filtres."
                  : "Les joueurs apparaîtront ici dès leur publication."
              }
              icon={<Users className="size-6" aria-hidden="true" />}
              action={
                hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    data-ocid="players.empty_state.reset_button"
                    className="text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Réinitialiser les filtres
                  </button>
                ) : undefined
              }
            />
          </div>
        ) : (
          <>
            <p className="mb-3 px-4 text-xs text-muted-foreground">
              {filtered.length} joueur{filtered.length > 1 ? "s" : ""}
            </p>
            <div data-ocid="players.list" className="space-y-3 px-4">
              {filtered.map((player, index) => (
                <PlayerCard
                  key={player.id.toString()}
                  id={player.id}
                  name={player.name}
                  position={player.position}
                  teamName={player.teamName}
                  photo={player.photo}
                  goals={player.stats.goals}
                  assists={player.stats.assists}
                  matches={player.stats.matches}
                  index={index + 1}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
