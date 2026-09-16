import type { Metadata } from "next";
import { AdmissionsNotice } from "@/components/admissions-notice";
import { ButtonAnchor } from "@/components/button";
import { Container } from "@/components/container";
import { ArrowUpRightIcon, MailIcon, MapPinIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import {
  applicationChecklist,
  joinHeadline,
  joinIntro,
  lookingFor,
  openings,
} from "@/content/join";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Join us",
  description: `Open graduate, undergraduate, and visiting positions at ${site.fullName}, ${site.university}.`,
};

const openCount = openings.filter((opening) => opening.open).length;

export default function JoinPage() {
  return (
    <>
      <PageHeader eyebrow="Join us" title={joinHeadline} lead={joinIntro[0]}>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
          {joinIntro[1]}
        </p>
        <ButtonAnchor href={`mailto:${site.contact.email}`} className="mt-9">
          <MailIcon className="size-4" />
          Email us
        </ButtonAnchor>
      </PageHeader>

      <Container className="py-14 sm:py-20">
        <AdmissionsNotice />

        <section className="mt-14 sm:mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Open positions
            </h2>
            <p className="label text-accent">
              {openCount} {openCount === 1 ? "position" : "positions"} open
            </p>
          </div>

          <ul className="mt-10 space-y-5">
            {openings.map((opening) => (
              <li
                key={opening.title}
                className="rounded-lg border border-line bg-surface/60 p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-medium tracking-tight text-balance">
                    {opening.title}
                  </h3>
                  <span
                    className={
                      opening.open
                        ? "label rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-accent"
                        : "label rounded-full border border-line px-2.5 py-1 text-muted"
                    }
                  >
                    {opening.open ? "Open" : "Closed"}
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted text-pretty">
                  {opening.summary}
                </p>

                {opening.details.length > 0 ? (
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {opening.details.map((detail, index) => (
                      <li
                        key={index}
                        className="relative max-w-2xl pl-5 text-sm leading-relaxed text-muted before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-accent/50"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 grid gap-x-16 gap-y-12 border-t border-line pt-14 sm:mt-20 lg:grid-cols-2">
          <div>
            <h2 className="label text-muted">What we look for</h2>
            <ul className="mt-7 space-y-4">
              {lookingFor.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
                  <span aria-hidden="true" className="pt-0.5 text-accent">
                    —
                  </span>
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-base font-medium tracking-tight">What to send</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              One email is enough to start. There is no form.
            </p>
            <ul className="mt-6 space-y-3">
              {applicationChecklist.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="label shrink-0 pt-0.5 text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ButtonAnchor href={`mailto:${site.contact.email}`} className="mt-7 w-full sm:w-auto">
              <MailIcon className="size-4" />
              {site.contact.email}
            </ButtonAnchor>
          </div>
        </section>

        <section className="mt-16 border-t border-line pt-14 sm:mt-20">
          <h2 className="label text-muted">Find us</h2>
          <div className="mt-7 grid gap-8 text-sm sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 font-medium">
                <MapPinIcon className="size-4 text-muted" />
                Address
              </p>
              <address className="mt-2 leading-relaxed text-muted not-italic">
                {site.contact.office ? (
                  <span className="block">{site.contact.office}</span>
                ) : null}
                {site.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={site.contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-3 inline-flex items-center gap-1.5 text-accent"
              >
                Open in Maps
                <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div>
              <p className="flex items-center gap-2 font-medium">
                <MailIcon className="size-4 text-muted" />
                Contact
              </p>
              <p className="mt-2 text-muted">
                <a href={`mailto:${site.contact.email}`} className="hover:text-ink">
                  {site.contact.email}
                </a>
              </p>
              {site.contact.phone ? (
                <p className="mt-1 text-muted">{site.contact.phone}</p>
              ) : null}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
