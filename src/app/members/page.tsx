import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { MemberCard, PrincipalInvestigatorCard } from "@/components/member-card";
import { PageHeader } from "@/components/page-header";
import { alumni, members, roleGroupTitles, roleOrder, type MemberRole } from "@/content/members";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "People",
  description: `The researchers and students of ${site.fullName} at ${site.university}.`,
};

/** Roles advertised in the empty state, while the lab is still forming. */
const openRoles: MemberRole[] = ["phd", "ms", "undergrad"];

export default function MembersPage() {
  const pi = members.find((member) => member.role === "pi");

  // Only render groups that actually have people in them.
  const groups = roleOrder
    .filter((role): role is MemberRole => role !== "pi")
    .map((role) => ({ role, people: members.filter((member) => member.role === role) }))
    .filter((group) => group.people.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Members"
        lead={
          groups.length === 0
            ? "We are recruiting at every level. The positions currently open are listed below."
            : "We are a small group, which means everyone's project is everyone else's problem too."
        }
      />

      <Container className="py-14 sm:py-20">
        {pi ? (
          <section className="pb-14 sm:pb-16">
            <h2 className="label mb-8 text-muted">{roleGroupTitles.pi}</h2>
            <PrincipalInvestigatorCard member={pi} />
          </section>
        ) : null}

        <div className="divide-y divide-line border-t border-line">
          {groups.map(({ role, people }) => (
            <section key={role} className="py-12 sm:py-14">
              <h2 className="label mb-8 text-muted">{roleGroupTitles[role]}</h2>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {people.map((member) => (
                  <li key={member.id}>
                    <MemberCard member={member} />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {groups.length === 0 ? (
            <section className="py-12 sm:py-16">
              <h2 className="label mb-8 text-muted">Students — positions open</h2>

              <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                {openRoles.map((role) => (
                  <li key={role}>
                    <div className="flex aspect-square w-full items-center justify-center rounded-lg border-2 border-dashed border-line-strong/70 bg-surface/40">
                      <span className="font-mono text-3xl text-line-strong">+</span>
                    </div>
                    <p className="mt-4 text-[15px] font-medium tracking-tight">
                      {roleGroupTitles[role]}
                    </p>
                    <p className="mt-0.5 text-sm text-accent">Open</p>
                  </li>
                ))}
              </ul>

              <div className="mt-12 max-w-2xl">
                <h3 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                  We are recruiting graduate students and undergraduate researchers.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted text-pretty">
                  The lab works on robot learning and high-dimensional computer vision. If
                  that is what you want to work on, send us an email with your CV — the open
                  positions and what to include are listed on the join page.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/join">
                    How to apply
                    <ArrowRightIcon className="size-4" />
                  </ButtonLink>
                  <ButtonLink href="/research" variant="secondary">
                    What we work on
                  </ButtonLink>
                </div>
              </div>
            </section>
          ) : null}

          {alumni.length > 0 ? (
            <section className="py-12 sm:py-14">
              <h2 className="label mb-8 text-muted">Alumni</h2>
              <ul className="divide-y divide-line border-t border-line">
                {alumni.map((person) => (
                  <li
                    key={`${person.name}-${person.degree}`}
                    className="grid gap-x-10 gap-y-1 py-5 sm:grid-cols-[9rem_1fr]"
                  >
                    <p className="label text-muted sm:pt-0.5">{person.degree}</p>
                    <div>
                      <p className="text-[15px] font-medium">
                        {person.link ? (
                          <a
                            href={person.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-1 transition-colors hover:text-accent"
                          >
                            {person.name}
                            <ArrowUpRightIcon className="size-3.5 text-muted transition-colors group-hover:text-accent" />
                          </a>
                        ) : (
                          person.name
                        )}
                      </p>
                      {person.thesis ? (
                        <p className="mt-1 text-sm text-muted italic">{person.thesis}</p>
                      ) : null}
                      {person.now ? (
                        <p className="mt-1 text-sm text-muted">Now: {person.now}</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </Container>
    </>
  );
}
