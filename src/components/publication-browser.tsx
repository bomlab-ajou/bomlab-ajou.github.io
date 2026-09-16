"use client";

import { useMemo, useState } from "react";
import { PublicationEntry } from "@/components/publication-entry";
import {
  publicationTypeLabels,
  type Publication,
  type PublicationType,
} from "@/content/publications";
import { groupByYear } from "@/lib/publications";
import { cn } from "@/lib/utils";

type Filter = PublicationType | "all";

export function PublicationBrowser({
  publications,
  types,
}: {
  publications: Publication[];
  types: PublicationType[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return publications.filter((publication) => {
      if (filter !== "all" && publication.type !== filter) return false;
      if (!needle) return true;
      const haystack = [
        publication.title,
        publication.venue,
        String(publication.year),
        ...publication.authors,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [publications, filter, query]);

  const grouped = useMemo(() => [...groupByYear(visible)], [visible]);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    ...types.map((type) => ({ value: type as Filter, label: publicationTypeLabels[type] })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by type">
          {filters.map((item) => {
            const active = filter === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                aria-pressed={active}
                className={cn(
                  "label rounded-full border px-3 py-1.5 transition-colors",
                  active
                    ? "border-ink bg-ink text-canvas"
                    : "border-line text-muted hover:border-line-strong hover:text-ink",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="sm:w-64">
          <label htmlFor="publication-search" className="sr-only">
            Search publications
          </label>
          <input
            id="publication-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, author, venue…"
            className="w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm text-ink transition-colors placeholder:text-muted hover:border-line-strong focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {grouped.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          No publications match that filter.
        </p>
      ) : (
        <div className="divide-y divide-line">
          {grouped.map(([year, items]) => (
            <section key={year} className="grid gap-x-10 py-10 sm:grid-cols-[4rem_1fr]">
              <h2 className="label sticky top-20 self-start text-muted">{year}</h2>
              <ul className="mt-4 space-y-9 sm:mt-0">
                {items.map((publication) => (
                  <li key={publication.id}>
                    <PublicationEntry publication={publication} omitYear />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
