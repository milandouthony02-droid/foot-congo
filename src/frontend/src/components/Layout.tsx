import { AdBanner } from "@/components/AdBanner";
import { BottomNav } from "@/components/BottomNav";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Mobile-first app shell: scrollable content area with bottom padding for the
 * fixed navigation, a reserved ad slot, and the attribution footer.
 */
export function Layout({ children }: LayoutProps) {
  const year = new Date().getFullYear();
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="pb-nav mx-auto w-full max-w-lg flex-1">
        {children}
        <div className="px-4 pt-6">
          <AdBanner placement="footer" />
        </div>
        <footer className="px-4 py-6 text-center text-xs text-muted-foreground">
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            © {year}. Built with love using caffeine.ai
          </a>
        </footer>
      </main>
      <BottomNav />
    </div>
  );
}
