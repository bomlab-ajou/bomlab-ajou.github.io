import Link from "next/link";
import { AdmissionsNotice } from "@/components/admissions-notice";
import { ButtonAnchor, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { ArrowRightIcon, MailIcon } from "@/components/icons";
import { NewsList } from "@/components/news-list";
import { PublicationEntry } from "@/components/publication-entry";
import { Section } from "@/components/section";
import { joinIntro, openings } from "@/content/join";
import { news } from "@/content/news";
import { featuredResearch } from "@/content/research";
import { site } from "@/content/site";
import { selectedPublications } from "@/lib/publications";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const recentNews = news.slice(0, 3);
  // Everything flagged `selected: true` in content/publications.ts.

  return (
    <>
      <section className="border-b border-line">
        <Container className="py-20 sm:py-28 lg:py-32">
          {site.recruiting.active ? (
            <Link
              href="/join"
              className="label group mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 text-accent transition-colors hover:border-accent/60"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              {site.recruiting.label}
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}

          <p className="label text-accent">
            {site.fullName} · {site.university}
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/research">
              Explore our research
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href="/join" variant="secondary">
              Join the lab
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Research"
        title="What we work on"
        link={{ href: "/research", label: "All research areas" }}
        className="border-t-0"
      >
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {featuredResearch.map((area) => (
            <Link
              key={area.slug}
              href="/research"
              className="group flex flex-col bg-canvas p-6 transition-colors hover:bg-surface sm:p-7"
            >
              <span
                aria-hidden="true"
                className="font-mono text-3xl leading-none font-medium text-accent/30"
              >
                {area.letter}
              </span>
              <h3 className="mt-4 text-lg leading-snug font-medium tracking-tight text-balance">
                {area.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted text-pretty">
                {area.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent">
                Read more
                <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {selectedPublications.length > 0 ? (
        <Section
          eyebrow="Publications"
          title="Selected work"
          link={{ href: "/publications", label: "All publications" }}
        >
          <ul className="divide-y divide-line border-y border-line">
            {selectedPublications.map((publication) => (
              <li key={publication.id} className="py-8 first:pt-0 last:pb-0">
                <PublicationEntry publication={publication} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {recentNews.length > 0 ? (
        <Section eyebrow="News" title="Recently" link={{ href: "/news", label: "All news" }}>
          <div className="border-t border-line">
            <NewsList items={recentNews} compact />
          </div>
        </Section>
      ) : null}

      <section className="border-t border-line bg-surface">
        <Container className="py-16 sm:py-24">
          <p className="label text-accent">Join us</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            We are recruiting graduate students and undergraduate researchers.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted text-pretty">
            {joinIntro[1]}
          </p>

          <AdmissionsNotice className="mt-9" />

          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {openings.map((opening) => (
              <li key={opening.title} className="border-t border-line pt-5">
                {/* Badge above the title so it lands in the same place in every
                    card, whatever length the title wraps to. */}
                <p className={cn("label", opening.open ? "text-accent" : "text-muted")}>
                  {opening.open ? "Open" : "Closed"}
                </p>
                <h3 className="mt-2.5 text-[15px] font-medium tracking-tight text-balance">
                  {opening.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted text-pretty">
                  {opening.summary}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/join">
              How to apply
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
            <ButtonAnchor href={`mailto:${site.contact.email}`} variant="secondary">
              <MailIcon className="size-4" />
              {site.contact.email}
            </ButtonAnchor>
          </div>
        </Container>
      </section>

    </>
  );
}
