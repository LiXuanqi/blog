import { SITE_CONFIG } from "@/lib/site-config";

export default function HomeHero() {
  return (
    <header className="home-introduction">
      <h1 className="font-serif text-[clamp(2.75rem,5vw,4.75rem)] font-medium leading-[1.02] tracking-tight text-foreground">
        Notes on software
        <br />
        &amp; systems.
      </h1>
      <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
        {SITE_CONFIG.description}
      </p>
    </header>
  );
}
