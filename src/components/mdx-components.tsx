// Custom components for MDX
export const MDX_COMPONENTS = {
    // From https://ui.shadcn.com/docs/components/typography
    h1: ({ children, ...props }: any) => (
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }: any) => (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props}>
            {children}
        </h2>
    ),
    h3: ({ children, ...props }: any) => (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...props}>
            {children}
        </h3>
    ),
    h4: ({ children, ...props }: any) => (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props}>
            {children}
        </h4>
    ),
    p: ({ children, ...props }: any) => (
        <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
            {children}
        </p>
    ),
    blockquote: ({ children, ...props }: any) => (
        <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
            {children}
        </blockquote>
    ),
    // inline code
    code: ({ children, ...props }: any) => (
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
            {children}
        </code>
    ),
    // code block 
    // TODO
    pre: ({ children, ...props }: any) => (
        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4" {...props}>
          {children}
        </pre>
      ),

    ul: ({ children, ...props }: any) => (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
          {children}
        </ul>
      ),
};
