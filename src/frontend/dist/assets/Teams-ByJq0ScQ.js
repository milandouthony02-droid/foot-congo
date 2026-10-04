import { j as jsxRuntimeExports, L as Link, M as MapPin, U as Users, c as cn, u as useTeams, r as reactExports, A as AppHeader, a as LoadingState, E as ErrorState, b as EmptyState, S as Shield } from "./index-CqDiorx8.js";
import { C as ChevronRight } from "./chevron-right-DCzq-T2q.js";
import { S as Search, I as Input, X } from "./input-Bz97_Z78.js";
function TeamCard({
  id,
  name,
  city,
  logo,
  squadSize,
  index,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/equipes/$id",
      params: { id: id.toString() },
      "data-ocid": index !== void 0 ? `team.item.${index}` : "team.item",
      className: cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-subtle transition-smooth hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logo || "/assets/images/placeholder.svg",
            alt: "",
            loading: "lazy",
            className: "size-full object-contain p-1"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-sm font-semibold", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3 shrink-0", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: city })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex items-center gap-1 text-[0.65rem] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-3 shrink-0", "aria-hidden": "true" }),
            squadSize,
            " joueur",
            squadSize > 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronRight,
          {
            className: "size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Teams() {
  const { data: teams, isLoading, isError, refetch } = useTeams();
  const [query, setQuery] = reactExports.useState("");
  const filtered = reactExports.useMemo(() => {
    const list = teams ?? [];
    const term = query.trim().toLowerCase();
    if (!term) return list;
    return list.filter(
      (team) => team.name.toLowerCase().includes(term) || team.city.toLowerCase().includes(term)
    );
  }, [teams, query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Équipes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "search",
            value: query,
            onChange: (event) => setQuery(event.target.value),
            placeholder: "Rechercher une équipe…",
            "aria-label": "Rechercher une équipe par nom",
            "data-ocid": "teams.search_input",
            className: "h-11 pl-9 pr-9"
          }
        ),
        query ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setQuery(""),
            "aria-label": "Effacer la recherche",
            "data-ocid": "teams.search_clear_button",
            className: "absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4", "aria-hidden": "true" })
          }
        ) : null
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, { rows: 5 }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => void refetch() }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-6", "aria-hidden": "true" }),
          title: query ? "Aucune équipe trouvée" : "Aucune équipe",
          description: query ? `Aucun résultat pour « ${query} ». Essayez un autre nom.` : "Les équipes apparaîtront ici dès qu'elles seront disponibles.",
          action: query ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setQuery(""),
              "data-ocid": "teams.empty_state.reset_button",
              className: "text-sm font-medium text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: "Effacer la recherche"
            }
          ) : void 0
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { "data-ocid": "teams.list", className: "space-y-3", children: filtered.map((team, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TeamCard,
        {
          id: team.id,
          name: team.name,
          city: team.city,
          logo: team.logo,
          squadSize: team.squad.length,
          index: index + 1
        }
      ) }, team.id.toString())) })
    ] })
  ] });
}
export {
  Teams as default
};
