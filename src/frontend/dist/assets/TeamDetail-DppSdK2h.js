import { d as createLucideIcon, e as useTeam, f as useMatches, r as reactExports, j as jsxRuntimeExports, A as AppHeader, a as LoadingState, E as ErrorState, b as EmptyState, M as MapPin, U as Users, g as MatchCard, h as getRouteApi } from "./index-CqDiorx8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode);
const routeApi = getRouteApi("/equipes/$id");
const DATE_FORMAT = new Intl.DateTimeFormat("fr-FR", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit"
});
const STATUS_LABELS = {
  upcoming: "À venir",
  live: "En direct",
  finished: "Terminé"
};
function formatKickoff(kickoff) {
  const date = new Date(Number(kickoff / 1000000n));
  if (Number.isNaN(date.getTime())) return "Date à confirmer";
  return DATE_FORMAT.format(date);
}
function TeamDetail() {
  const { id } = routeApi.useParams();
  const teamId = BigInt(id);
  const {
    data: team,
    isLoading: teamLoading,
    isError: teamError,
    refetch: refetchTeam
  } = useTeam(teamId);
  const {
    data: matches,
    isLoading: matchesLoading,
    isError: matchesError,
    refetch: refetchMatches
  } = useMatches();
  const { results, upcoming } = reactExports.useMemo(() => {
    const list = matches ?? [];
    const teamName = team == null ? void 0 : team.name;
    if (!teamName) return { results: [], upcoming: [] };
    const played = list.filter(
      (match) => match.homeTeam === teamName || match.awayTeam === teamName
    );
    return {
      results: played.filter((match) => match.status === "finished").sort((a, b) => Number(b.kickoff - a.kickoff)).slice(0, 5),
      upcoming: played.filter((match) => match.status !== "finished").sort((a, b) => Number(a.kickoff - b.kickoff)).slice(0, 5)
    };
  }, [matches, team]);
  const isLoading = teamLoading || matchesLoading;
  const isError = teamError || matchesError;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: (team == null ? void 0 : team.name) ?? "Équipe", backTo: "/equipes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 px-4 pt-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, { rows: 4 }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorState,
      {
        onRetry: () => {
          void refetchTeam();
          void refetchMatches();
        }
      }
    ) : !team ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Équipe introuvable",
        description: "Cette équipe n'existe pas ou n'est plus disponible."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          "data-ocid": "team.header",
          className: "flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-subtle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: team.logo || "/assets/images/placeholder.svg",
                alt: `Logo de ${team.name}`,
                className: "size-full object-contain p-2"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate font-display text-xl font-bold tracking-tight", children: team.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5 shrink-0", "aria-hidden": "true" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: team.city })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-3.5 shrink-0", "aria-hidden": "true" }),
                team.squad.length,
                " joueur",
                team.squad.length > 1 ? "s" : ""
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "team.squad_section", className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4", "aria-hidden": "true" }),
          "Effectif"
        ] }),
        team.squad.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            title: "Effectif non communiqué",
            description: "La liste des joueurs sera publiée prochainement."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            "data-ocid": "team.squad_list",
            className: "grid grid-cols-2 gap-2",
            children: team.squad.map((player, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                "data-ocid": `team.squad_item.${index + 1}`,
                className: "truncate rounded-lg border border-border bg-card px-3 py-2 text-sm",
                children: player
              },
              player
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "team.results_section", className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-4", "aria-hidden": "true" }),
          "Derniers résultats"
        ] }),
        results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            title: "Aucun résultat",
            description: "Aucun match terminé pour cette équipe."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: results.map((match, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          MatchCard,
          {
            id: match.id,
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            status: match.status,
            competition: match.competition,
            kickoffLabel: formatKickoff(match.kickoff),
            statusLabel: STATUS_LABELS[match.status] ?? match.status,
            index: index + 1
          },
          match.id.toString()
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "team.upcoming_section", className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "size-4", "aria-hidden": "true" }),
          "Prochains matchs"
        ] }),
        upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            title: "Aucun match à venir",
            description: "Le calendrier de cette équipe n'est pas encore connu."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: upcoming.map((match, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          MatchCard,
          {
            id: match.id,
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            status: match.status,
            competition: match.competition,
            kickoffLabel: formatKickoff(match.kickoff),
            statusLabel: STATUS_LABELS[match.status] ?? match.status,
            index: index + 1
          },
          match.id.toString()
        )) })
      ] })
    ] }) })
  ] });
}
export {
  TeamDetail as default
};
