export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Dates are formatted in a fixed locale and time zone so the string rendered
 * at build time matches the one React produces during hydration, regardless of
 * where the visitor is.
 */
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  timeZone: "UTC",
});

export function formatMonthYear(iso: string): string {
  return shortDateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

export function initials(name: string): string {
  const parts = name
    .replace(/[^\p{L}\s.]/gu, "")
    .split(/[\s.]+/)
    .filter(Boolean);

  if (parts.length === 0) return "";

  // Given and family name, so "Seong Hyeon Park" reads as SP rather than SH.
  const picked = parts.length === 1 ? [parts[0]] : [parts[0], parts[parts.length - 1]];
  return picked.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

/** Groups items into an insertion-ordered map, preserving the input order. */
export function groupBy<T, K>(items: readonly T[], key: (item: T) => K): Map<K, T[]> {
  const groups = new Map<K, T[]>();
  for (const item of items) {
    const k = key(item);
    const bucket = groups.get(k);
    if (bucket) bucket.push(item);
    else groups.set(k, [item]);
  }
  return groups;
}
