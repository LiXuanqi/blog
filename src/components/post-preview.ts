export type PostPreview = {
  slug: string;
  title: string;
  date: string;
  language?: string;
  description?: string;
  image?: string;
  tags?: ReadonlyArray<string>;
  audience_level?: import("@/lib/content/audience-level").AudienceLevel;
  category?: string;
};
