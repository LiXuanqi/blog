export default function HomeHero() {
  return (
    <header className="home-introduction">
      <h1 className="font-serif text-[clamp(2.75rem,5vw,4.75rem)] font-medium leading-[1.02] tracking-tight text-foreground lg:max-w-[8ch]">
        Hi, I’m Xuanqi.
      </h1>
      <div className="max-w-prose space-y-5 text-base leading-7 text-muted-foreground">
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
