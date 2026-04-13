export type PostPreview = {
  slug: string;
  title: string;
  date: string;
  language?: string;
  description?: string;
  image?: string;
  tags?: ReadonlyArray<string>;
  category?: string;
};
