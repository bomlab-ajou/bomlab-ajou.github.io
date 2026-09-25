import Image from "next/image";
import {
  FileTextIcon,
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  MailIcon,
  OrcidIcon,
  ScholarIcon,
} from "@/components/icons";
import { roleLabels, type Member } from "@/content/members";
import { versioned } from "@/lib/asset-version";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

// Iteration order here is the order the icons appear on a card.
const linkIcons = {
  website: { Icon: GlobeIcon, label: "Website" },
  scholar: { Icon: ScholarIcon, label: "Google Scholar" },
  cv: { Icon: FileTextIcon, label: "CV" },
  github: { Icon: GithubIcon, label: "GitHub" },
  linkedin: { Icon: LinkedinIcon, label: "LinkedIn" },
  orcid: { Icon: OrcidIcon, label: "ORCID" },
} as const;

function Avatar({
  member,
  className,
  sizes,
}: {
  member: Member;
  className?: string;
  sizes: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-line bg-surface",
        className,
      )}
    >
      {member.photo ? (
        <Image
          src={versioned(member.photo)}
          alt={member.name}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-mono text-2xl font-medium text-muted/60">
            {initials(member.name)}
          </span>
        </div>
      )}
    </div>
  );
}

function MemberLinks({ member }: { member: Member }) {
  const entries = (Object.keys(linkIcons) as Array<keyof typeof linkIcons>)
    .filter((key) => member.links?.[key])
    .map((key) => ({ key, href: member.links![key]!, ...linkIcons[key] }));

  if (entries.length === 0 && !member.email) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-1">
      {member.email ? (
        <a
          href={`mailto:${member.email}`}
          aria-label={`Email ${member.name}`}
          className="inline-flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          <MailIcon className="size-4" />
        </a>
      ) : null}
      {entries.map(({ key, href, Icon, label }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} on ${label}`}
          className="inline-flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}

/** Wide layout with a biography — used for the principal investigator. */
export function PrincipalInvestigatorCard({ member }: { member: Member }) {
  return (
    <div className="grid gap-8 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-10">
      <Avatar member={member} className="aspect-square w-full" sizes="(max-width: 640px) 100vw, 13rem" />
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {member.name}
          {member.koreanName ? (
            <span className="ml-2 text-base font-normal text-muted">{member.koreanName}</span>
          ) : null}
        </h3>
        <p className="mt-1 text-sm text-accent">{member.title ?? roleLabels[member.role]}</p>

        {member.bio ? (
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
            {member.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        {member.interests?.length ? (
          <p className="mt-4 text-sm text-muted">
            <span className="label text-muted">Interests</span>{" "}
            <span className="ml-1">{member.interests.join(" · ")}</span>
          </p>
        ) : null}

        <MemberLinks member={member} />
      </div>
    </div>
  );
}

export function MemberCard({ member }: { member: Member }) {
  return (
    <div>
      <Avatar
        member={member}
        className="aspect-square w-full"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
      />
      <h3 className="mt-4 text-[15px] font-medium tracking-tight">
        {member.name}
        {member.koreanName ? (
          <span className="ml-1.5 text-sm font-normal text-muted">{member.koreanName}</span>
        ) : null}
      </h3>
      <p className="mt-0.5 text-sm text-muted">{member.title ?? roleLabels[member.role]}</p>
      {member.interests?.length ? (
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          {member.interests.join(" · ")}
        </p>
      ) : null}
      <MemberLinks member={member} />
    </div>
  );
}
