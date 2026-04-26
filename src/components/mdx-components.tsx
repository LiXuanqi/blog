import { ReactNode } from "react";
import { generateSlug } from "@/lib/toc";
import { ExcalidrawEmbed } from "./ExcalidrawEmbed";
import { CodeBlock } from "./CodeBlock";

interface MDXComponentProps {
  children?: ReactNode;
  [key: string]: unknown;
}

// Helper function to extract text content from children
function getTextContent(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(getTextContent).join("");
  }
  return "";
}

// Custom components for MDX
export const MDX_COMPONENTS = {
  // From https://ui.shadcn.com/docs/components/typography
  h1: ({ children, ...props }: MDXComponentProps) => {
    const id = generateSlug(getTextContent(children));
    return (
      <h1
        id={id}
        className="scroll-m-20 mb-6 mt-0 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: MDXComponentProps) => {
    const id = generateSlug(getTextContent(children));
    return (
      <h2
        id={id}
        className="scroll-m-20 mb-6 mt-12 font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground first:mt-0"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: MDXComponentProps) => {
    const id = generateSlug(getTextContent(children));
    return (
      <h3
        id={id}
        className="scroll-m-20 mb-4 mt-10 font-serif text-xl font-semibold leading-tight tracking-tight text-foreground"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }: MDXComponentProps) => {
    const id = generateSlug(getTextContent(children));
    return (
      <h4
        id={id}
        className="scroll-m-20 mb-3 mt-6 font-serif text-lg font-semibold leading-tight tracking-tight text-foreground"
        {...props}
      >
        {children}
      </h4>
    );
  },
  p: ({ children, ...props }: MDXComponentProps) => (
    <p
      className="mb-6 text-[1.0625rem] leading-8 text-foreground [&:not(:first-child)]:mt-6"
      {...props}
    >
      {children}
    </p>
  ),
  blockquote: ({ children, ...props }: MDXComponentProps) => (
    <blockquote
      className="my-6 rounded-r-lg border-l-4 border-info-border bg-info px-4 py-4 pl-6 text-[1.0625rem] leading-8 text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  // inline code - removed to prevent conflict with code blocks
  // Inline code styling is handled via CSS: :not(pre) > code
  // code block
  pre: ({ children, ...props }: MDXComponentProps) => (
    <CodeBlock {...props}>{children}</CodeBlock>
  ),

  ul: ({ children, ...props }: MDXComponentProps) => (
    <ul
      className="my-6 space-y-3 text-[1.0625rem] leading-8 text-foreground"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: MDXComponentProps) => (
    <ol
      className="my-6 space-y-3 text-[1.0625rem] leading-8 text-foreground"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: MDXComponentProps) => (
    <li
      className="relative pl-6 leading-7 before:absolute before:left-0 before:font-bold before:text-primary/60 before:content-['•']"
      {...props}
    >
      {children}
    </li>
  ),

  strong: ({ children, ...props }: MDXComponentProps) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),

  em: ({ children, ...props }: MDXComponentProps) => (
    <em className="italic text-muted-foreground" {...props}>
      {children}
    </em>
  ),

  a: ({ children, href, ...props }: MDXComponentProps & { href?: string }) => (
    <a
      href={href}
      className="text-link transition-colors no-underline hover:text-link-hover hover:underline"
      {...props}
    >
      {children}
    </a>
  ),

  // Excalidraw component
  ExcalidrawEmbed: ({
    src,
    height,
    ...props
  }: {
    src?: string;
    height?: number;
    [key: string]: unknown;
  }) => <ExcalidrawEmbed src={src} height={height} {...props} />,
};
