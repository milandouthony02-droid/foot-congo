import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/** Friendly empty state with a visual, headline and optional action. */
export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-ocid="empty_state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-6 py-12 text-center",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <Inbox className="size-6" aria-hidden="true" />}
      </span>
      <div className="space-y-1">
        <p className="font-display text-base font-semibold">{title}</p>
        {description ? (
          <p className="mx-auto max-w-xs text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

/** Recoverable error state with a retry action. */
export function ErrorState({
  title = "Impossible de charger les données",
  description = "Vérifiez votre connexion puis réessayez.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      data-ocid="error_state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/40 bg-destructive/5 px-6 py-10 text-center",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-destructive/15 text-destructive">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="font-display text-base font-semibold">{title}</p>
        <p className="mx-auto max-w-xs text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {onRetry ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-ocid="error_state.retry_button"
          onClick={onRetry}
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Réessayer
        </Button>
      ) : null}
    </div>
  );
}

interface LoadingStateProps {
  /** Number of skeleton rows to render. */
  rows?: number;
  className?: string;
}

/** Layout-matched skeleton list used while data loads. */
export function LoadingState({ rows = 4, className }: LoadingStateProps) {
  const ids = Array.from({ length: rows }, (_, i) => `loading-row-${i}`);
  return (
    <div
      data-ocid="loading_state"
      aria-busy="true"
      aria-live="polite"
      className={cn("space-y-3", className)}
    >
      <span className="sr-only">Chargement…</span>
      {ids.map((id) => (
        <div
          key={id}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
        >
          <Skeleton className="size-12 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Centered spinner for full-page loading. */
export function PageLoading({ label = "Chargement…" }: { label?: string }) {
  return (
    <div
      data-ocid="loading_state"
      aria-busy="true"
      className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground"
    >
      <span className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
