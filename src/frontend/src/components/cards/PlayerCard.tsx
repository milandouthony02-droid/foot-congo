import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface PlayerCardProps {
  id: bigint;
  name: string;
  position: string;
  teamName: string;
  photo: string;
  goals: bigint;
  assists: bigint;
  matches: bigint;
  index?: number;
  className?: string;
}

/** Player summary card linking to the player detail page. */
export function PlayerCard({
  id,
  name,
  position,
  teamName,
  photo,
  goals,
  assists,
  matches,
  index,
  className,
}: PlayerCardProps) {
  return (
    <Link
      to="/joueurs/$id"
      params={{ id: id.toString() }}
      data-ocid={index !== undefined ? `player.item.${index}` : "player.item"}
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-subtle transition-smooth hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span className="size-12 shrink-0 overflow-hidden rounded-full bg-muted">
        <img
          src={photo || "/assets/images/placeholder.svg"}
          alt=""
          loading="lazy"
          className="size-full object-cover"
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold">{name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {position} · {teamName}
        </p>
        <div className="mt-1 flex gap-3 text-[0.65rem] text-muted-foreground">
          <span>
            <span className="tabular-score font-mono font-semibold text-foreground">
              {goals.toString()}
            </span>{" "}
            buts
          </span>
          <span>
            <span className="tabular-score font-mono font-semibold text-foreground">
              {assists.toString()}
            </span>{" "}
            passes
          </span>
          <span>
            <span className="tabular-score font-mono font-semibold text-foreground">
              {matches.toString()}
            </span>{" "}
            matchs
          </span>
        </div>
      </div>
      <ChevronRight
        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
