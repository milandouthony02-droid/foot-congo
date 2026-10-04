import { AppHeader } from "@/components/AppHeader";
import { EmptyState, ErrorState, PageLoading } from "@/components/States";
import { useNewsItem } from "@/hooks/useFootballData";
import { formatDate } from "@/lib/format";
import { getRouteApi } from "@tanstack/react-router";
import { CalendarDays, Newspaper } from "lucide-react";

const routeApi = getRouteApi("/actualites/$id");

/** Full article view: image, title, date, category and complete content. */
export default function NewsDetail() {
  const { id } = routeApi.useParams();
  const newsId = BigInt(id);
  const { data: article, isLoading, isError, refetch } = useNewsItem(newsId);

  if (isLoading) {
    return (
      <div data-ocid="news_detail.page">
        <AppHeader title="Actualité" backTo="/" />
        <PageLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div data-ocid="news_detail.page">
        <AppHeader title="Actualité" backTo="/" />
        <div className="px-4 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div data-ocid="news_detail.page">
        <AppHeader title="Actualité" backTo="/" />
        <div className="px-4 pt-6">
          <EmptyState
            title="Actualité introuvable"
            description="Cet article n'existe plus ou a été retiré."
            icon={<Newspaper className="size-6" aria-hidden="true" />}
          />
        </div>
      </div>
    );
  }

  return (
    <div data-ocid="news_detail.page" className="pb-6">
      <AppHeader title="Actualité" backTo="/" />

      <article className="pt-4">
        <div className="px-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
            <img
              src={article.image || "/assets/images/placeholder.svg"}
              alt={article.title}
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-3 px-4 pt-4">
          <span className="inline-block rounded-full bg-primary/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
            {article.category}
          </span>
          <h1 className="font-display text-xl font-bold leading-tight tracking-tight">
            {article.title}
          </h1>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {formatDate(article.publishedAt)}
          </p>
        </div>

        <div className="space-y-4 px-4 pt-5">
          <p className="font-display text-base font-semibold leading-relaxed text-foreground">
            {article.summary}
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            {article.content
              .split(/\n{2,}/)
              .map((paragraph) => paragraph.trim())
              .filter((paragraph) => paragraph.length > 0)
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
}
