# Content Generator Design (Phase 1)

## Goal

Convert raw markdown files in `content/` into static JSON artifacts that Next.js routes can read directly.

This doc focuses only on:

1. Input markdown file format and folder structure
2. Output JSON file structure

## Input

## Source folders

- `content/blogs/`
- `content/notes/`
- `content/links/`

Supported file extensions:

- `.md`
- `.mdx`

## File naming and slug rules

1. Slug is the filename without extension.
2. Locale suffix:
   - `*.zh.md` or `*.zh.mdx` -> `language = "zh"`
   - otherwise -> `language = "en"`
3. Canonical slug (for URLs):
   - remove `.zh` suffix for Chinese files
   - keep plain slug for English files

Examples:

- `4-basic-sort-algorithms.md` -> slug `4-basic-sort-algorithms`, lang `en`, canonicalSlug `4-basic-sort-algorithms`
- `4-basic-sort-algorithms.zh.md` -> slug `4-basic-sort-algorithms.zh`, lang `zh`, canonicalSlug `4-basic-sort-algorithms`

## Markdown frontmatter format

All markdown files must include frontmatter.

Base fields (all collections):

- `title: string`
- `date: string`
- `visible: boolean` (default `false` if omitted)

Blogs and notes additional fields:

- `description?: string`
- `tags?: string[]`

Links additional fields:

- `description?: string`
- `image?: string`
- `url?: string`
- `category?: string`

## Logical input record

Each raw file is normalized to:

```ts
type RawInputDoc = {
  collection: "blogs" | "notes" | "links";
  slug: string; // e.g. "4-basic-sort-algorithms.zh"
  canonicalSlug: string; // e.g. "4-basic-sort-algorithms"
  language: "en" | "zh";
  content: string; // markdown body without frontmatter
  frontmatter: Record<string, unknown>;
  sourcePath: string; // absolute or workspace-relative path
};
```

## Output

## Output folder

`src/generated/content/`

## Output files

1. `src/generated/content/index.json`
2. Per-document JSON:
   - `src/generated/content/blogs/{lang}/{canonicalSlug}.json`
   - `src/generated/content/notes/{lang}/{canonicalSlug}.json`
   - `src/generated/content/links/{lang}/{canonicalSlug}.json` (optional in phase 1 if links are migrated)

## `index.json` structure

Purpose: list pages + static params generation.

```json
{
  "version": 1,
  "generatedAt": "2026-02-17T00:00:00.000Z",
  "collections": {
    "blogs": {
      "en": [
        {
          "slug": "4-basic-sort-algorithms",
          "title": "4 Basic Sort Algorithms",
          "date": "2024-06-01",
          "language": "en",
          "availableLanguages": ["zh"]
        }
      ],
      "zh": [
        {
          "slug": "4-basic-sort-algorithms",
          "title": "4 个基础排序算法",
          "date": "2024-06-01",
          "language": "zh",
          "availableLanguages": ["en"]
        }
      ]
    },
    "notes": {
      "en": [],
      "zh": []
    },
    "links": {
      "en": [],
      "zh": []
    }
  }
}
```

## Per-document JSON structure

Purpose: detail page rendering.

```json
{
  "version": 1,
  "collection": "blogs",
  "slug": "4-basic-sort-algorithms",
  "language": "zh",
  "availableLanguages": ["en"],
  "frontmatter": {
    "title": "4 个基础排序算法",
    "date": "2024-06-01",
    "visible": true,
    "description": "..."
  },
  "content": "# Markdown body..."
}
```

## Minimal invariants

1. `slug` in all output JSON is canonical (no `.zh` suffix).
2. `availableLanguages` is computed by canonical slug grouping.
3. Output ordering is deterministic:
   - sort by `date` desc, then `slug` asc.
4. Every index item must have a matching per-document JSON file.
