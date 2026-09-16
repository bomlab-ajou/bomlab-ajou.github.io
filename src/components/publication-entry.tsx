import type { Publication } from "@/content/publications";
import { isLabAuthor } from "@/lib/publications";
import { cn } from "@/lib/utils";

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="label rounded border border-line px-2 py-1 text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {label}
    </a>
  );
}

export function PublicationEntry({
  publication,
  omitYear = false,
}: {
  publication: Publication;
  /** Set when the surrounding list already groups entries under a year heading. */
  omitYear?: boolean;
}) {
  const { title, authors, venue, year, details, award, equalContrib } = publication;

  // Rendered in this order, skipping whatever the entry does not define.
  const linkFields = [
    ["pdf", "PDF"],
    ["doi", "DOI"],
    ["arxiv", "arXiv"],
    ["page", "Page"],
    ["project", "Project"],
    ["code", "Code"],
  ] as const;

  const links = linkFields
    .filter(([field]) => publication[field])
    .map(([field, label]) => ({ href: publication[field] as string, label }));

  const hasEqualContrib = Boolean(equalContrib?.length);

  return (
    <article>
      <h3 className="text-[15px] leading-snug font-medium text-balance sm:text-base">{title}</h3>

      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {authors.map((author, index) => (
          <span key={`${author}-${index}`}>
            <span className={cn(isLabAuthor(author) && "font-medium text-ink")}>
              {author}
              {equalContrib?.includes(index) ? "*" : ""}
            </span>
            {index < authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>

      <p className="mt-1 text-sm text-muted">
        <span className="italic">{venue}</span>
        {details ? `, ${details}` : ""}
        {omitYear ? "" : `, ${year}`}
      </p>

      {hasEqualContrib ? (
        <p className="mt-1 text-xs text-muted">* Equal contribution</p>
      ) : null}

      {(links.length > 0 || award) && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {award ? (
            <span className="label rounded border border-accent/30 bg-accent-soft px-2 py-1 text-accent">
              {award}
            </span>
          ) : null}
          {links.map((link) => (
            <ExternalLink key={link.label} {...link} />
          ))}
        </div>
      )}
    </article>
  );
}
