import Standings from "@/pages/Standings";
import { createActorMock, makeStanding, renderRoute } from "@/test/helpers";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actor = createActorMock();

vi.mock("@/hooks/useBackend", () => ({
  useBackend: () => ({ actor, isFetching: false }),
}));

describe("Standings page", () => {
  beforeEach(() => {
    actor.listCompetitions.mockResolvedValue(["LINAFOOT D1", "Coupe du Congo"]);
    actor.getStanding.mockImplementation(async (competition: string) =>
      makeStanding({
        competition,
        rows: [
          {
            position: 1n,
            teamName:
              competition === "Coupe du Congo" ? "AS Vita Club" : "TP Mazembe",
            played: 12n,
            won: 9n,
            drawn: 2n,
            lost: 1n,
            points: 29n,
          },
          {
            position: 2n,
            teamName: "CS Don Bosco",
            played: 12n,
            won: 8n,
            drawn: 2n,
            lost: 2n,
            points: 26n,
          },
        ],
      }),
    );
  });

  it("renders a full standings table for the default competition", async () => {
    renderRoute({ path: "/classements", component: Standings });

    const table = await screen.findByTestId("standings.table");
    expect(within(table).getByText("TP Mazembe")).toBeInTheDocument();
    expect(within(table).getByText("CS Don Bosco")).toBeInTheDocument();
    // Column headers are present.
    expect(within(table).getByText("Équipe")).toBeInTheDocument();
    expect(within(table).getByText("Pts")).toBeInTheDocument();
  });

  it("updates the table when another competition is selected", async () => {
    const user = userEvent.setup();
    renderRoute({ path: "/classements", component: Standings });

    await screen.findByText("TP Mazembe");
    await user.click(screen.getByTestId("standings.competition.tab.2"));

    await waitFor(() => {
      expect(actor.getStanding).toHaveBeenLastCalledWith("Coupe du Congo");
    });
    const table = await screen.findByTestId("standings.table");
    expect(within(table).getByText("AS Vita Club")).toBeInTheDocument();
  });

  it("shows the qualification and relegation legend", async () => {
    renderRoute({ path: "/classements", component: Standings });

    const legend = await screen.findByTestId("standings.legend");
    expect(within(legend).getByText(/Qualification/)).toBeInTheDocument();
    expect(within(legend).getByText(/Relégation/)).toBeInTheDocument();
  });
});
