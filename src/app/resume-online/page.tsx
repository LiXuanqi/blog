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
    <div className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-6 rounded-xl transition-all duration-200">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {company && position ? position : title}
          </h3>
          {company && (
            <div className="flex items-center gap-2 mb-2">
              <Building
                size={18}
                className="text-blue-600 dark:text-blue-400"
              />
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {company}
              </p>
            </div>
          )}
          {(subtitle || location) && (
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-gray-500" />
              <p className="text-gray-600 dark:text-gray-400">
                {subtitle || location}
              </p>
            </div>
          )}
        </div>
        {time && (
          <div className="flex items-center gap-2 mt-2 lg:mt-0">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {time}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {desc.map((item, index) => (
          <div
            key={index}
            className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg pl-6 border-l-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-colors"
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
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
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              {resume.name}
            </h1>
            <p className="text-2xl mb-8 text-blue-100">
              Senior Software Engineer building scalable systems and leading
              technical initiatives
            </p>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-blue-100">
              <a
                href={`mailto:${resume.email}`}
                className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all group"
              >
                <Mail
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{resume.email}</span>
              </a>
              <a
                href={`tel:${resume.tel}`}
                className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all group"
              >
                <Phone
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{resume.tel}</span>
              </a>
              <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <MapPin size={20} />
                <span>{resume.address}</span>
              </div>
              <a
                href={`https://${resume.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all group"
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
                className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all group"
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
                className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all group"
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
            <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Work Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
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
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center lg:text-left">
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
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center lg:text-left">
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
      <footer className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
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
