import Players from "@/pages/Players";
import {
  createActorMock,
  makePlayer,
  makeTeam,
  renderRoute,
} from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actor = createActorMock();

vi.mock("@/hooks/useBackend", () => ({
  useBackend: () => ({ actor, isFetching: false }),
}));

describe("Players page", () => {
  beforeEach(() => {
    actor.listPlayers.mockResolvedValue([
      makePlayer({
        id: 1n,
        name: "Cédric Bakambu",
        position: "Attaquant",
        teamName: "TP Mazembe",
      }),
      makePlayer({
        id: 2n,
        name: "Glody Likonza",
        position: "Milieu",
        teamName: "TP Mazembe",
      }),
      makePlayer({
        id: 3n,
        name: "Fiston Mayele",
        position: "Attaquant",
        teamName: "AS Vita Club",
      }),
    ]);
    actor.listTeams.mockResolvedValue([
      makeTeam({ id: 1n, name: "TP Mazembe" }),
      makeTeam({ id: 2n, name: "AS Vita Club" }),
    ]);
  });

  it("renders player cards with name, position and team", async () => {
    renderRoute({ path: "/joueurs", component: Players });

    const list = await screen.findByTestId("players.list");
    expect(within(list).getByText("Cédric Bakambu")).toBeInTheDocument();
    expect(
      within(list).getByText(/Attaquant · TP Mazembe/),
    ).toBeInTheDocument();
  });

  it("filters players by name", async () => {
    const user = userEvent.setup();
    renderRoute({ path: "/joueurs", component: Players });

    await screen.findByText("Cédric Bakambu");
    await user.type(screen.getByTestId("players.search_input"), "mayele");

    const list = await screen.findByTestId("players.list");
    expect(within(list).getByText("Fiston Mayele")).toBeInTheDocument();
    expect(within(list).queryByText("Cédric Bakambu")).not.toBeInTheDocument();
  });

  it("filters players by position", async () => {
    const user = userEvent.setup();
    renderRoute({ path: "/joueurs", component: Players });

    await screen.findByText("Cédric Bakambu");
    await user.click(screen.getByTestId("players.position_select"));
    await user.click(await screen.findByRole("option", { name: "Milieu" }));

    const list = await screen.findByTestId("players.list");
    expect(within(list).getByText("Glody Likonza")).toBeInTheDocument();
    expect(within(list).queryByText("Cédric Bakambu")).not.toBeInTheDocument();
  });

  it("links each player card to its detail route", async () => {
    renderRoute({ path: "/joueurs", component: Players });

    const link = await screen.findByRole("link", { name: /Cédric Bakambu/ });
    expect(link).toHaveAttribute("href", "/joueurs/1");
  });
});
