import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";

export default function HomeHero() {
  return (
    <header className="home-introduction">
      <Image
        src={SITE_CONFIG.assets.profileImage}
        alt=""
        width={80}
        height={80}
        sizes="(min-width: 640px) 80px, 56px"
        className="size-14 shrink-0 rounded-2xl object-cover sm:size-20"
        priority
      />
      <h1 className="self-center font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Hi, I’m Xuanqi.
      </h1>
      <div className="col-span-2 space-y-4 text-base leading-7 text-muted-foreground">
        <p>
          I’m a Member of Technical Staff at OpenAI, previously at Airtable,
          LinkedIn, and Yelp. I’m a generalist software engineer whose work
          spans product development, data platforms, and infrastructure, from
          building tools used by millions of businesses to helping build a
          relational database from scratch.
        </p>
        <p>
          I enjoy learning unfamiliar systems and working across the boundaries
          between them. Along the way, I’ve led engineering projects, taught and
          mentored engineers, and helped teams improve how they build software.
          This site is where I share what I’m working on and learning.
        </p>
      </div>
    </header>
  );
}
