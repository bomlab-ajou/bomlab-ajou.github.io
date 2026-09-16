import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PublicationBrowser } from "@/components/publication-browser";
import { site } from "@/content/site";
import { presentTypes, publicationCount, sortedPublications } from "@/lib/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: `Journal articles, conference papers, and preprints from ${site.name}.`,
};

export default function PublicationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Publications"
        lead={`${publicationCount} papers and counting. Names in bold are lab members; an asterisk marks equal contribution.`}
      />

      <Container className="py-14 sm:py-16">
        <PublicationBrowser publications={sortedPublications} types={presentTypes} />
      </Container>
    </>
  );
}
