import { j as jsxRuntimeExports, c as cn, i as useCompetitions, r as reactExports, k as useStanding, A as AppHeader, E as ErrorState, b as EmptyState, l as ListOrdered, a as LoadingState } from "./index-CqDiorx8.js";
function StandingsTable({ rows, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "standings.table",
      className: cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-subtle",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-secondary text-secondary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[0.65rem] uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              scope: "col",
              className: "w-8 px-2 py-2.5 text-center font-semibold",
              children: "#"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-2 py-2.5 text-left font-semibold", children: "Équipe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              scope: "col",
              className: "w-8 px-1 py-2.5 text-center font-semibold",
              children: "J"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              scope: "col",
              className: "w-8 px-1 py-2.5 text-center font-semibold",
              children: "G"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              scope: "col",
              className: "w-8 px-1 py-2.5 text-center font-semibold",
              children: "N"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              scope: "col",
              className: "w-8 px-1 py-2.5 text-center font-semibold",
              children: "P"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              scope: "col",
              className: "w-10 px-2 py-2.5 text-right font-semibold",
              children: "Pts"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `standings.row.${i + 1}`,
            className: "border-t border-border transition-colors hover:bg-muted/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "tabular-score inline-flex size-5 items-center justify-center rounded-full font-mono text-xs font-semibold",
                    row.position <= 3n ? "bg-primary/15 text-primary" : "text-muted-foreground"
                  ),
                  children: row.position.toString()
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-0 px-2 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate font-medium", children: row.teamName }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tabular-score px-1 py-2.5 text-center font-mono text-xs text-muted-foreground", children: row.played.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tabular-score px-1 py-2.5 text-center font-mono text-xs text-muted-foreground", children: row.won.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tabular-score px-1 py-2.5 text-center font-mono text-xs text-muted-foreground", children: row.drawn.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tabular-score px-1 py-2.5 text-center font-mono text-xs text-muted-foreground", children: row.lost.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tabular-score px-2 py-2.5 text-right font-mono text-sm font-bold", children: row.points.toString() })
            ]
          },
          row.teamName
        )) })
      ] }) })
    }
  );
}
const TOP_ZONE = 3;
const RELEGATION_ZONE = 3;
function Standings() {
  const {
    data: competitions,
    isLoading: competitionsLoading,
    isError: competitionsError,
    refetch: refetchCompetitions
  } = useCompetitions();
  const [selected, setSelected] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (selected === null && competitions && competitions.length > 0) {
      setSelected(competitions[0]);
    }
  }, [competitions, selected]);
  const {
    data: standing,
    isLoading: standingLoading,
    isError: standingError,
    refetch: refetchStanding
  } = useStanding(selected ?? "");
  const rows = (standing == null ? void 0 : standing.rows) ?? [];
  const relegationStart = Math.max(rows.length - RELEGATION_ZONE, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Classements" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 px-4 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "competition-heading", className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            id: "competition-heading",
            className: "font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground",
            children: "Compétition"
          }
        ),
        competitionsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "standings.competitions.loading_state",
            "aria-busy": "true",
            className: "flex gap-2 overflow-x-auto pb-1",
            children: Array.from(
              { length: 3 },
              (_, i) => `competition-skeleton-${i}`
            ).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-9 w-28 shrink-0 animate-pulse rounded-full bg-muted"
              },
              id
            ))
          }
        ) : competitionsError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ErrorState,
          {
            title: "Impossible de charger les compétitions",
            onRetry: () => void refetchCompetitions()
          }
        ) : competitions && competitions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            role: "tablist",
            "aria-label": "Choisir une compétition",
            className: "scroll-x-snap -mx-4 flex gap-2 px-4 pb-1",
            children: competitions.map((competition) => {
              const isActive = competition === selected;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": isActive,
                  "data-ocid": `standings.competition.tab.${competitions.indexOf(competition) + 1}`,
                  onClick: () => setSelected(competition),
                  className: cn(
                    "snap-item shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "border-primary bg-primary text-primary-foreground shadow-subtle" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  ),
                  children: competition
                },
                competition
              );
            })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            title: "Aucune compétition",
            description: "Les compétitions apparaîtront ici dès qu'elles seront disponibles.",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "size-6", "aria-hidden": "true" })
          }
        )
      ] }),
      selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "table-heading", className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "table-heading",
              className: "font-display text-base font-bold tracking-tight",
              children: selected
            }
          ),
          rows.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            rows.length,
            " équipes"
          ] }) : null
        ] }),
        standingLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, { rows: 6 }) : standingError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => void refetchStanding() }) : rows.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StandingsTable, { rows }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { relegationStart, total: rows.length })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            title: "Classement indisponible",
            description: "Aucun classement n'est publié pour cette compétition pour le moment.",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "size-6", "aria-hidden": "true" })
          }
        )
      ] }) : null
    ] })
  ] });
}
function Legend({ relegationStart, total }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "standings.legend",
      className: "flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-border bg-card/60 px-3 py-2.5 text-xs text-muted-foreground",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full bg-primary", "aria-hidden": "true" }),
          "Places ",
          1,
          "–",
          Math.min(TOP_ZONE, total),
          " · Qualification"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "size-2.5 rounded-full bg-destructive",
              "aria-hidden": "true"
            }
          ),
          "Places ",
          relegationStart + 1,
          "–",
          total,
          " · Relégation"
        ] })
      ]
    }
  );
}
export {
  Standings as default
};
