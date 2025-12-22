# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev --turbopack`: Start development server with Turbopack (faster builds)
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Architecture Overview

This is a Next.js blog built with the App Router and TypeScript. The site features a personal homepage with blog posts organized by year.

### Routing Structure

- Uses App Router with route groups: `src/app/(main)/`
- Routes:
  - `/` - Homepage with hero section and post previews
  - `/blogs` - Blog listing page grouped by year
  - `/blogs/[slug]` - Individual blog post pages
  - `/notes` - Notes page (placeholder)
  - `/links` - Links listing page with curated resources
  - `/links/[slug]` - Individual link detail pages

### Content Management

- Blog posts are stored as MDX files in `content/blogs/`
- Notes are stored as MDX files in `content/notes/`
- Links are stored as MDX files in `content/links/`
- Frontmatter formats:
  - Blogs/Notes: `title`, `date`, `excerpt` (optional)
  - Links: `title`, `date`, `description`, `image`, `url`, `category`
- Content is processed using `gray-matter` and rendered with `next-mdx-remote`
- Posts are automatically grouped by year and sorted by date (newest first)

### MDX Configuration

- Uses `remark-gfm` for GitHub Flavored Markdown
- Code highlighting with `@shikijs/rehype` (GitHub light/dark themes)
- Custom components defined in `src/components/mdx-components.tsx` using shadcn/ui typography styles
- Static generation enabled with `generateStaticParams`

### UI Components

- Built with shadcn/ui component system
- Components configured in `components.json`
- Custom UI components in `src/components/ui/`
- Uses Radix UI primitives with Tailwind CSS styling
- **IMPORTANT**: Always prefer using shadcn/ui components over creating custom ones
- Development workflow for new features:
  1. First check existing components in `src/components/ui/`
  2. If needed component doesn't exist, install it with `npx shadcn@latest add <component-name>`
  3. Only create custom components as a last resort
- Currently available components: Button, Card, Badge, Navigation Menu, Hover Card, Mode Toggle
- Full component library available at: https://ui.shadcn.com/docs/components

### Styling

- Tailwind CSS with custom configuration
- Custom fonts: Geist Sans and Geist Mono
- Typography component system for consistent MDX rendering
- Responsive design with max-width containers

### Key Libraries

- `next-mdx-remote`: Server-side MDX rendering
- `gray-matter`: Frontmatter parsing
- `@radix-ui`: Component primitives (via shadcn/ui)
- `lucide-react`: Icons
- `class-variance-authority`: Component variants

### File Structure Notes

- Path alias `@/*` maps to `src/*`
- MDX utilities in `src/lib/mdx.tsx` (includes functions for blogs, notes, and links)
- Reusable components in `src/components/`
- shadcn/ui components in `src/components/ui/`
- Content structure:
  - Blog content in `content/blogs/*.mdx`
  - Notes content in `content/notes/*.mdx`
  - Links content in `content/links/*.mdx`

### Links Feature

- Curated resource collection with markdown-based detail pages
- List view displays title and date in clean blog-style layout
- Detail pages include:
  - Link image header
  - Full markdown content with syntax highlighting
  - "Visit Link" button to external URL
  - Metadata sidebar with category, date, and domain info
  - Table of contents support
- External images supported via Next.js `remotePatterns` configuration
- Static generation for all link pages
