"use client";

import { useState, useEffect, useId } from "react";
import { ChevronDown } from "lucide-react";
import { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
  variant?: "sidebar" | "mobile";
}

export function TableOfContents({
  items,
  variant = "sidebar",
}: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeId, setActiveId] = useState("");
  const navId = useId();

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.url.slice(1)))
      .filter((element): element is HTMLElement => !!element);
    if (!headings.length) return;
    let frame = 0;
    const update = () => {
      const offset = window.matchMedia("(min-width: 640px)").matches
        ? 100
        : 144;
      let current = headings[0];
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= offset) current = heading;
        else break;
      }
      setActiveId(current.id);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  if (!items.length) return null;

  const links = (
    <nav id={navId} aria-label="On this page" className="space-y-1">
      {items.map((item) => (
        <a
          key={item.url}
          href={item.url}
          aria-current={activeId === item.url.slice(1) ? "location" : undefined}
          onClick={() => {
            // Keep native hash navigation and move keyboard focus to the section.
            document
              .getElementById(item.url.slice(1))
              ?.focus({ preventScroll: true });
            setIsExpanded(false);
          }}
          className={`block border-l-2 py-1.5 pr-2 text-sm leading-5 transition-colors ${item.depth === 3 ? "pl-6" : "pl-3"} ${activeId === item.url.slice(1) ? "border-link text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          {item.value}
        </a>
      ))}
    </nav>
  );

  if (variant === "mobile") {
    return (
      <div className="mb-8 rounded-lg border border-border lg:hidden">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={navId}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted/50"
        >
          On this page
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 text-muted-foreground ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
        <div
          hidden={!isExpanded}
          className="max-h-72 overflow-y-auto border-t border-border p-3"
        >
          {links}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-foreground">On this page</p>
      {links}
    </div>
  );
}
