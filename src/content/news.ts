/* ---------------------------------------------------------------------------
 * NEWS
 *
 * Sorted by date automatically, newest first. Keep dates in ISO form
 * (YYYY-MM-DD) so the sort is reliable.
 * ------------------------------------------------------------------------- */

export type NewsTag = "publication" | "award" | "talk" | "people" | "grant" | "general";

export type NewsItem = {
  date: string;
  title: string;
  body?: string;
  tag?: NewsTag;
  link?: { href: string; label: string };
};

export const newsTagLabels: Record<NewsTag, string> = {
  publication: "Publication",
  award: "Award",
  talk: "Talk",
  people: "People",
  grant: "Grant",
  general: "News",
};

const entries: NewsItem[] = [
  {
    date: "2026-09-16",
    title: "We are recruiting graduate and undergraduate students",
    body: "Positions are open for M.S., Ph.D., and integrated students, and for Ajou undergraduates looking for a semester-long research project. Admissions for the spring 2027 semester take place in October, so please get in touch soon.",
    tag: "people",
    link: { href: "/join/", label: "See open positions" },
  },
  {
    date: "2026-09-01",
    title: "The Body, Object, and Motion Lab opens at Ajou University",
    body: "The lab joins the Department of Software and Computer Engineering, working on robot learning and high-dimensional computer vision.",
    tag: "general",
  },
];

export const news: NewsItem[] = [...entries].sort((a, b) => b.date.localeCompare(a.date));
