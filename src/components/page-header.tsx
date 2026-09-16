import type { ReactNode } from "react";
import { Container } from "@/components/container";

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line">
      <Container className="py-14 sm:py-20">
        <p className="label text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{lead}</p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}
