# Repository Guidelines

## Project Structure & Module Organization

- `src/app/` holds the Next.js App Router routes, with route groups like `(main)` and `(resume)`.
- `src/components/` contains shared UI and MDX components; `src/components/ui/` is the shadcn/ui layer.
- `src/lib/` includes utilities and content loaders (MDX, YAML, GitHub integration).
- `bin/content-generator/` contains the build-time markdown content generator CLI.
- `src/generated/content/` stores generated JSON artifacts consumed by the app.
- `content/` stores MDX and data files: `content/posts/`, `content/links/`, `content/resume.yaml`.
- Static assets live in `public/`.

## Build, Test, and Development Commands

- Use `pnpm` as the package manager for this repository.
- `pnpm generate:content`: run the build-time content generator manually.
- `pnpm dev` (Turbopack): start the local dev server.
- `pnpm build`: compile a production build.
- `pnpm start`: run the production server from `.next/`.
- `pnpm lint`: run ESLint with Next.js rules.
- `pnpm test`: run Vitest in watch mode.
- `pnpm test:run`: run Vitest once for CI-style checks.
- `pnpm test:ui`: open the Vitest UI runner.
- `predev` and `prebuild` automatically run `pnpm generate:content` before `pnpm dev` and `pnpm build`.

## Coding Style & Naming Conventions

- TypeScript-first codebase with path alias `@/*` → `src/*`.
- Formatting and linting: ESLint + Prettier, enforced via `lint-staged` on commit.
- Prefer shadcn/ui components; check `src/components/ui/` before creating custom components.
- For component styling, prefer the shared semantic color palette and theme tokens defined in `src/app/globals.css` instead of hard-coded hex values or Tailwind palette classes like `text-blue-600` / `bg-gray-100`.
- Treat hard-coded colors as exceptions for standalone artwork or fixed assets such as illustrative SVGs, logos, and print-only layouts.
- Content naming: use kebab-case filenames like `content/posts/my-post.mdx`.

## Testing Guidelines

- Framework: Vitest (`vitest.config.ts`, Node environment).
- Place tests alongside code or in a colocated `__tests__/` folder.
- Use clear, feature-based test names: `links.test.ts`, `mdx-loader.test.ts`.

## Commit & Pull Request Guidelines

- Commit messages follow Conventional Commits patterns seen in history:
  - Examples: `feat: add links index`, `fix(pipeline): handle empty frontmatter`, `refactor(markdown): simplify parser`.
- PRs should include a short summary, relevant context (issue/feature), and screenshots for UI changes.
- Run `pnpm lint` and relevant tests before requesting review.

## Configuration & Content Tips

- Site settings live in `src/lib/site-config.ts`.
- MDX frontmatter for blog posts: `title`, `date`, `description` (optional), `image` (optional), `tags` (optional).
- Links frontmatter includes `title`, `date`, `description`, `image`, `url`, `category`.
