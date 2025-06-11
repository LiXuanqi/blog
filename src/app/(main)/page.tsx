import Hero from "@/components/hero";
import { PostList } from "@/components/post-list";
import SectionHeader from "@/components/section-header";
import { getAllPosts } from "@/lib/mdx";
import Image from "next/image";

export default async function Home() {
  const posts = await getAllPosts()
  return (
    // TODO: same layout as blogs home page
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* About me section */}
        <div className="flex gap-6">
          <div className="w-2/3">
            <Hero title="Hey, I'm Sam!" content="Backend engineer by day, explorer by night. " />
          </div>
          <div className="w-1/3">
            <Image
              src="/home-logo-2.png"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </div>

        <Section>
          <SectionHeader title="Notes" subtitle="Personal notes" ctaUrl="/notes"/>
          <PostList posts={posts}/>
        </Section>

        <Section>
          <SectionHeader title="Articles" subtitle="Guides, references" ctaUrl="/blogs"/>
          <PostList posts={posts}/>
        </Section>
      </div>
    </div>
  );
}


function Section({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

        <section className="mb-4">
          {children}
        </section>

  );

}