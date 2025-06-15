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

// Helper function specifically for resume data
export function loadResumeData() {
  return loadYaml("content/resume.yaml");
}
