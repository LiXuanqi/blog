export const SITE_CONFIG = {
  // Personal Information
  name: "Xuanqi",
  copyrightName: "Xuanqi Li",
  title: "Xuanqi.dev",
  description:
    "I’m a backend engineer. I write about software, systems, and what I learn along the way.",

  // Site Metadata
  siteTitle: "Xuanqi.dev",
  siteDescription:
    "Personal blog about web development, programming, and technology",

  // Page Descriptions
  blog: {
    title: "Posts",
    description:
      "Thoughts on web development, programming, and technology. I write about what I learn and build",
  },

  // Homepage Sections
  sections: {
    blog: {
      title: "Featured articles",
      subtitle: "Essays, references, and working notes",
    },
  },

  // Homepage selection, in display order. Missing or unpublished posts are omitted.
  featuredPostSlugs: [
    "lessons-from-the-best-code-reviewers",
    "all-is-byte",
    "union-find",
    "4-basic-sort-algorithms",
  ],

  // Navigation
  navigation: [
    { text: "Posts", url: "/posts", icon: "blog" },
    { text: "Projects", url: "/projects", icon: "projects" },
    { text: "Links", url: "/links", icon: "links" },
    { text: "Resume", url: "/resume", icon: "resume" },
  ],

  // Assets
  assets: {
    logo: "/logo.png",
    profileImage: "/home-logo-2.png",
  },

  // Contact & Social
  contact: {
    email: "", // Add your email if needed
    social: {
      github: "https://github.com/LiXuanqi",
      twitter: "", // Add your Twitter if needed
      linkedin: "https://www.linkedin.com/in/xuanqi-li",
    },
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
