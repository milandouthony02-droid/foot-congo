import { Layout } from "@/components/Layout";
import { MatchDetail } from "@/pages/MatchDetail";
import { Matches } from "@/pages/Matches";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";
import { lazy } from "react";

interface MatchesSearch {
  competition?: string;
  status?: "upcoming" | "live" | "finished";
  sort?: "date-asc" | "date-desc";
}

const Teams = lazy(() => import("@/pages/Teams"));
const TeamDetail = lazy(() => import("@/pages/TeamDetail"));
const Standings = lazy(() => import("@/pages/Standings"));

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("@/pages/Home")),
});

const matchesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/matchs",
  validateSearch: (search: Record<string, unknown>): MatchesSearch => {
    const competition =
      typeof search.competition === "string" ? search.competition : undefined;
    const status =
      search.status === "upcoming" ||
      search.status === "live" ||
      search.status === "finished"
        ? search.status
        : undefined;
    const sort =
      search.sort === "date-asc" || search.sort === "date-desc"
        ? search.sort
        : undefined;
    return { competition, status, sort };
  },
  component: Matches,
});

const standingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/classements",
  component: Standings,
});

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/equipes",
  component: Teams,
});

const playersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/joueurs",
  component: lazyRouteComponent(() => import("@/pages/Players")),
});

const newsDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/actualites/$id",
  component: lazyRouteComponent(() => import("@/pages/NewsDetail")),
});

const matchDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/matchs/$id",
  component: MatchDetail,
});

const teamDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/equipes/$id",
  component: TeamDetail,
});

const playerDetailRoute = createRoute({
  getParentRoute() {
    return rootRoute;
  },
  path: "/joueurs/$id",
  component: lazyRouteComponent(() => import("@/pages/PlayerDetail")),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  matchesRoute,
  standingsRoute,
  teamsRoute,
  playersRoute,
  newsDetailRoute,
  matchDetailRoute,
  teamDetailRoute,
  playerDetailRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
