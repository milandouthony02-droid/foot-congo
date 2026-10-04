import { j as jsxRuntimeExports, L as Link, c as cn, A as AppHeader, m as AdBanner, f as useMatches, E as ErrorState, b as EmptyState, C as CalendarDays, g as MatchCard, n as matchStatusLabel, o as formatDateTime, l as ListOrdered, S as Shield, p as useNewsList, a as LoadingState, q as formatRelative } from "./index-CqDiorx8.js";
import { C as ChevronRight } from "./chevron-right-DCzq-T2q.js";
import { N as Newspaper } from "./newspaper-CFR0yjV6.js";
function NewsCard({
  id,
  title,
  summary,
  category,
  image,
  publishedLabel,
  index,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/actualites/$id",
      params: { id: id.toString() },
      "data-ocid": index !== void 0 ? `news.item.${index}` : "news.item",
      className: cn(
        "group flex gap-3 overflow-hidden rounded-xl border border-border bg-card p-3 shadow-subtle transition-smooth hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: image || "/assets/images/placeholder.svg",
            alt: "",
            loading: "lazy",
            className: "size-full object-cover transition-transform duration-300 group-hover:scale-105"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-between py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-primary", children: category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 font-display text-sm font-semibold leading-snug", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-xs text-muted-foreground", children: summary })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.65rem] text-muted-foreground", children: publishedLabel })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronRight,
          {
            className: "mt-1 size-4 shrink-0 self-center text-muted-foreground transition-transform group-hover:translate-x-0.5",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function MatchTicker() {
  const { data: matches, isLoading, isError, refetch } = useMatches();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scroll-x-snap flex gap-3 px-4 pb-1", children: Array.from({ length: 3 }, (_, i) => `match-skeleton-${i}`).map(
      (id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-40 w-64 shrink-0 animate-pulse rounded-xl border border-border bg-card"
        },
        id
      )
    ) });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => void refetch() }) });
  }
  const list = matches ?? [];
  if (list.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Aucun match programmé",
        description: "Les prochaines rencontres apparaîtront ici dès leur publication.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-6", "aria-hidden": "true" })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "home.matches.list",
      className: "scroll-x-snap flex gap-3 px-4 pb-1",
      children: list.map((match, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        MatchCard,
        {
          id: match.id,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          homeScore: match.homeScore,
          awayScore: match.awayScore,
          status: match.status,
          competition: match.competition,
          kickoffLabel: formatDateTime(match.kickoff),
          statusLabel: matchStatusLabel(match.status),
          index: index + 1,
          className: "snap-item w-64 shrink-0"
        },
        match.id.toString()
      ))
    }
  );
}
function NewsFeed() {
  const { data: news, isLoading, isError, refetch } = useNewsList();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, { rows: 4, className: "px-4" });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => void refetch() }) });
  }
  const list = news ?? [];
  if (list.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Aucune actualité pour le moment",
        description: "Revenez bientôt pour suivre toute l'actualité du football congolais.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "size-6", "aria-hidden": "true" })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "home.news.list", className: "space-y-3 px-4", children: list.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    NewsCard,
    {
      id: item.id,
      title: item.title,
      summary: item.summary,
      category: item.category,
      image: item.image,
      publishedLabel: formatRelative(item.publishedAt),
      index: index + 1
    },
    item.id.toString()
  )) });
}
function QuickAccess() {
  const links = [
    {
      to: "/classements",
      label: "Classements",
      description: "Le classement des compétitions",
      icon: ListOrdered,
      ocid: "home.quick_access.standings"
    },
    {
      to: "/equipes",
      label: "Équipes",
      description: "Les clubs et leurs effectifs",
      icon: Shield,
      ocid: "home.quick_access.teams"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 px-4", children: links.map((link) => {
    const Icon = link.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: link.to,
        "data-ocid": link.ocid,
        className: "group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-subtle transition-smooth hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary transition-transform group-hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold", children: link.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: link.description })
        ]
      },
      link.to
    );
  }) });
}
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Foot Congo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-5", "aria-labelledby": "home-matches-heading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            id: "home-matches-heading",
            className: "font-display text-base font-bold tracking-tight",
            children: "Matchs"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/matchs",
            "data-ocid": "home.matches.link",
            className: "text-xs font-semibold text-primary transition-colors hover:text-primary/80",
            children: "Tout voir"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MatchTicker, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-6", "aria-labelledby": "home-quick-heading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          id: "home-quick-heading",
          className: "mb-3 px-4 font-display text-base font-bold tracking-tight",
          children: "Accès rapides"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAccess, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { placement: "home" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-6", "aria-labelledby": "home-news-heading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex items-center justify-between px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          id: "home-news-heading",
          className: "font-display text-base font-bold tracking-tight",
          children: "Dernières actualités"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NewsFeed, {})
    ] })
  ] });
}
export {
  Home as default
};
