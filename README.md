# Personal Blog & Resume

A modern, responsive personal blog and resume website built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

### 📝 Blog & Notes System

- **MDX Support** - Write content in Markdown with React components
- **Mathematical Expressions** - LaTeX syntax support with KaTeX
- **Syntax Highlighting** - Code blocks with light/dark themes using Shiki
- **GitHub Integration** - Fetch content from external repositories using Octokit
- **Separate Content Types** - Distinct routing for blogs (`/blogs`) and notes (`/notes`)
- **Post Metadata** - Support for tags, dates, and excerpts
- **Responsive Design** - Mobile-friendly layouts

### 🎨 Design & UI

- **Dark Mode Support** - System theme detection with manual toggle
- **shadcn/ui Components** - Modern, accessible UI components
- **Responsive Navigation** - Clean header with theme toggle
- **Typography System** - Custom MDX components with proper styling
- **Tailwind CSS** - Utility-first styling with custom configuration

### 📄 Resume System

- **YAML Configuration** - Easy resume editing with structured data
- **Print-Optimized** - A4-formatted layout for professional printing
- **Single-Page Design** - Compact layout that fits on one page
- **Screen Navigation** - Back button hidden during printing

### ⚙️ Developer Experience

- **TypeScript** - Full type safety throughout the application
- **ESLint & Prettier** - Code formatting and linting
- **Husky + lint-staged** - Pre-commit hooks for code quality
- **Hot Reload** - Fast development with Turbopack
- **Static Generation** - Optimized builds with Next.js SSG

### 🔧 Configuration

- **Centralized Config** - Easy site customization via `src/lib/site-config.ts`
- **Environment Support** - Local and GitHub content sources
- **Flexible Routing** - Route groups for different page types

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd blog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev --turbopack
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main site routes
│   │   ├── blogs/         # Blog pages
│   │   ├── notes/         # Notes pages
│   │   └── layout.tsx     # Main layout with navigation
│   ├── (resume)/          # Resume route group
│   │   └── resume/        # Resume page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
│   ├── site-config.ts    # Site configuration
│   ├── mdx.tsx          # MDX processing
│   ├── yaml.ts          # YAML loader
│   └── github-api.tsx   # GitHub integration
└── content/              # Content files
    ├── blogs/           # Blog posts (.mdx)
    ├── notes/           # Notes (.mdx)
    └── resume.yaml      # Resume data
```

## 🛠️ Common Commands

### Development

```bash
# Start development server with Turbopack
npm run dev --turbopack

# Start development server (standard)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint --fix

# Format code with Prettier (via pre-commit hooks)
git add . && git commit -m "message"
```

### Content Management

```bash
# Add new blog post
# Create: content/blogs/your-post.mdx

# Add new note
# Create: content/notes/your-note.mdx

# Update resume
# Edit: content/resume.yaml
```

## ⚙️ Configuration

### Site Settings

Edit `src/lib/site-config.ts` to customize:

```typescript
export const SITE_CONFIG = {
  name: "Your Name",
  title: "Your Site Title",
  description: "Your description",
  navigation: [
    { text: "Blog", url: "/blogs" },
    { text: "Notes", url: "/notes" },
    { text: "Resume", url: "/resume" },
  ],
  // ... more settings
};
```

### GitHub Integration

Add repositories to `src/lib/mdx.tsx`:

```typescript
const GITHUB_REPOS: GitHubRepoConfig[] = [
  {
    owner: "your-username",
    repo: "your-content-repo",
    path: "articles",
  },
];
```

### Resume Data

Edit `content/resume.yaml`:

```yaml
name: "Your Name"
email: "your.email@example.com"
education:
  - name: "University Name"
    time: "2020-2024"
    desc: ["Degree details"]
workExperience:
  - company: "Company Name"
    position: "Your Position"
    time: "2022-Present"
    location: "Location"
    desc: ["Achievement 1", "Achievement 2"]
```

## 🎨 Styling

### Dark Mode

The site automatically detects system theme preferences and includes a manual toggle in the navigation.

### Custom Components

MDX files support custom React components defined in `src/components/mdx-components.tsx`.

### Print Styles

The resume page includes print-specific styling for professional PDF generation.

## 📝 Writing Content

### Blog Posts

Create `.mdx` files in `content/blogs/`:

```mdx
---
title: "Your Post Title"
date: "2024-01-01"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
---

# Your Content

Write your content here with full MDX support.
```

### Mathematical Expressions

Use LaTeX syntax for math:

```mdx
Inline math: $E = mc^2$

Block math:

$$
\frac{d}{dx} \int_{a}^{x} f(t) dt = f(x)
$$
```

### Excalidraw Diagrams

Embed interactive diagrams using Excalidraw:

```mdx
// Load from .excalidraw file in public folder

<ExcalidrawEmbed src="/my-drawing.excalidraw" height={600} />
```

## 🚀 Deployment

The project is optimized for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

### Build Output

```bash
npm run build
```

Generates a static site in the `.next` directory ready for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
