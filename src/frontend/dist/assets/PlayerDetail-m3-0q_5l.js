import { d as createLucideIcon, D as useParams, F as usePlayer, j as jsxRuntimeExports, A as AppHeader, P as PageLoading, E as ErrorState, b as EmptyState, G as initials, S as Shield, H as Goal } from "./index-CqDiorx8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m11 17 2 2a1 1 0 1 0 3-3", key: "efffak" }],
  [
    "path",
    {
      d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
      key: "9pr0kb"
    }
  ],
  ["path", { d: "m21 3 1 11h-2", key: "1tisrp" }],
  ["path", { d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3", key: "1uvwmv" }],
  ["path", { d: "M3 4h8", key: "1ep09j" }]
];
const Handshake = createLucideIcon("handshake", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function StatTile({ label, value, icon: Icon, ocid }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4 shadow-subtle",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-score font-mono text-2xl font-bold leading-none", children: value.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
      ]
    }
  );
}
function PlayerDetail() {
  const { id } = useParams({ from: "/joueurs/$id" });
  const playerId = BigInt(id);
  const { data: player, isLoading, isError, refetch } = usePlayer(playerId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "player_detail.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Joueur", backTo: "/joueurs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {})
    ] });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "player_detail.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Joueur", backTo: "/joueurs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => void refetch() }) })
    ] });
  }
  if (!player) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "player_detail.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Joueur", backTo: "/joueurs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          title: "Joueur introuvable",
          description: "Ce joueur n'existe pas ou n'est plus disponible.",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "size-6", "aria-hidden": "true" })
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "player_detail.page", className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: player.name, backTo: "/joueurs" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 pt-6", "aria-label": "Profil du joueur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 rounded-2xl border border-border bg-gradient-subtle p-6 text-center shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/40 bg-muted", children: player.photo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: player.photo,
          alt: `Portrait de ${player.name}`,
          className: "size-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-muted-foreground", children: initials(player.name) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: player.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: player.position })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-3.5", "aria-hidden": "true" }),
        player.teamName
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-6", "aria-labelledby": "player-stats-heading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          id: "player-stats-heading",
          className: "mb-3 px-4 font-display text-base font-bold tracking-tight",
          children: "Statistiques"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatTile,
          {
            label: "Buts",
            value: player.stats.goals,
            icon: Goal,
            ocid: "player_detail.stat.goals"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatTile,
          {
            label: "Passes",
            value: player.stats.assists,
            icon: Handshake,
            ocid: "player_detail.stat.assists"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatTile,
          {
            label: "Matchs",
            value: player.stats.matches,
            icon: Shield,
            ocid: "player_detail.stat.matches"
          }
        )
      ] })
    ] })
  ] });
}
export {
  PlayerDetail as default
};
