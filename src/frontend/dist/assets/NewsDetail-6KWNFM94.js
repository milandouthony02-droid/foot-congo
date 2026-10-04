import { z as useNewsItem, j as jsxRuntimeExports, A as AppHeader, P as PageLoading, E as ErrorState, b as EmptyState, C as CalendarDays, B as formatDate, h as getRouteApi } from "./index-CqDiorx8.js";
import { N as Newspaper } from "./newspaper-CFR0yjV6.js";
const routeApi = getRouteApi("/actualites/$id");
function NewsDetail() {
  const { id } = routeApi.useParams();
  const newsId = BigInt(id);
  const { data: article, isLoading, isError, refetch } = useNewsItem(newsId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "news_detail.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Actualité", backTo: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {})
    ] });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "news_detail.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Actualité", backTo: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => void refetch() }) })
    ] });
  }
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "news_detail.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Actualité", backTo: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          title: "Actualité introuvable",
          description: "Cet article n'existe plus ou a été retiré.",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "size-6", "aria-hidden": "true" })
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "news_detail.page", className: "pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, { title: "Actualité", backTo: "/" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: article.image || "/assets/images/placeholder.svg",
          alt: article.title,
          className: "size-full object-cover"
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 px-4 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-primary/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary", children: article.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold leading-tight tracking-tight", children: article.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5", "aria-hidden": "true" }),
          formatDate(article.publishedAt)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold leading-relaxed text-foreground", children: article.summary }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 text-sm leading-relaxed text-muted-foreground", children: article.content.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter((paragraph) => paragraph.length > 0).map((paragraph) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: paragraph }, paragraph)) })
      ] })
    ] })
  ] });
}
export {
  NewsDetail as default
};
