import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface NewsCardProps {
  id: bigint;
  title: string;
  summary: string;
  category: string;
  image: string;
  publishedLabel: string;
  /** Numeric position for deterministic test markers. */
  index?: number;
  className?: string;
}

/** News teaser card linking to the article detail page. */
export function NewsCard({
  id,
  title,
  summary,
  category,
  image,
  publishedLabel,
  index,
  className,
}: NewsCardProps) {
  return (
    <Link
      to="/actualites/$id"
      params={{ id: id.toString() }}
      data-ocid={index !== undefined ? `news.item.${index}` : "news.item"}
      className={cn(
        "group flex gap-3 overflow-hidden rounded-xl border border-border bg-card p-3 shadow-subtle transition-smooth hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
        <img
          src={image || "/assets/images/placeholder.svg"}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="space-y-1">
          <span className="inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-primary">
            {category}
          </span>
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug">
            {title}
          </h3>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {summary}
          </p>
        </div>
        <span className="text-[0.65rem] text-muted-foreground">
          {publishedLabel}
        </span>
      </div>
      <ChevronRight
        className="mt-1 size-4 shrink-0 self-center text-muted-foreground transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
