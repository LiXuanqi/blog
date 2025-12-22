import { getAllLinks, getLinkBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import LinkDetailPage from "@/components/LinkDetailPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LinkPage({ params }: PageProps) {
  const { slug } = await params;

  const link = await getLinkBySlug(slug);
  if (!link) {
    notFound();
  }

  return <LinkDetailPage link={link} />;
}

// Generate static params for all links
export async function generateStaticParams() {
  const links = await getAllLinks();
  return links.map((link) => ({
    slug: link.slug,
  }));
}
