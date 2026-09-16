import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type SectionLink = { href: "/research" | "/publications" | "/members" | "/news" | "/join"; label: string };

export function Section({
  eyebrow,
  title,
  link,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  link?: SectionLink;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-line py-16 sm:py-20", className)}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p className="label text-accent">{eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          </div>
          {link ? (
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
