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
        className="scroll-m-20 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6 mt-0"
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
        className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 first:mt-0 mt-12 mb-6"
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
        className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mt-10 mb-4"
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
        className="scroll-m-20 text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 mt-6 mb-3"
        {...props}
      >
        {children}
      </h4>
    );
  },
  p: ({ children, ...props }: MDXComponentProps) => (
    <p
      className="leading-7 text-gray-700 dark:text-gray-300 [&:not(:first-child)]:mt-6 mb-6"
      {...props}
    >
      {children}
    </p>
  ),
  blockquote: ({ children, ...props }: MDXComponentProps) => (
    <blockquote
      className="my-6 border-l-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 pl-6 pr-4 py-4 text-gray-700 dark:text-gray-300 rounded-r-lg"
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
    <ul className="my-6 space-y-3 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: MDXComponentProps) => (
    <ol className="my-6 space-y-3 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }: MDXComponentProps) => (
    <li
      className="leading-7 relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-gray-400 dark:before:text-gray-500 before:font-bold"
      {...props}
    >
      {children}
    </li>
  ),

  strong: ({ children, ...props }: MDXComponentProps) => (
    <strong
      className="font-semibold text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </strong>
  ),

  em: ({ children, ...props }: MDXComponentProps) => (
    <em className="italic text-gray-600 dark:text-gray-400" {...props}>
      {children}
    </em>
  ),

  a: ({ children, href, ...props }: MDXComponentProps & { href?: string }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors no-underline hover:underline"
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
