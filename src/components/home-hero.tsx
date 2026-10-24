import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";

export default function HomeHero() {
  return (
    <section
      aria-labelledby="home-intro"
      className="mx-auto flex max-w-4xl items-start gap-4 py-4 sm:items-center sm:gap-6 sm:py-6"
    >
      <Image
        src={SITE_CONFIG.assets.profileImage}
        alt=""
        width={80}
        height={80}
        sizes="(min-width: 640px) 80px, 56px"
        className="size-14 shrink-0 rounded-2xl object-cover sm:size-20"
        priority
      />
      <div className="min-w-0">
        <h1
          id="home-intro"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Hi, I’m {SITE_CONFIG.name}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {SITE_CONFIG.description}
        </p>
      </div>
    </section>
  );
}
