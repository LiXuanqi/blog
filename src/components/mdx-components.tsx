import { ReactNode } from "react";
import { ExcalidrawEmbed } from "./ExcalidrawEmbed";
import { CodeBlock } from "./CodeBlock";

interface MDXComponentProps {
  children?: ReactNode;
  [key: string]: unknown;
}

// Custom components for MDX
export const MDX_COMPONENTS = {
  // From https://ui.shadcn.com/docs/components/typography
  h1: ({ children, ...props }: MDXComponentProps) => {
    return (
      <h1
        tabIndex={-1}
        className="scroll-mt-32 sm:scroll-mt-20 mb-6 mt-0 text-4xl font-semibold leading-tight tracking-tight text-foreground"
        {...props}
      >
        {children}
        {typeof props.id === "string" && (
          <a
            href={`#${props.id}`}
            aria-label="Link to this section"
            className="ml-2 text-muted-foreground/50 no-underline hover:text-link focus-visible:text-link"
          >
            #
          </a>
        )}
      </h1>
    );
  },
  h2: ({ children, ...props }: MDXComponentProps) => {
    return (
      <h2
        tabIndex={-1}
        className="scroll-mt-32 sm:scroll-mt-20 mb-4 mt-10 text-2xl sm:text-[1.625rem] font-semibold leading-[1.3] tracking-tight text-foreground first:mt-0"
        {...props}
      >
        {children}
        {typeof props.id === "string" && (
          <a
            href={`#${props.id}`}
            aria-label="Link to this section"
            className="ml-2 text-muted-foreground/50 no-underline hover:text-link focus-visible:text-link"
          >
            #
          </a>
        )}
      </h2>
    );
  },
  h3: ({ children, ...props }: MDXComponentProps) => {
    return (
      <h3
        tabIndex={-1}
        className="scroll-mt-32 sm:scroll-mt-20 mb-3 mt-8 text-xl sm:text-[1.3125rem] font-semibold leading-[1.35] tracking-tight text-foreground"
        {...props}
      >
        {children}
        {typeof props.id === "string" && (
          <a
            href={`#${props.id}`}
            aria-label="Link to this section"
            className="ml-2 text-muted-foreground/50 no-underline hover:text-link focus-visible:text-link"
          >
            #
          </a>
        )}
      </h3>
    );
  },
  h4: ({ children, ...props }: MDXComponentProps) => {
    return (
      <h4
        tabIndex={-1}
        className="scroll-mt-32 sm:scroll-mt-20 mb-3 mt-6 text-lg font-semibold leading-tight tracking-tight text-foreground"
        {...props}
      >
        {children}
        {typeof props.id === "string" && (
          <a
            href={`#${props.id}`}
            aria-label="Link to this section"
            className="ml-2 text-muted-foreground/50 no-underline hover:text-link focus-visible:text-link"
          >
            #
          </a>
        )}
      </h4>
    );
  },
  p: ({ children, ...props }: MDXComponentProps) => (
    <p
      className="mb-4 text-base sm:text-[1.0625rem] leading-[1.75] text-foreground [&:not(:first-child)]:mt-4"
      {...props}
    >
      {children}
    </p>
  ),
  blockquote: ({ children, ...props }: MDXComponentProps) => (
    <blockquote
      className="my-7 border-l-2 border-border pl-5 [&_p]:text-muted-foreground text-base sm:text-[1.0625rem] leading-[1.75] text-muted-foreground"
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
      className="my-5 list-disc pl-6 space-y-2 text-base sm:text-[1.0625rem] leading-[1.75] text-foreground"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: MDXComponentProps) => (
    <ol
      className="my-5 list-decimal pl-6 space-y-2 text-base sm:text-[1.0625rem] leading-[1.75] text-foreground"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: MDXComponentProps) => (
    <li
      className="pl-1 marker:text-muted-foreground [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2"
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
    <em className="italic text-foreground" {...props}>
      {children}
    </em>
  ),

  a: ({ children, href, ...props }: MDXComponentProps & { href?: string }) => (
    <a
      href={href}
      className="text-link underline decoration-link/40 underline-offset-4 transition-colors hover:text-link-hover hover:decoration-link"
      {...props}
    >
      {children}
    </a>
  ),

  table: ({ children, ...props }: MDXComponentProps) => (
    <div
      role="region"
      aria-label="Scrollable table"
      tabIndex={0}
      className="my-7 overflow-x-auto rounded-lg border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
    >
      <table className="!my-0" {...props}>
        {children}
      </table>
    </div>
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
