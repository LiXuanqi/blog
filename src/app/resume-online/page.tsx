import { loadResumeData } from "@/lib/yaml";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  Calendar,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnlineResumeItemProps {
  title: string;
  subtitle?: string;
  location?: string;
  time: string;
  desc: string[];
  company?: string;
  position?: string;
}

const OnlineResumeItem = ({
  title,
  subtitle,
  location,
  time,
  desc,
  company,
  position,
}: OnlineResumeItemProps) => {
  return (
    <div className="group rounded-xl p-6 transition-all duration-200 hover:bg-accent/60">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
        <div className="flex-1">
          <h3 className="mb-2 text-2xl font-bold text-foreground transition-colors group-hover:text-link">
            {company && position ? position : title}
          </h3>
          {company && (
            <div className="flex items-center gap-2 mb-2">
              <Building size={18} className="text-link" />
              <p className="text-lg font-semibold text-link">{company}</p>
            </div>
          )}
          {(subtitle || location) && (
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-muted-foreground" />
              <p className="text-muted-foreground">{subtitle || location}</p>
            </div>
          )}
        </div>
        {time && (
          <div className="flex items-center gap-2 mt-2 lg:mt-0">
            <Calendar size={16} className="text-muted-foreground" />
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              {time}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {desc.map((item, index) => (
          <div
            key={index}
            className="border-l-2 border-border pl-6 text-lg leading-relaxed text-muted-foreground transition-colors group-hover:border-link/40"
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </div>
    </div>
  );
};

export default function OnlineResumePage() {
  const resume = loadResumeData();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
          <div className="flex gap-3">
            <Link href="/resume">
              <Button variant="outline" size="sm" className="gap-2">
                Print Version
                <ExternalLink size={14} />
              </Button>
            </Link>
            <Button asChild size="sm">
              <a href={`mailto:${resume.email}`}>Contact Me</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="resume-hero">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              {resume.name}
            </h1>
            <p className="mb-8 text-2xl text-hero-muted">
              Senior Software Engineer building scalable systems and leading
              technical initiatives
            </p>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 gap-4 text-hero-muted md:grid-cols-2 lg:grid-cols-3">
              <a
                href={`mailto:${resume.email}`}
                className="group flex items-center gap-3 rounded-lg bg-hero-panel p-4 backdrop-blur-sm transition-all hover:bg-hero-panel-hover"
              >
                <Mail
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{resume.email}</span>
              </a>
              <a
                href={`tel:${resume.tel}`}
                className="group flex items-center gap-3 rounded-lg bg-hero-panel p-4 backdrop-blur-sm transition-all hover:bg-hero-panel-hover"
              >
                <Phone
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{resume.tel}</span>
              </a>
              <div className="flex items-center gap-3 rounded-lg bg-hero-panel p-4 backdrop-blur-sm">
                <MapPin size={20} />
                <span>{resume.address}</span>
              </div>
              <a
                href={`https://${resume.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg bg-hero-panel p-4 backdrop-blur-sm transition-all hover:bg-hero-panel-hover"
              >
                <Github
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{resume.github}</span>
              </a>
              <a
                href={`https://${resume.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg bg-hero-panel p-4 backdrop-blur-sm transition-all hover:bg-hero-panel-hover"
              >
                <Linkedin
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={`https://${resume.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg bg-hero-panel p-4 backdrop-blur-sm transition-all hover:bg-hero-panel-hover"
              >
                <Globe
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>Tech Blog</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6">
        {/* Work Experience */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-bold text-foreground">
              Work Experience
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Building scalable systems and leading technical initiatives at
              top-tier companies
            </p>
          </div>

          <div className="space-y-8">
            {resume.workExperience.map((job, index) => (
              <OnlineResumeItem
                key={index}
                title={job.position}
                company={job.company}
                position={job.position}
                time={job.time}
                location={job.location}
                desc={job.desc}
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-20">
          {/* Education */}
          <section>
            <h2 className="mb-12 text-center text-4xl font-bold text-foreground lg:text-left">
              Education
            </h2>
            <div className="space-y-8">
              {resume.education.map((university, index) => (
                <OnlineResumeItem
                  key={index}
                  title={university.name}
                  time={university.time}
                  desc={university.desc}
                />
              ))}
            </div>
          </section>

          {/* Projects */}
          {resume.projects && resume.projects.length > 0 && (
            <section>
              <h2 className="mb-12 text-center text-4xl font-bold text-foreground lg:text-left">
                Featured Projects
              </h2>
              <div className="space-y-8">
                {resume.projects.map((project, index) => (
                  <OnlineResumeItem
                    key={index}
                    title={project.name}
                    time=""
                    desc={project.desc}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="bg-muted/40 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="mb-6 text-4xl font-bold text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Interested in collaborating? I&apos;d love to hear about your next
            project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a href={`mailto:${resume.email}`}>
                <Mail className="mr-2" size={20} />
                Get In Touch
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
            >
              <a
                href={`https://${resume.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2" size={20} />
                View My Work
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
