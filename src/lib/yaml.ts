import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export function loadYaml<T = Record<string, unknown>>(filePath: string): T {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return yaml.load(fileContents) as T;
  } catch (error) {
    console.error(`Error loading YAML file ${filePath}:`, error);
    throw error;
  }
}

// Resume data types
export interface ResumeData {
  name: string;
  address: string;
  tel: string;
  email: string;
  github: string;
  linkedin: string;
  blog: string;
  education: Array<{
    name: string;
    time: string;
    desc: string[];
  }>;
  workExperience: Array<{
    company: string;
    position: string;
    time: string;
    location: string;
    desc: string[];
  }>;
  projects: Array<{
    name: string;
    desc: string[];
  }>;
}

// Helper function specifically for resume data
export function loadResumeData(): ResumeData {
  return loadYaml<ResumeData>("content/resume.yaml");
}
