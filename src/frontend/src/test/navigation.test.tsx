import { AdBanner } from "@/components/AdBanner";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { Layout } from "@/components/Layout";
import { createTestQueryClient } from "@/test/helpers";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useBackend", () => ({
  useBackend: () => ({ actor: null, isFetching: false }),
}));

/** Render the full app shell with the five nav routes wired to placeholders. */
function renderShell() {
  const rootRoute = createRootRoute({
    component: () => (
      <Layout>
        <AppHeader title="Foot Congo" />
        <Outlet />
      </Layout>
    ),
  });
  const home = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <div>Page accueil</div>,
  });
  const matches = createRoute({
    getParentRoute: () => rootRoute,
    path: "/matchs",
    component: () => <div>Page matchs</div>,
  });
  const standings = createRoute({
    getParentRoute: () => rootRoute,
    path: "/classements",
    component: () => <div>Page classements</div>,
  });
  const teams = createRoute({
    getParentRoute: () => rootRoute,
    path: "/equipes",
    component: () => <div>Page équipes</div>,
  });
  const players = createRoute({
    getParentRoute: () => rootRoute,
    path: "/joueurs",
    component: () => <div>Page joueurs</div>,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([
      home,
      matches,
      standings,
      teams,
      players,
    ]),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return render(
    <QueryClientProvider client={createTestQueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

/** Render a component that uses router primitives inside a minimal router. */
function renderInRouter(ui: React.ReactNode) {
  const rootRoute = createRootRoute({ component: () => <>{ui}</> });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return render(
    <QueryClientProvider client={createTestQueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe("Navigation shell", () => {
  it("renders the five bottom navigation sections in French", async () => {
    renderShell();
    const nav = await screen.findByRole("navigation", {
      name: "Navigation principale",
    });
    for (const label of [
      "Accueil",
      "Matchs",
      "Classements",
      "Équipes",
      "Joueurs",
    ]) {
      expect(within(nav).getByText(label)).toBeInTheDocument();
    }
  });

  it("navigates between sections when a tab is clicked", async () => {
    const user = userEvent.setup();
    renderShell();

    await user.click(await screen.findByRole("link", { name: /Matchs/ }));
    expect(await screen.findByText("Page matchs")).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /Classements/ }));
    expect(await screen.findByText("Page classements")).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /Équipes/ }));
    expect(await screen.findByText("Page équipes")).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /Joueurs/ }));
    expect(await screen.findByText("Page joueurs")).toBeInTheDocument();
  });

  it("shows the Foot Congo header and a reserved ad slot", async () => {
    renderShell();
    expect(
      await screen.findByRole("heading", { name: "Foot Congo" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("complementary", { name: "Emplacement publicitaire" }),
    ).toBeInTheDocument();
  });
});

describe("AppHeader", () => {
  it("renders a back control on detail pages", async () => {
    renderInRouter(<AppHeader title="Actualité" backTo="/" />);
    expect(
      await screen.findByRole("link", { name: "Retour" }),
    ).toBeInTheDocument();
  });
});

describe("AdBanner", () => {
  it("renders a labelled reserved placement", () => {
    render(<AdBanner placement="home" />);
    expect(screen.getByText("Espace publicitaire")).toBeInTheDocument();
  });
});

describe("BottomNav", () => {
  it("exposes one link per section", async () => {
    renderInRouter(<BottomNav />);
    expect(await screen.findAllByRole("link")).toHaveLength(5);
  });
});
