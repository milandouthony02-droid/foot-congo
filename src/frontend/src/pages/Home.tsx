import { AdBanner } from "@/components/AdBanner";
import { AppHeader } from "@/components/AppHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { MatchCard } from "@/components/cards/MatchCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { useMatches, useNewsList } from "@/hooks/useFootballData";
import { formatDateTime, formatRelative, matchStatusLabel } from "@/lib/format";
import { Link } from "@tanstack/react-router";
import { CalendarDays, ListOrdered, Newspaper, Shield } from "lucide-react";

/** Horizontal ticker of upcoming fixtures and latest results. */
function MatchTicker() {
  const { data: matches, isLoading, isError, refetch } = useMatches();

  if (isLoading) {
    return (
      <div className="scroll-x-snap flex gap-3 px-4 pb-1">
        {Array.from({ length: 3 }, (_, i) => `match-skeleton-${i}`).map(
          (id) => (
            <div
              key={id}
              className="h-40 w-64 shrink-0 animate-pulse rounded-xl border border-border bg-card"
            />
          ),
        )}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-4">
        <ErrorState onRetry={() => void refetch()} />
      </div>
    );
  }

  const list = matches ?? [];
  if (list.length === 0) {
    return (
      <div className="px-4">
        <EmptyState
          title="Aucun match programmé"
          description="Les prochaines rencontres apparaîtront ici dès leur publication."
          icon={<CalendarDays className="size-6" aria-hidden="true" />}
        />
      </div>
    );
  }

  return (
    <div
      data-ocid="home.matches.list"
      className="scroll-x-snap flex gap-3 px-4 pb-1"
    >
      {list.map((match, index) => (
        <MatchCard
          key={match.id.toString()}
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
          className="snap-item w-64 shrink-0"
        />
      ))}
    </div>
  );
}

/** Latest news feed rendered as clickable cards. */
function NewsFeed() {
  const { data: news, isLoading, isError, refetch } = useNewsList();

  if (isLoading) {
    return <LoadingState rows={4} className="px-4" />;
  }

  if (isError) {
    return (
      <div className="px-4">
        <ErrorState onRetry={() => void refetch()} />
      </div>
    );
  }

  const list = news ?? [];
  if (list.length === 0) {
    return (
      <div className="px-4">
        <EmptyState
          title="Aucune actualité pour le moment"
          description="Revenez bientôt pour suivre toute l'actualité du football congolais."
          icon={<Newspaper className="size-6" aria-hidden="true" />}
        />
      </div>
    );
  }

  return (
    <div data-ocid="home.news.list" className="space-y-3 px-4">
      {list.map((item, index) => (
        <NewsCard
          key={item.id.toString()}
          id={item.id}
          title={item.title}
          summary={item.summary}
          category={item.category}
          image={item.image}
          publishedLabel={formatRelative(item.publishedAt)}
          index={index + 1}
        />
      ))}
    </div>
  );
}

/** Quick access tiles to standings and teams. */
function QuickAccess() {
  const links = [
    {
      to: "/classements",
      label: "Classements",
      description: "Le classement des compétitions",
      icon: ListOrdered,
      ocid: "home.quick_access.standings",
    },
    {
      to: "/equipes",
      label: "Équipes",
      description: "Les clubs et leurs effectifs",
      icon: Shield,
      ocid: "home.quick_access.teams",
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.to}
            to={link.to}
            data-ocid={link.ocid}
            className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-subtle transition-smooth hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary transition-transform group-hover:scale-105">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="font-display text-sm font-semibold">
              {link.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {link.description}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/** Home page: match ticker, quick access, news feed and an ad slot. */
export default function Home() {
  return (
    <div data-ocid="home.page" className="pb-4">
      <AppHeader title="Foot Congo" />

      <section className="pt-5" aria-labelledby="home-matches-heading">
        <div className="mb-3 flex items-center justify-between px-4">
          <h2
            id="home-matches-heading"
            className="font-display text-base font-bold tracking-tight"
          >
            Matchs
          </h2>
          <Link
            to="/matchs"
            data-ocid="home.matches.link"
            className="text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Tout voir
          </Link>
        </div>
        <MatchTicker />
      </section>

      <section className="pt-6" aria-labelledby="home-quick-heading">
        <h2
          id="home-quick-heading"
          className="mb-3 px-4 font-display text-base font-bold tracking-tight"
        >
          Accès rapides
        </h2>
        <QuickAccess />
      </section>

      <div className="px-4 pt-6">
        <AdBanner placement="home" />
      </div>

      <section className="pt-6" aria-labelledby="home-news-heading">
        <div className="mb-3 flex items-center justify-between px-4">
          <h2
            id="home-news-heading"
            className="font-display text-base font-bold tracking-tight"
          >
            Dernières actualités
          </h2>
        </div>
        <NewsFeed />
      </section>
    </div>
  );
}
