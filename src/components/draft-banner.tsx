import { site } from "@/content/site";

/**
 * Visible reminder that the site is still filled with template content.
 * Disappears entirely once `site.draft` is set to false in `src/content/site.ts`.
 */
export function DraftBanner() {
  if (!site.draft) return null;

  return (
    <div className="border-b border-amber-300/60 bg-amber-50 text-amber-900 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-200">
      <p className="mx-auto max-w-5xl px-6 py-2 text-center text-xs sm:px-8">
        <span className="font-medium">Draft content.</span> The text on this site is
        placeholder material — edit the files in{" "}
        <code className="font-mono text-[0.95em]">src/content/</code>, then set{" "}
        <code className="font-mono text-[0.95em]">draft: false</code> to hide this banner.
      </p>
    </div>
  );
}
