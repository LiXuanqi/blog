"use client";

import { useState, useRef } from "react";
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
    <div className="relative group my-6 bg-card dark:bg-[#24292e] border border-border rounded-lg shadow-sm">
      {/* Copy button */}
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 hover:bg-background border border-border z-10"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </Button>

      {/* Code block */}
      <pre
        ref={preRef}
        className="overflow-x-auto p-4 pr-12 rounded-lg text-sm leading-relaxed font-mono transition-colors"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
