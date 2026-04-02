import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import styles from "./home-hero.module.css";

export default function HomeHero() {
  return (
    <section
      className={`${styles.shell} relative overflow-hidden rounded-[2rem] border border-border/70 bg-background px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12`}
    >
      <div className={`${styles.glow} pointer-events-none absolute inset-0`} />
      <div
        className={`${styles.divider} pointer-events-none absolute inset-y-10 right-0 hidden w-1/2 lg:block`}
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center">
        <div className="flex min-w-0 flex-col justify-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-balance text-foreground sm:text-6xl lg:text-7xl">
                Hi, I&apos;m {SITE_CONFIG.name}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {SITE_CONFIG.description}
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className={`${styles.orbit} ${styles.orbitRing} pointer-events-none absolute -left-8 top-10 h-28 w-28 rounded-full`}
          />
          <div className="pointer-events-none absolute inset-x-6 bottom-0 h-24 rounded-full bg-foreground/10 blur-3xl" />

          <div
            className={`${styles.frame} ${styles.portrait} relative ml-auto max-w-[26rem] overflow-hidden rounded-[2rem] p-3`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-muted">
              <div
                className={`${styles.imageOverlay} pointer-events-none absolute inset-0 z-10`}
              />
              <Image
                src={SITE_CONFIG.assets.profileImage}
                alt={`Portrait of ${SITE_CONFIG.name}`}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
