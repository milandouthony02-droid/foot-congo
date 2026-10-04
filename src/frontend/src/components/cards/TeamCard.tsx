import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Users } from "lucide-react";

interface TeamCardProps {
  id: bigint;
  name: string;
  city: string;
  logo: string;
  squadSize: number;
  index?: number;
  className?: string;
}

/** Team summary card linking to the team detail page. */
export function TeamCard({
  id,
  name,
  city,
  logo,
  squadSize,
  index,
  className,
}: TeamCardProps) {
  return (
    <Link
      to="/equipes/$id"
      params={{ id: id.toString() }}
      data-ocid={index !== undefined ? `team.item.${index}` : "team.item"}
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-subtle transition-smooth hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
        <img
          src={logo || "/assets/images/placeholder.svg"}
          alt=""
          loading="lazy"
          className="size-full object-contain p-1"
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold">{name}</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" aria-hidden="true" />
          <span className="truncate">{city}</span>
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-[0.65rem] text-muted-foreground">
          <Users className="size-3 shrink-0" aria-hidden="true" />
          {squadSize} joueur{squadSize > 1 ? "s" : ""}
        </p>
      </div>
      <ChevronRight
        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
