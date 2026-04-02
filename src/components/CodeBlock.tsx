"use client";

import React, { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // Check if this is a Shiki-processed code block
  const isShikiBlock = React.Children.toArray(children).some((child) => {
    if (!React.isValidElement<{ className?: string }>(child)) {
      return false;
    }
    return child.props.className?.includes("shiki");
  });

  const handleCopy = async () => {
    if (preRef.current) {
      // Extract text content from the code element
      const codeElement = preRef.current.querySelector("code");
      const text = codeElement?.textContent || preRef.current.textContent || "";

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    }
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-lg border border-code-border bg-code-block">
      {/* Copy button */}
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-4 right-4 z-10 h-8 w-8 border border-code-border bg-code-button/80 p-0 text-code-button-foreground opacity-0 shadow-sm transition-opacity duration-200 hover:bg-code-button-hover group-hover:opacity-100"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-success" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </Button>

      {/* Code block */}
      <pre
        ref={preRef}
        className={`overflow-x-auto rounded-lg text-sm leading-6 font-mono bg-transparent ${
          isShikiBlock ? "" : "p-4 pr-14"
        }`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
