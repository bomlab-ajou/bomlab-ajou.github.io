import { ArrowRightIcon } from "@/components/icons";
import { newsTagLabels, type NewsItem } from "@/content/news";
import { formatDate } from "@/lib/utils";

export function NewsList({ items, compact = false }: { items: NewsItem[]; compact?: boolean }) {
  if (items.length === 0) {
    return <p className="py-10 text-sm text-muted">No news yet.</p>;
  }

  return (
    <ul className="divide-y divide-line">
      {items.map((item) => (
        <li key={`${item.date}-${item.title}`} className={compact ? "py-6" : "py-8"}>
          <article className="grid gap-x-10 gap-y-2 sm:grid-cols-[9rem_1fr]">
            <div>
              <time dateTime={item.date} className="label block text-muted">
                {formatDate(item.date)}
              </time>
              {item.tag ? (
                <span className="label mt-2 hidden text-accent sm:inline-block">
                  {newsTagLabels[item.tag]}
                </span>
              ) : null}
            </div>

            <div>
              <h3 className="text-[15px] leading-snug font-medium text-balance sm:text-base">
                {item.title}
              </h3>
              {item.body ? (
                <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">{item.body}</p>
              ) : null}
              {item.link ? (
                <a
                  href={item.link.href}
                  className="group mt-3 inline-flex items-center gap-1.5 text-sm text-accent"
                >
                  {item.link.label}
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              ) : null}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
