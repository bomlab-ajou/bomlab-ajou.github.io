import { Container } from "@/components/container";
import { NewsList } from "@/components/news-list";
import { PageHeader } from "@/components/page-header";
import { news } from "@/content/news";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "News",
  description: "Announcements, awards, talks, and new people in the lab.",
  path: "/news/",
});

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="News"
        title="What's happening"
        lead="Papers, talks, awards, and the people joining and leaving the lab."
      />

      <Container className="py-8 sm:py-12">
        <NewsList items={news} />
      </Container>
    </>
  );
}
