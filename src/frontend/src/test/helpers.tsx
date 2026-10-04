import type {
  AdSlot,
  Match,
  MatchStatus,
  News,
  Player,
  Standing,
  Team,
} from "@/backend";
import { MatchStatus as MatchStatusEnum } from "@/backend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { vi } from "vitest";

/**
 * Typed local actor mock. Every method the frontend consumes is present so a
 * test can override only the calls it cares about. This is a mock seam: it
 * proves the frontend's rendering and wiring, never the real canister.
 */
export interface ActorMock {
  listNews: ReturnType<typeof vi.fn>;
  getNews: ReturnType<typeof vi.fn>;
  listMatches: ReturnType<typeof vi.fn>;
  getMatch: ReturnType<typeof vi.fn>;
  listCompetitions: ReturnType<typeof vi.fn>;
  getStanding: ReturnType<typeof vi.fn>;
  listTeams: ReturnType<typeof vi.fn>;
  getTeam: ReturnType<typeof vi.fn>;
  listPlayers: ReturnType<typeof vi.fn>;
  getPlayer: ReturnType<typeof vi.fn>;
  listAdSlots: ReturnType<typeof vi.fn>;
}

export function createActorMock(overrides: Partial<ActorMock> = {}): ActorMock {
  return {
    listNews: vi.fn().mockResolvedValue([]),
    getNews: vi.fn().mockResolvedValue(null),
    listMatches: vi.fn().mockResolvedValue([]),
    getMatch: vi.fn().mockResolvedValue(null),
    listCompetitions: vi.fn().mockResolvedValue([]),
    getStanding: vi.fn().mockResolvedValue(null),
    listTeams: vi.fn().mockResolvedValue([]),
    getTeam: vi.fn().mockResolvedValue(null),
    listPlayers: vi.fn().mockResolvedValue([]),
    getPlayer: vi.fn().mockResolvedValue(null),
    listAdSlots: vi.fn().mockResolvedValue([]),
    ...overrides,
  };
}

/** Build a fresh QueryClient with retries disabled for deterministic tests. */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
    },
  });
}

interface RenderRouteOptions {
  /** Route path, e.g. "/" or "/matchs/$id". */
  path: string;
  /** Component under test. */
  component: () => ReactNode;
  /** Initial URL, e.g. "/matchs/1". */
  initialEntry?: string;
  /** Search params for the route. */
  validateSearch?: (search: Record<string, unknown>) => Record<string, unknown>;
  queryClient?: QueryClient;
}

/**
 * Render a single route inside a real TanStack Router + React Query tree so
 * navigation, params and search-param handling behave as in the app.
 */
export function renderRoute({
  path,
  component,
  initialEntry,
  validateSearch,
  queryClient = createTestQueryClient(),
}: RenderRouteOptions) {
  const rootRoute = createRootRoute({ component: () => <Outlet /> });
  const route = createRoute({
    getParentRoute: () => rootRoute,
    path,
    component,
    validateSearch,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([route]),
    history: createMemoryHistory({ initialEntries: [initialEntry ?? path] }),
  });

  const utils = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  return { ...utils, router, queryClient };
}

// --- Fixture builders -------------------------------------------------------

export function makeNews(overrides: Partial<News> = {}): News {
  return {
    id: 1n,
    title: "Titre de test",
    summary: "Résumé de test",
    content: "Contenu de test",
    image: "",
    publishedAt: 1_760_000_000_000_000_000n,
    category: "LINAFOOT",
    ...overrides,
  };
}

export function makeMatch(overrides: Partial<Match> = {}): Match {
  return {
    id: 1n,
    competition: "LINAFOOT D1",
    homeTeam: "TP Mazembe",
    awayTeam: "AS Vita Club",
    homeScore: 2n,
    awayScore: 1n,
    status: MatchStatusEnum.finished,
    kickoff: 1_759_000_000_000_000_000n,
    scorers: [],
    summary: "Résumé du match",
    lineup: { home: [], away: [] },
    ...overrides,
  };
}

export function makeTeam(overrides: Partial<Team> = {}): Team {
  return {
    id: 1n,
    name: "TP Mazembe",
    city: "Lubumbashi",
    logo: "",
    squad: ["Joueur Un", "Joueur Deux"],
    ...overrides,
  };
}

export function makePlayer(overrides: Partial<Player> = {}): Player {
  return {
    id: 1n,
    name: "Cédric Bakambu",
    position: "Attaquant",
    teamName: "TP Mazembe",
    photo: "",
    stats: { goals: 12n, assists: 4n, matches: 14n },
    ...overrides,
  };
}

export function makeStanding(overrides: Partial<Standing> = {}): Standing {
  return {
    competition: "LINAFOOT D1",
    rows: [
      {
        position: 1n,
        teamName: "TP Mazembe",
        played: 12n,
        won: 9n,
        drawn: 2n,
        lost: 1n,
        points: 29n,
      },
      {
        position: 2n,
        teamName: "AS Vita Club",
        played: 12n,
        won: 8n,
        drawn: 2n,
        lost: 2n,
        points: 26n,
      },
    ],
    ...overrides,
  };
}

export function makeAdSlot(overrides: Partial<AdSlot> = {}): AdSlot {
  return {
    id: "home-banner",
    placement: "Accueil",
    targetUrl: "",
    enabled: false,
    imageUrl: "",
    ...overrides,
  };
}

export type { MatchStatus };
