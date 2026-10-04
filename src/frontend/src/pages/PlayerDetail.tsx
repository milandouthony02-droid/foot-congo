import { AppHeader } from "@/components/AppHeader";
import { EmptyState, ErrorState, PageLoading } from "@/components/States";
import { usePlayer } from "@/hooks/useFootballData";
import { initials } from "@/lib/format";
import { useParams } from "@tanstack/react-router";
import { Goal, Handshake, Shield, UserX } from "lucide-react";

interface StatTileProps {
  label: string;
  value: bigint;
  icon: typeof Goal;
  ocid: string;
}

/** Single statistic tile with an icon, value and label. */
function StatTile({ label, value, icon: Icon, ocid }: StatTileProps) {
  return (
    <div
      data-ocid={ocid}
      className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4 shadow-subtle"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="tabular-score font-mono text-2xl font-bold leading-none">
        {value.toString()}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

/** Player detail page: photo, identity and season statistics. */
export default function PlayerDetail() {
  const { id } = useParams({ from: "/joueurs/$id" });
  const playerId = BigInt(id);
  const { data: player, isLoading, isError, refetch } = usePlayer(playerId);

  if (isLoading) {
    return (
      <div data-ocid="player_detail.page">
        <AppHeader title="Joueur" backTo="/joueurs" />
        <PageLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div data-ocid="player_detail.page">
        <AppHeader title="Joueur" backTo="/joueurs" />
        <div className="px-4 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div data-ocid="player_detail.page">
        <AppHeader title="Joueur" backTo="/joueurs" />
        <div className="px-4 pt-6">
          <EmptyState
            title="Joueur introuvable"
            description="Ce joueur n'existe pas ou n'est plus disponible."
            icon={<UserX className="size-6" aria-hidden="true" />}
          />
        </div>
      </div>
    );
  }

  return (
    <div data-ocid="player_detail.page" className="pb-4">
      <AppHeader title={player.name} backTo="/joueurs" />

      <section className="px-4 pt-6" aria-label="Profil du joueur">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-gradient-subtle p-6 text-center shadow-subtle">
          <span className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/40 bg-muted">
            {player.photo ? (
              <img
                src={player.photo}
                alt={`Portrait de ${player.name}`}
                className="size-full object-cover"
              />
            ) : (
              <span className="font-display text-2xl font-bold text-muted-foreground">
                {initials(player.name)}
              </span>
            )}
          </span>
          <div className="space-y-1">
            <h2 className="font-display text-xl font-bold tracking-tight">
              {player.name}
            </h2>
            <p className="text-sm font-medium text-primary">
              {player.position}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Shield className="size-3.5" aria-hidden="true" />
            {player.teamName}
          </span>
        </div>
      </section>

      <section className="pt-6" aria-labelledby="player-stats-heading">
        <h3
          id="player-stats-heading"
          className="mb-3 px-4 font-display text-base font-bold tracking-tight"
        >
          Statistiques
        </h3>
        <div className="grid grid-cols-3 gap-3 px-4">
          <StatTile
            label="Buts"
            value={player.stats.goals}
            icon={Goal}
            ocid="player_detail.stat.goals"
          />
          <StatTile
            label="Passes"
            value={player.stats.assists}
            icon={Handshake}
            ocid="player_detail.stat.assists"
          />
          <StatTile
            label="Matchs"
            value={player.stats.matches}
            icon={Shield}
            ocid="player_detail.stat.matches"
          />
        </div>
      </section>
    </div>
  );
}
