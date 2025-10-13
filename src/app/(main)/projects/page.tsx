import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar, Code, Star } from "lucide-react";
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
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                {project.title}
              </CardTitle>
              {project.featured && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 border-yellow-300"
                >
                  <Star size={12} className="mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {project.year}
              </span>
              <Badge
                variant={
                  project.status === "Completed" ? "default" : "secondary"
                }
                className="text-xs"
              >
                {project.status}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              <Code size={10} className="mr-1" />
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3">
          <Button asChild size="sm" variant="outline">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={14} className="mr-2" />
              Code
            </a>
          </Button>
          {project.liveUrl && (
            <Button asChild size="sm">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={14} className="mr-2" />
                Live Demo
              </a>
            </Button>
          )}
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

        {/* Call to Action */}
        <div className="mt-16 text-center bg-muted rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Want to Collaborate?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I&apos;m always interested in working on exciting projects. If you
            have an idea or want to collaborate, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="mailto:your.email@example.com">Get In Touch</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2" size={20} />
                View GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
