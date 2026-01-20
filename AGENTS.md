# Repository Guidelines

## Project Structure & Module Organization

- `src/app/` holds the Next.js App Router routes, with route groups like `(main)` and `(resume)`.
- `src/components/` contains shared UI and MDX components; `src/components/ui/` is the shadcn/ui layer.
- `src/lib/` includes utilities and content loaders (MDX, YAML, GitHub integration).
- `content/` stores MDX and data files: `content/blogs/`, `content/notes/`, `content/links/`, `content/resume.yaml`.
- Static assets live in `public/`.

## Build, Test, and Development Commands

- `npm run dev` (Turbopack): start the local dev server.
- `npm run build`: compile a production build.
- `npm start`: run the production server from `.next/`.
- `npm run lint`: run ESLint with Next.js rules.
- `npm run test`: run Vitest in watch mode.
- `npm run test:run`: run Vitest once for CI-style checks.
- `npm run test:ui`: open the Vitest UI runner.

## Coding Style & Naming Conventions

- TypeScript-first codebase with path alias `@/*` → `src/*`.
- Formatting and linting: ESLint + Prettier, enforced via `lint-staged` on commit.
- Prefer shadcn/ui components; check `src/components/ui/` before creating custom components.
- Content naming: use kebab-case filenames like `content/blogs/my-post.mdx`.

## Testing Guidelines

- Framework: Vitest (`vitest.config.ts`, Node environment).
- Place tests alongside code or in a colocated `__tests__/` folder.
- Use clear, feature-based test names: `links.test.ts`, `mdx-loader.test.ts`.

## Commit & Pull Request Guidelines

- Commit messages follow Conventional Commits patterns seen in history:
  - Examples: `feat: add links index`, `fix(pipeline): handle empty frontmatter`, `refactor(markdown): simplify parser`.
- PRs should include a short summary, relevant context (issue/feature), and screenshots for UI changes.
- Run `npm run lint` and relevant tests before requesting review.

## Configuration & Content Tips

- Site settings live in `src/lib/site-config.ts`.
- MDX frontmatter for blogs/notes: `title`, `date`, `excerpt` (optional).
- Links frontmatter includes `title`, `date`, `description`, `image`, `url`, `category`.
