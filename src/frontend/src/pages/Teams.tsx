import { AppHeader } from "@/components/AppHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { TeamCard } from "@/components/cards/TeamCard";
import { Input } from "@/components/ui/input";
import { useTeams } from "@/hooks/useFootballData";
import { Search, Shield, X } from "lucide-react";
import { useMemo, useState } from "react";

/** Teams directory: searchable list of club cards. */
export default function Teams() {
  const { data: teams, isLoading, isError, refetch } = useTeams();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = teams ?? [];
    const term = query.trim().toLowerCase();
    if (!term) return list;
    return list.filter(
      (team) =>
        team.name.toLowerCase().includes(term) ||
        team.city.toLowerCase().includes(term),
    );
  }, [teams, query]);

  return (
    <>
      <AppHeader title="Équipes" />

      <div className="space-y-4 px-4 pt-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une équipe…"
            aria-label="Rechercher une équipe par nom"
            data-ocid="teams.search_input"
            className="h-11 pl-9 pr-9"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Effacer la recherche"
              data-ocid="teams.search_clear_button"
              className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {isLoading ? (
          <LoadingState rows={5} />
        ) : isError ? (
          <ErrorState onRetry={() => void refetch()} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Shield className="size-6" aria-hidden="true" />}
            title={query ? "Aucune équipe trouvée" : "Aucune équipe"}
            description={
              query
                ? `Aucun résultat pour « ${query} ». Essayez un autre nom.`
                : "Les équipes apparaîtront ici dès qu'elles seront disponibles."
            }
            action={
              query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  data-ocid="teams.empty_state.reset_button"
                  className="text-sm font-medium text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Effacer la recherche
                </button>
              ) : undefined
            }
          />
        ) : (
          <ul data-ocid="teams.list" className="space-y-3">
            {filtered.map((team, index) => (
              <li key={team.id.toString()}>
                <TeamCard
                  id={team.id}
                  name={team.name}
                  city={team.city}
                  logo={team.logo}
                  squadSize={team.squad.length}
                  index={index + 1}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
