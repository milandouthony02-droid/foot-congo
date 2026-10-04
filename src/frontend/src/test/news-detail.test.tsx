import NewsDetail from "@/pages/NewsDetail";
import { createActorMock, makeNews, renderRoute } from "@/test/helpers";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actor = createActorMock();

vi.mock("@/hooks/useBackend", () => ({
  useBackend: () => ({ actor, isFetching: false }),
}));

describe("News detail page", () => {
  beforeEach(() => {
    actor.getNews.mockResolvedValue(
      makeNews({
        id: 7n,
        title: "Le TP Mazembe s'impose en finale",
        summary: "Résumé complet de la rencontre.",
        content: "Premier paragraphe.\n\nSecond paragraphe.",
        category: "LINAFOOT",
      }),
    );
  });

  it("renders the article title, category, summary and content", async () => {
    renderRoute({
      path: "/actualites/$id",
      component: NewsDetail,
      initialEntry: "/actualites/7",
    });

    expect(
      await screen.findByRole("heading", {
        name: "Le TP Mazembe s'impose en finale",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("LINAFOOT")).toBeInTheDocument();
    expect(
      screen.getByText("Résumé complet de la rencontre."),
    ).toBeInTheDocument();
    expect(screen.getByText("Premier paragraphe.")).toBeInTheDocument();
    expect(screen.getByText("Second paragraphe.")).toBeInTheDocument();
    expect(actor.getNews).toHaveBeenCalledWith(7n);
  });

  it("shows a French empty state when the article does not exist", async () => {
    actor.getNews.mockResolvedValue(null);

    renderRoute({
      path: "/actualites/$id",
      component: NewsDetail,
      initialEntry: "/actualites/999",
    });

    expect(
      await screen.findByText("Actualité introuvable"),
    ).toBeInTheDocument();
  });
});
