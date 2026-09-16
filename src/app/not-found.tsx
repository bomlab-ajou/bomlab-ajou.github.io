import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-28 sm:py-36">
      <p className="label text-accent">Error 404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        This page does not exist.
      </h1>
      <p className="mt-5 max-w-lg text-lg text-muted">
        The link may be outdated, or the page may have moved. Try the research or
        publications pages instead.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/research">Research</ButtonLink>
        <ButtonLink href="/publications" variant="secondary">
          Publications
        </ButtonLink>
      </div>
    </Container>
  );
}
