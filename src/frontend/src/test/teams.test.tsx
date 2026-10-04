import Teams from "@/pages/Teams";
import { createActorMock, makeTeam, renderRoute } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actor = createActorMock();

vi.mock("@/hooks/useBackend", () => ({
  useBackend: () => ({ actor, isFetching: false }),
}));

describe("Teams page", () => {
  beforeEach(() => {
    actor.listTeams.mockResolvedValue([
      makeTeam({ id: 1n, name: "TP Mazembe", city: "Lubumbashi" }),
      makeTeam({ id: 2n, name: "AS Vita Club", city: "Kinshasa" }),
      makeTeam({ id: 3n, name: "CS Don Bosco", city: "Lubumbashi" }),
    ]);
  });

  it("renders team cards with name and city", async () => {
    renderRoute({ path: "/equipes", component: Teams });

    const list = await screen.findByTestId("teams.list");
    expect(within(list).getByText("TP Mazembe")).toBeInTheDocument();
    expect(within(list).getAllByText("Lubumbashi")).toHaveLength(2);
    expect(within(list).getByText("AS Vita Club")).toBeInTheDocument();
  });

  it("filters the list by name as the user types", async () => {
    const user = userEvent.setup();
    renderRoute({ path: "/equipes", component: Teams });

    await screen.findByText("TP Mazembe");
    await user.type(screen.getByTestId("teams.search_input"), "vita");

    const list = await screen.findByTestId("teams.list");
    expect(within(list).getByText("AS Vita Club")).toBeInTheDocument();
    expect(within(list).queryByText("TP Mazembe")).not.toBeInTheDocument();
  });

  it("filters by city as well as name", async () => {
    const user = userEvent.setup();
    renderRoute({ path: "/equipes", component: Teams });

    await screen.findByText("TP Mazembe");
    await user.type(screen.getByTestId("teams.search_input"), "kinshasa");

    const list = await screen.findByTestId("teams.list");
    expect(within(list).getByText("AS Vita Club")).toBeInTheDocument();
    expect(within(list).queryByText("CS Don Bosco")).not.toBeInTheDocument();
  });

  it("shows an empty state when the search matches nothing", async () => {
    const user = userEvent.setup();
    renderRoute({ path: "/equipes", component: Teams });

    await screen.findByText("TP Mazembe");
    await user.type(screen.getByTestId("teams.search_input"), "zzzz");

    expect(
      await screen.findByText("Aucune équipe trouvée"),
    ).toBeInTheDocument();
  });

  it("links each team card to its detail route", async () => {
    renderRoute({ path: "/equipes", component: Teams });

    const link = await screen.findByRole("link", { name: /TP Mazembe/ });
    expect(link).toHaveAttribute("href", "/equipes/1");
  });
});
