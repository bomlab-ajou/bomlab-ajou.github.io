import Link from "next/link";
import { Container } from "@/components/container";
import { GithubIcon, LinkedinIcon, ScholarIcon } from "@/components/icons";
import { site } from "@/content/site";

const footerNav = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/members", label: "People" },
  { href: "/news", label: "News" },
  { href: "/join", label: "Join us" },
] as const;

const socials = [
  { key: "scholar", label: "Google Scholar", Icon: ScholarIcon },
  { key: "github", label: "GitHub", Icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
] as const;

export function SiteFooter() {
  const activeSocials = socials.filter(({ key }) => site.links[key]);

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[15px] font-semibold tracking-tight">{site.fullName}</p>
            <p className="mt-1 text-sm text-muted">
              {site.department}, {site.university}
            </p>
            <address className="mt-4 text-sm leading-relaxed text-muted not-italic">
              {site.contact.office ? (
                <span className="block">{site.contact.office}</span>
              ) : null}
              {site.contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <nav aria-label="Footer">
            <p className="label text-muted">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-muted">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {site.contact.email}
                </a>
              </li>
              {site.contact.phone ? (
                <li className="text-muted">{site.contact.phone}</li>
              ) : null}
            </ul>

            {activeSocials.length > 0 ? (
              <div className="mt-5 flex gap-1">
                {activeSocials.map(({ key, label, Icon }) => (
                  <a
                    key={key}
                    href={site.links[key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-canvas hover:text-ink"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <p>{site.url.replace(/^https?:\/\//, "")}</p>
        </div>
      </Container>
    </footer>
  );
}
