import { cn } from "@/lib/utils";
import { Megaphone } from "lucide-react";

interface AdBannerProps {
  /** Placement identifier reserved for a future ad slot. */
  placement?: string;
  className?: string;
}

/**
 * Reserved advertising placement. Renders a dashed, clearly-labelled slot so
 * real creatives can be dropped in later without a layout change.
 */
export function AdBanner({ placement = "global", className }: AdBannerProps) {
  return (
    <div
      data-ocid={`ad.banner.${placement}`}
      role="complementary"
      aria-label="Emplacement publicitaire"
      className={cn(
        "flex items-center justify-center gap-2 rounded-lg border border-dashed border-border/80 bg-muted/40 px-4 py-3 text-muted-foreground",
        className,
      )}
    >
      <Megaphone className="size-4 shrink-0" aria-hidden="true" />
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
        Espace publicitaire
      </span>
    </div>
  );
}
