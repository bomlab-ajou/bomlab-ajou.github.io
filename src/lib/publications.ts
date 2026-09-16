import {
  publications,
  type Publication,
  type PublicationType,
} from "@/content/publications";
import { site } from "@/content/site";
import { groupBy } from "@/lib/utils";

const labAuthorSet = new Set<string>(site.labAuthors);

/** Authors listed in `site.labAuthors` are emphasized in the citation line. */
export function isLabAuthor(name: string): boolean {
  return labAuthorSet.has(name);
}

/**
 * Newest first. `Array.prototype.sort` is stable, so entries within the same
 * year keep the order they are written in `content/publications.ts`.
 */
export const sortedPublications: Publication[] = [...publications].sort(
  (a, b) => b.year - a.year,
);

export const selectedPublications = sortedPublications.filter((p) => p.selected);

export function groupByYear(items: Publication[]) {
  return groupBy(items, (item) => item.year);
}

/** Only the types actually present, so the filter never offers an empty result. */
export const presentTypes: PublicationType[] = (
  ["journal", "conference", "workshop", "preprint"] as const
).filter((type) => publications.some((p) => p.type === type));

export const publicationCount = publications.length;
