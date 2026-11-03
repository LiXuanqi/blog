import z from "zod";

export const AUDIENCE_LEVEL_SCHEMA = z.enum([
  "everyone",
  "beginner",
  "intermediate",
  "advanced",
]);
export type AudienceLevel = z.infer<typeof AUDIENCE_LEVEL_SCHEMA>;
export const AUDIENCE_LEVEL_LABELS: Record<AudienceLevel, string> = {
  everyone: "Everyone",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};
