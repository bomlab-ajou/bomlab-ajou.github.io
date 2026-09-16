"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/members", label: "People" },
  { href: "/news", label: "News" },
  // Highlighted: recruiting is the lab's priority while it is forming.
  { href: "/join", label: "Join us", highlight: true },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // `trailingSlash: true` means pathname arrives as "/research/".
  const current = pathname.replace(/\/+$/, "") || "/";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-6 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="text-[15px] font-semibold tracking-tight">{site.name}</span>
          <span className="label hidden text-muted sm:inline">{site.university}</span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center md:flex" aria-label="Main">
            {navItems.map((item) => {
              const active = current === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-sm transition-colors",
                    active
                      ? "text-ink"
                      : "highlight" in item
                        ? "text-accent hover:text-accent/80"
                        : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-[9px] h-px bg-accent" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="ml-1 hidden md:block">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-line bg-canvas md:hidden"
        >
          <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6">
            {navItems.map((item) => {
              const active = current === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-[15px] transition-colors",
                    active
                      ? "bg-surface text-ink"
                      : "highlight" in item
                        ? "text-accent"
                        : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
