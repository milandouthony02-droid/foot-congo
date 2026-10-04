import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface AppHeaderProps {
  title?: string;
  /** When set, renders a back control that navigates to this route. */
  backTo?: string;
  /** Optional trailing content (actions, filters). */
  action?: ReactNode;
  className?: string;
}

/**
 * Mobile app header with the Foot Congo tricolor brand bar. On detail pages a
 * back control replaces the brand mark.
 */
export function AppHeader({
  title = "Foot Congo",
  backTo,
  action,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80",
        className,
      )}
    >
      <div className="bg-tricolor h-1 w-full" aria-hidden="true" />
      <div className="flex h-14 items-center gap-3 px-4">
        {backTo ? (
          <Link
            to={backTo}
            data-ocid="header.back_button"
            aria-label="Retour"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Link>
        ) : (
          <span
            className="bg-gradient-primary flex size-9 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold text-primary-foreground"
            aria-hidden="true"
          >
            FC
          </span>
        )}
        <h1 className="min-w-0 flex-1 truncate font-display text-lg font-bold tracking-tight">
          {title}
        </h1>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </header>
  );
}
