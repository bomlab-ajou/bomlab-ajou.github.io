import Image from "next/image";
import { TeaserVideo } from "@/components/teaser-video";
import type { Teaser } from "@/content/publications";
import { versioned } from "@/lib/asset-version";
import { cn } from "@/lib/utils";

/**
 * A fixed 16:9 frame, so every card in a grid lines up regardless of the
 * figure's own proportions. Diagrams sit on white in both themes: they are
 * drawn for paper, and inverting or dimming them makes them harder to read.
 */
export function PublicationTeaser({
  teaser,
  sizes,
  className,
}: {
  teaser: Teaser;
  /** Rendered width hint for the image, as in `next/image`. */
  sizes: string;
  className?: string;
}) {
  const fit = teaser.fit ?? (teaser.kind === "image" ? "contain" : "cover");
  const media = cn(
    "absolute inset-0 h-full w-full",
    fit === "contain" ? "object-contain p-3" : "object-cover",
  );

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-lg border border-line",
        fit === "contain" ? "bg-white" : "bg-surface",
        className,
      )}
    >
      {teaser.kind === "image" ? (
        <Image src={versioned(teaser.src)} alt={teaser.alt} fill sizes={sizes} className={media} />
      ) : (
        <TeaserVideo
          src={versioned(teaser.src)}
          poster={versioned(teaser.poster)}
          label={teaser.alt}
          className={media}
        />
      )}
    </div>
  );
}
