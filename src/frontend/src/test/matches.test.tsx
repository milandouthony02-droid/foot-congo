import { MatchStatus } from "@/backend";
import { Matches } from "@/pages/Matches";
import { createActorMock, makeMatch, renderRoute } from "@/test/helpers";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actor = createActorMock();

vi.mock("@/hooks/useBackend", () => ({
  useBackend: () => ({ actor, isFetching: false }),
}));

const validateSearch = (search: Record<string, unknown>) => ({
  competition:
    typeof search.competition === "string" ? search.competition : undefined,
  status:
    search.status === "upcoming" ||
    search.status === "live" ||
    search.status === "finished"
      ? search.status
      : undefined,
  sort:
    search.sort === "date-asc" || search.sort === "date-desc"
      ? search.sort
      : undefined,
});

function renderMatches(initialEntry = "/matchs") {
  return renderRoute({
    path: "/matchs",
    component: Matches,
    initialEntry,
    validateSearch,
  });
}

describe("Matches page", () => {
  beforeEach(() => {
    actor.listCompetitions.mockResolvedValue(["LINAFOOT D1", "Coupe du Congo"]);
    actor.listMatches.mockResolvedValue([
      makeMatch({
        id: 1n,
        homeTeam: "TP Mazembe",
        awayTeam: "AS Vita Club",
        status: MatchStatus.finished,
        homeScore: 2n,
        awayScore: 1n,
        kickoff: 1_759_000_000_000_000_000n,
      }),
      makeMatch({
        id: 2n,
        homeTeam: "CS Don Bosco",
        awayTeam: "DC Motema Pembe",
        status: MatchStatus.upcoming,
        homeScore: undefined,
        awayScore: undefined,
        kickoff: 1_760_300_000_000_000_000n,
      }),
    ]);
  });

  it("renders matches with score and status", async () => {
    renderMatches();

    expect(await screen.findByText("TP Mazembe")).toBeInTheDocument();
    expect(screen.getByText("CS Don Bosco")).toBeInTheDocument();
    // Finished match shows its scoreline.
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    // Status labels are rendered in French inside the match list.
    const list = screen.getByRole("list");
    expect(within(list).getByText("Terminé")).toBeInTheDocument();
    expect(within(list).getByText("À venir")).toBeInTheDocument();
  });

  it("passes the selected status filter to the actor and reflects it in the URL", async () => {
    const user = userEvent.setup();
    const { router } = renderMatches();

    await screen.findByText("TP Mazembe");
    await user.click(screen.getByTestId("matches.status_filter.finished"));

    await waitFor(() => {
      expect(actor.listMatches).toHaveBeenLastCalledWith(null, "finished");
    });
    expect(router.state.location.search).toMatchObject({ status: "finished" });
  });

  it("passes the selected competition filter to the actor", async () => {
    const user = userEvent.setup();
    renderMatches();

    await screen.findByText("TP Mazembe");
    await user.click(
      screen.getByTestId("matches.competition_filter.Coupe du Congo"),
    );

    await waitFor(() => {
      expect(actor.listMatches).toHaveBeenLastCalledWith(
        "Coupe du Congo",
        null,
      );
    });
  });

  it("restores filters from the URL on load", async () => {
    renderMatches("/matchs?status=upcoming&competition=LINAFOOT%20D1");

    await waitFor(() => {
      expect(actor.listMatches).toHaveBeenCalledWith("LINAFOOT D1", "upcoming");
    });
    expect(
      screen.getByTestId("matches.status_filter.upcoming"),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("sorts matches by kickoff date", async () => {
    const user = userEvent.setup();
    renderMatches();

    await screen.findByText("TP Mazembe");
    const list = screen.getByRole("list");
    const before = within(list)
      .getAllByRole("link")
      .map((el) => el.textContent);
    expect(before[0]).toContain("TP Mazembe");

    await user.click(screen.getByTestId("matches.sort.date-desc"));

    await waitFor(() => {
      const after = within(screen.getByRole("list"))
        .getAllByRole("link")
        .map((el) => el.textContent);
      expect(after[0]).toContain("CS Don Bosco");
    });
  });

  it("shows an empty state when no match matches the filters", async () => {
    actor.listMatches.mockResolvedValue([]);
    renderMatches();

    expect(await screen.findByText("Aucun match trouvé")).toBeInTheDocument();
  });
});
