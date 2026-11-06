import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  status: string;
  featured: boolean;
  year: string;
};

type ProjectsData = {
  projects: Project[];
};

async function getProjects(): Promise<Project[]> {
  const projectsPath = path.join(process.cwd(), "content", "projects.yaml");
  const fileContents = fs.readFileSync(projectsPath, "utf8");
  const data = yaml.load(fileContents) as ProjectsData;
  return data.projects;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`project-${project.id}`}
      className="overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="grid md:grid-cols-[minmax(0,1fr)_200px]">
        <div className="p-6 sm:p-9">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {project.featured && (
              <span className="font-medium text-link">Featured project</span>
            )}
            <span>{project.year}</span>
            <span className="h-3 w-px bg-border" aria-hidden="true" />
            <span>{project.status}</span>
          </div>
          <h2
            id={`project-${project.id}`}
            className="font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {project.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-7">
            {project.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="default" className="h-10 px-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
              >
                <Github aria-hidden="true" />
                View on GitHub
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            {project.liveUrl && (
              <Button asChild variant="outline" className="h-10 px-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title} (opens in a new tab)`}
                >
                  Visit project
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="border-t border-border bg-muted/20 p-6 sm:p-9 md:border-l md:border-t-0 md:p-6 md:pt-9">
          <h3 className="mb-4 text-xs font-medium text-muted-foreground">
            Built with
          </h3>
          <ul className="flex flex-wrap gap-2 md:flex-col md:items-start">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge
                  variant="outline"
                  className="rounded-md bg-background px-2.5 py-1 font-mono text-xs font-normal"
                >
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <div className="site-page">
      <PageHeader
        title="Projects"
        description="Things I build to solve problems, explore ideas, and learn along the way."
      />

      <div className="space-y-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <section className={featuredProjects.length > 0 ? "mt-12" : ""}>
          <h2 className="mb-5 text-sm font-medium text-muted-foreground">
            {featuredProjects.length > 0 ? "More projects" : "All projects"}
          </h2>
          <div className="space-y-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}
      {projects.length === 0 && (
        <p className="border-t border-border py-8 text-muted-foreground">
          New projects are on the way. Check back soon.
        </p>
      )}
    </div>
  );
}
