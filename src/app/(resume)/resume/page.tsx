import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { html } from "@/generated/resume/resume";
import "@/generated/resume/resume.css";

export const metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <main>
      <nav
        aria-label="Resume actions"
        className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden"
      >
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Back to Home
          </Link>
        </Button>
        <Button asChild>
          <a href="/resume.pdf" download>
            <Download aria-hidden="true" />
            Download PDF
          </a>
        </Button>
      </nav>
      {/* Only trusted SDK output from the build pipeline reaches this boundary. */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <footer className="mt-8 border-t border-border pt-4 text-sm text-muted-foreground print:hidden">
        <Link href="/" className="underline underline-offset-4">
          Read my blog
        </Link>
      </footer>
    </main>
  );
}
