import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Home,
  ListOrdered,
  type LucideIcon,
  Shield,
  Users,
} from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  ocid: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Accueil", icon: Home, ocid: "nav.home" },
  { to: "/matchs", label: "Matchs", icon: CalendarDays, ocid: "nav.matches" },
  {
    to: "/classements",
    label: "Classements",
    icon: ListOrdered,
    ocid: "nav.standings",
  },
  { to: "/equipes", label: "Équipes", icon: Shield, ocid: "nav.teams" },
  { to: "/joueurs", label: "Joueurs", icon: Users, ocid: "nav.players" },
];

/** Fixed bottom navigation with the five primary sections. */
export function BottomNav() {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 shadow-elevated backdrop-blur supports-[backdrop-filter]:bg-card/85"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="mx-auto flex h-[var(--nav-height)] max-w-lg items-stretch">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                data-ocid={item.ocid}
                activeOptions={{ exact: item.to === "/" }}
                className="group flex h-full flex-col items-center justify-center gap-1 px-1 text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                activeProps={{ className: "text-primary" }}
              >
                <Icon
                  className="size-5 transition-transform group-active:scale-90"
                  aria-hidden="true"
                />
                <span className="text-[0.65rem] font-medium leading-none">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
