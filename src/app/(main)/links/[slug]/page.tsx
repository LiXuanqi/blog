import { notFound } from "next/navigation";
import LinkDetailPage from "@/components/LinkDetailPage";
import {
  getGeneratedLinksStaticParamsAsync,
  getGeneratedPostBySlugAsync,
} from "@/lib/generated-content";
import { LinkFrontmatter } from "@/lib/content/frontmatter";
import { MarkdownDocument } from "@/lib/content/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LinkPage({ params }: PageProps) {
  const { slug } = await params;

  const linkDocument = (await getGeneratedPostBySlugAsync(
    "links",
    "en",
    slug,
  )) as MarkdownDocument<LinkFrontmatter> | null;

  if (!linkDocument) {
    notFound();
  }

  return <LinkDetailPage link={linkDocument} />;
}

// Generate static params for all links
export async function generateStaticParams() {
  return await getGeneratedLinksStaticParamsAsync();
}
