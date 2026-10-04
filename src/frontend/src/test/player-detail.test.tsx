import PlayerDetail from "@/pages/PlayerDetail";
import { createActorMock, makePlayer, renderRoute } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actor = createActorMock();

vi.mock("@/hooks/useBackend", () => ({
  useBackend: () => ({ actor, isFetching: false }),
}));

describe("Player detail page", () => {
  beforeEach(() => {
    actor.getPlayer.mockResolvedValue(
      makePlayer({
        id: 3n,
        name: "Cédric Bakambu",
        position: "Attaquant",
        teamName: "TP Mazembe",
        stats: { goals: 12n, assists: 4n, matches: 14n },
      }),
    );
  });

  it("renders the player identity and season statistics", async () => {
    renderRoute({
      path: "/joueurs/$id",
      component: PlayerDetail,
      initialEntry: "/joueurs/3",
    });

    expect(
      await screen.findByRole("heading", { level: 2, name: "Cédric Bakambu" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Attaquant")).toBeInTheDocument();
    expect(screen.getByText("TP Mazembe")).toBeInTheDocument();

    expect(screen.getByTestId("player_detail.stat.goals")).toHaveTextContent(
      "12",
    );
    expect(screen.getByTestId("player_detail.stat.assists")).toHaveTextContent(
      "4",
    );
    expect(screen.getByTestId("player_detail.stat.matches")).toHaveTextContent(
      "14",
    );
    expect(actor.getPlayer).toHaveBeenCalledWith(3n);
  });

  it("shows a French empty state when the player does not exist", async () => {
    actor.getPlayer.mockResolvedValue(null);

    renderRoute({
      path: "/joueurs/$id",
      component: PlayerDetail,
      initialEntry: "/joueurs/999",
    });

    expect(await screen.findByText("Joueur introuvable")).toBeInTheDocument();
  });
});
