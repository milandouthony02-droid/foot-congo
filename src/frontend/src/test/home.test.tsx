import { MatchStatus } from "@/backend";
import Home from "@/pages/Home";
import {
  createActorMock,
  makeMatch,
  makeNews,
  renderRoute,
} from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actor = createActorMock();

vi.mock("@/hooks/useBackend", () => ({
  useBackend: () => ({ actor, isFetching: false }),
}));

describe("Home page", () => {
  beforeEach(() => {
    actor.listNews.mockResolvedValue([
      makeNews({ id: 1n, title: "Première actualité", category: "LINAFOOT" }),
      makeNews({ id: 2n, title: "Deuxième actualité", category: "Transferts" }),
    ]);
    actor.listMatches.mockResolvedValue([
      makeMatch({
        id: 10n,
        homeTeam: "TP Mazembe",
        awayTeam: "AS Vita Club",
        status: MatchStatus.finished,
        homeScore: 2n,
        awayScore: 1n,
      }),
      makeMatch({
        id: 11n,
        homeTeam: "CS Don Bosco",
        awayTeam: "DC Motema Pembe",
        status: MatchStatus.upcoming,
        homeScore: undefined,
        awayScore: undefined,
      }),
    ]);
  });

  it("renders the news feed and match ticker from the actor", async () => {
    renderRoute({ path: "/", component: Home });

    expect(await screen.findByText("Première actualité")).toBeInTheDocument();
    expect(screen.getByText("Deuxième actualité")).toBeInTheDocument();

    const ticker = screen.getByTestId("home.matches.list");
    expect(within(ticker).getByText("TP Mazembe")).toBeInTheDocument();
    expect(within(ticker).getByText("CS Don Bosco")).toBeInTheDocument();
  });

  it("links each news card to its detail route", async () => {
    renderRoute({ path: "/", component: Home });

    const link = await screen.findByRole("link", {
      name: /Première actualité/,
    });
    expect(link).toHaveAttribute("href", "/actualites/1");
  });

  it("shows quick access links to standings and teams", async () => {
    renderRoute({ path: "/", component: Home });

    expect(
      await screen.findByTestId("home.quick_access.standings"),
    ).toHaveAttribute("href", "/classements");
    expect(screen.getByTestId("home.quick_access.teams")).toHaveAttribute(
      "href",
      "/equipes",
    );
  });

  it("shows an empty state when there is no news", async () => {
    actor.listNews.mockResolvedValue([]);
    renderRoute({ path: "/", component: Home });

    expect(
      await screen.findByText("Aucune actualité pour le moment"),
    ).toBeInTheDocument();
  });
});
