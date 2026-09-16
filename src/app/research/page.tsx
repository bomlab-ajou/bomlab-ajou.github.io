import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { researchAreas, researchIntro } from "@/content/research";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Body, Object, and Motion: dexterous manipulation and robot learning, 3D and 4D reconstruction, and video motion estimation.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Body, Object, Motion"
        lead={`Three directions, and the name of the lab. ${site.name} works on efficient algorithms for robot learning and high-dimensional computer vision.`}
      />

      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted text-pretty">
          {researchIntro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 divide-y divide-line border-t border-line sm:mt-20">
          {researchAreas.map((area) => (
            <section
              key={area.slug}
              id={area.slug}
              className="grid gap-x-12 gap-y-4 py-12 sm:grid-cols-[5rem_1fr] sm:py-14"
            >
              <p
                aria-hidden="true"
                className="font-mono text-5xl leading-none font-medium text-accent/30 sm:pt-1"
              >
                {area.letter}
              </p>

              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-balance">
                  {area.title}
                </h2>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted text-pretty">
                  {area.body.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
                {area.keywords.length > 0 ? (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {area.keywords.map((keyword) => (
                      <li
                        key={keyword}
                        className="label rounded-full border border-line px-3 py-1.5 text-muted"
                      >
                        {keyword}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
