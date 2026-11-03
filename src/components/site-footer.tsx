import { SITE_CONFIG } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background text-sm text-muted-foreground print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {SITE_CONFIG.copyrightName}
        </p>
        <nav aria-label="Social links" className="flex items-center gap-6">
          <a
            href={SITE_CONFIG.contact.social.github}
            className="rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring"
          >
            GitHub
          </a>
          <a
            href={SITE_CONFIG.contact.social.linkedin}
            className="rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
