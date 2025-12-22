import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Star } from "lucide-react";
import Hero from "@/components/hero";
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

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="group hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <p className="text-muted-foreground mt-2 line-clamp-2">
              {project.description}
            </p>
          </div>
          {project.featured && (
            <Badge variant="secondary" className="ml-2">
              <Star size={12} className="mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 3} more
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.status}</span>
          </div>

          <div className="flex gap-2">
            <Button asChild size="sm" variant="ghost" className="h-8 px-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} />
              </a>
            </Button>
            {project.liveUrl && (
              <Button asChild size="sm" variant="ghost" className="h-8 px-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <Hero
          title="Projects"
          content="A collection of projects I've built to solve problems, learn new technologies, and explore creative ideas."
        />

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
              <Star size={24} className="text-yellow-500" />
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              All Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
