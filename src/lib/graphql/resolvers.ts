import { GraphQLScalarType, Kind } from "graphql";
import {
  getAllPosts,
  getAllNotes,
  getPostBySlug,
  getNoteBySlug,
  getAllLinks,
  getLinkBySlug,
  getAvailableLanguages,
  getPostsByLanguage,
} from "../mdx";
import type { Post } from "../mdx";

// Date scalar type resolver
const DateType = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: unknown) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === "string") {
      return value;
    }
    throw new Error("Value is not a valid Date");
  },
  parseValue(value: unknown) {
    if (typeof value === "string") {
      return value;
    }
    throw new Error("Value is not a valid Date string");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    throw new Error("Value is not a valid Date string");
  },
});

// Helper function to group posts by year
function groupPostsByYear(posts: Post[]): { year: string; posts: Post[] }[] {
  const groupedByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, Post[]>,
  );

  return Object.entries(groupedByYear)
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

export const resolvers = {
  Date: DateType,

  Query: {
    // Get all posts (blogs + notes)
    allPosts: async (_: unknown, { language }: { language?: string }) => {
      const [blogs, notes] = await Promise.all([
        getAllPosts(language),
        getAllNotes(language),
      ]);
      return [...blogs, ...notes].sort((a, b) => (a.date < b.date ? 1 : -1));
    },

    // Get all blog posts
    allBlogs: async (_: unknown, { language }: { language?: string }) => {
      return await getAllPosts(language);
    },

    // Get all notes
    allNotes: async (_: unknown, { language }: { language?: string }) => {
      return await getAllNotes(language);
    },

    // Get blog posts grouped by year
    blogsByYear: async (_: unknown, { language }: { language?: string }) => {
      const blogs = await getAllPosts(language);
      return groupPostsByYear(blogs);
    },

    // Get posts grouped by language
    postsByLanguage: async () => {
      const postsByLang = await getPostsByLanguage();
      return Object.entries(postsByLang).map(([language, posts]) => ({
        language,
        posts,
      }));
    },

    // Get specific post by slug
    post: async (
      _: unknown,
      { slug, language = "en" }: { slug: string; language?: string },
    ) => {
      return await getPostBySlug(slug, language);
    },

    // Get specific note by slug
    note: async (
      _: unknown,
      { slug, language = "en" }: { slug: string; language?: string },
    ) => {
      return await getNoteBySlug(slug, language);
    },

    // Get all links
    allLinks: async () => {
      return await getAllLinks();
    },

    // Get specific link by slug
    link: async (_: unknown, { slug }: { slug: string }) => {
      return await getLinkBySlug(slug);
    },

    // Get available languages for a post
    availableLanguages: async (_: unknown, { slug }: { slug: string }) => {
      return await getAvailableLanguages(slug);
    },
  },
};
