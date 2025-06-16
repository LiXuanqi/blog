import { ReactNode } from "react";
import { generateSlug } from "@/lib/toc";

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
        className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
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
        className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
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
        className="scroll-m-20 text-2xl font-semibold tracking-tight"
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
        className="scroll-m-20 text-xl font-semibold tracking-tight"
        {...props}
      >
        {children}
      </h4>
    );
  },
  p: ({ children, ...props }: MDXComponentProps) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
      {children}
    </p>
  ),
  blockquote: ({ children, ...props }: MDXComponentProps) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
      {children}
    </blockquote>
  ),
  // inline code
  // code: ({ children, ...props }: MDXComponentProps) => (
  //     <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
  //         {children}
  //     </code>
  // ),
  // code block
  // TODO
  pre: ({ children, ...props }: MDXComponentProps) => (
    <pre className="overflow-x-auto mb-4 rounded-lg" {...props}>
      {children}
    </pre>
  ),

  ul: ({ children, ...props }: MDXComponentProps) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
};
