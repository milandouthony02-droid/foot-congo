import { MatchDetail } from "@/pages/MatchDetail";
import { createActorMock, makeMatch, renderRoute } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actor = createActorMock();

vi.mock("@/hooks/useBackend", () => ({
  useBackend: () => ({ actor, isFetching: false }),
}));

describe("Match detail page", () => {
  beforeEach(() => {
    actor.getMatch.mockResolvedValue(
      makeMatch({
        id: 5n,
        homeTeam: "TP Mazembe",
        awayTeam: "AS Vita Club",
        homeScore: 2n,
        awayScore: 1n,
        scorers: [
          { playerName: "Cédric Bakambu", teamName: "TP Mazembe", minute: 23n },
          {
            playerName: "Fiston Mayele",
            teamName: "AS Vita Club",
            minute: 67n,
          },
        ],
        lineup: {
          home: ["Gardien A", "Défenseur B"],
          away: ["Gardien C", "Défenseur D"],
        },
        summary: "Victoire serrée du TP Mazembe.",
      }),
    );
  });

  it("renders the scoreline, scorers, lineups and summary", async () => {
    renderRoute({
      path: "/matchs/$id",
      component: MatchDetail,
      initialEntry: "/matchs/5",
    });

    const panel = await screen.findByTestId("match.score_panel");
    expect(within(panel).getByText("TP Mazembe")).toBeInTheDocument();
    expect(within(panel).getByText("AS Vita Club")).toBeInTheDocument();
    expect(within(panel).getByText("2 - 1")).toBeInTheDocument();

    expect(screen.getByTestId("match.scorer.1")).toHaveTextContent(
      "Cédric Bakambu",
    );
    expect(screen.getByTestId("match.scorer.2")).toHaveTextContent(
      "Fiston Mayele",
    );

    const homeLineup = screen.getByTestId("match.lineup.home");
    expect(within(homeLineup).getByText("Gardien A")).toBeInTheDocument();
    const awayLineup = screen.getByTestId("match.lineup.away");
    expect(within(awayLineup).getByText("Défenseur D")).toBeInTheDocument();

    expect(
      screen.getByText("Victoire serrée du TP Mazembe."),
    ).toBeInTheDocument();
    expect(actor.getMatch).toHaveBeenCalledWith(5n);
  });

  it("shows a French empty state when the match does not exist", async () => {
    actor.getMatch.mockResolvedValue(null);

    renderRoute({
      path: "/matchs/$id",
      component: MatchDetail,
      initialEntry: "/matchs/999",
    });

    expect(await screen.findByText("Match introuvable")).toBeInTheDocument();
  });
});
