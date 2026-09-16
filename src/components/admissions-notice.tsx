import { admissionsNotice } from "@/content/join";
import { cn } from "@/lib/utils";

/**
 * Deadline callout. Renders nothing when `admissionsNotice` is null, so the
 * notice can be retired from `content/join.ts` without touching any page.
 */
export function AdmissionsNotice({ className }: { className?: string }) {
  if (!admissionsNotice) return null;

  return (
    <aside
      className={cn(
        "rounded-lg border border-accent/30 bg-accent-soft p-5 sm:p-6",
        className,
      )}
    >
      <p className="label flex items-center gap-2 text-accent">
        <span className="size-1.5 rounded-full bg-accent" />
        {admissionsNotice.label}
      </p>
      <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-ink text-pretty">
        {admissionsNotice.body}
      </p>
    </aside>
  );
}
