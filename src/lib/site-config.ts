export const SITE_CONFIG = {
  // Personal Information
  name: "Sam",
  title: "Sam's Blog",
  description: "Backend engineer by day, explorer by night.",

  // Site Metadata
  siteTitle: "Sam's Blog",
  siteDescription:
    "Personal blog about web development, programming, and technology",

  // Page Descriptions
  blog: {
    title: "Blog",
    description:
      "Thoughts on web development, programming, and technology. I write about what I learn and build",
  },

  // Homepage Sections
  sections: {
    blog: {
      title: "Blog",
      subtitle: "Essays, references, and working notes",
    },
  },

  // Navigation
  navigation: [
    { text: "Blog", url: "/blogs", icon: "blog" },
    { text: "Projects", url: "/projects", icon: "projects" },
    { text: "Links", url: "/links", icon: "links" },
    { text: "Resume", url: "/resume", icon: "resume" },
  ],

  // Assets
  assets: {
    logo: "/logo.png",
    profileImage: "/home-logo-2.png",
  },

  // Contact & Social (placeholder for future use)
  contact: {
    email: "", // Add your email if needed
    social: {
      github: "", // Add your GitHub if needed
      twitter: "", // Add your Twitter if needed
      linkedin: "", // Add your LinkedIn if needed
    },
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
