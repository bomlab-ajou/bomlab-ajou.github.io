import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors";

const variants = {
  primary: "bg-ink text-canvas hover:bg-ink/85",
  secondary: "border border-line text-ink hover:border-line-strong hover:bg-surface",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: "/research" | "/publications" | "/members" | "/news" | "/join";
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={cn(base, variants[variant], className)}>
      {children}
    </a>
  );
}
