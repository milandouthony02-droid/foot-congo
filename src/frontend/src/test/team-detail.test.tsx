import { MatchStatus } from "@/backend";
import TeamDetail from "@/pages/TeamDetail";
import {
  createActorMock,
  makeMatch,
  makeTeam,
  renderRoute,
} from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actor = createActorMock();

vi.mock("@/hooks/useBackend", () => ({
  useBackend: () => ({ actor, isFetching: false }),
}));

describe("Team detail page", () => {
  beforeEach(() => {
    actor.getTeam.mockResolvedValue(
      makeTeam({
        id: 1n,
        name: "TP Mazembe",
        city: "Lubumbashi",
        squad: ["Cédric Bakambu", "Glody Likonza"],
      }),
    );
    actor.listMatches.mockResolvedValue([
      makeMatch({
        id: 10n,
        homeTeam: "TP Mazembe",
        awayTeam: "AS Vita Club",
        status: MatchStatus.finished,
        kickoff: 1_759_000_000_000_000_000n,
      }),
      makeMatch({
        id: 11n,
        homeTeam: "CS Don Bosco",
        awayTeam: "TP Mazembe",
        status: MatchStatus.upcoming,
        kickoff: 1_761_000_000_000_000_000n,
      }),
      makeMatch({
        id: 12n,
        homeTeam: "Autre A",
        awayTeam: "Autre B",
        status: MatchStatus.finished,
      }),
    ]);
  });

  it("renders the team header, squad, results and upcoming fixtures", async () => {
    renderRoute({
      path: "/equipes/$id",
      component: TeamDetail,
      initialEntry: "/equipes/1",
    });

    const header = await screen.findByTestId("team.header");
    expect(within(header).getByText("TP Mazembe")).toBeInTheDocument();
    expect(within(header).getByText("Lubumbashi")).toBeInTheDocument();

    const squad = screen.getByTestId("team.squad_list");
    expect(within(squad).getByText("Cédric Bakambu")).toBeInTheDocument();
    expect(within(squad).getByText("Glody Likonza")).toBeInTheDocument();

    // Only matches involving this team appear in the results section.
    const results = screen.getByTestId("team.results_section");
    expect(within(results).getByText("AS Vita Club")).toBeInTheDocument();
    expect(within(results).queryByText("Autre A")).not.toBeInTheDocument();

    const upcoming = screen.getByTestId("team.upcoming_section");
    expect(within(upcoming).getByText("CS Don Bosco")).toBeInTheDocument();
    expect(actor.getTeam).toHaveBeenCalledWith(1n);
  });

  it("shows a French empty state when the team does not exist", async () => {
    actor.getTeam.mockResolvedValue(null);

    renderRoute({
      path: "/equipes/$id",
      component: TeamDetail,
      initialEntry: "/equipes/999",
    });

    expect(await screen.findByText("Équipe introuvable")).toBeInTheDocument();
  });
});
