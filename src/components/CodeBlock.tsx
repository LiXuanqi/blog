"use client";

import React, { useEffect, useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function CodeBlock({
  children,
  className = "",
  ...props
}: CodeBlockProps) {
  const [status, setStatus] = useState("");
  const preRef = useRef<HTMLPreElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const language =
    typeof props["data-language"] === "string"
      ? props["data-language"]
      : React.Children.toArray(children).reduce<string>((label, child) => {
          if (!React.isValidElement<{ className?: string }>(child))
            return label;
          return (
            child.props.className?.match(/language-([\w+-]+)/)?.[1] ?? label
          );
        }, "Code");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(preRef.current?.textContent ?? "");
      setStatus("Copied");
    } catch {
      setStatus("Copy failed. Select the code to copy it.");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="my-7 overflow-hidden rounded-lg border border-code-border bg-code-block">
      <div className="flex items-center justify-between gap-3 border-b border-code-border px-4 py-1.5">
        <span className="font-mono text-xs text-muted-foreground">
          {language}
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 gap-2 px-2 text-xs text-code-button-foreground hover:bg-code-button-hover"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {status === "Copied" ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {status === "Copied" ? "Copied" : "Copy"}
        </Button>
        <span role="status" className="sr-only">
          {status}
        </span>
      </div>
      <pre
        {...props}
        ref={preRef}
        tabIndex={0}
        aria-label={language === "Code" ? "Code block" : `${language} code`}
        className={`overflow-x-auto p-4 text-[13px] sm:text-sm leading-6 font-mono focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${className}`}
      >
        {children}
      </pre>
    </div>
  );
}
