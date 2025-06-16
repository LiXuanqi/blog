"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's intersecting and has the highest intersection ratio
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Sort by intersection ratio and position, prioritizing entries higher on the page
          const sortedEntries = visibleEntries.sort((a, b) => {
            // First, prioritize by how much of the element is visible
            const ratioA = a.intersectionRatio;
            const ratioB = b.intersectionRatio;

            if (Math.abs(ratioA - ratioB) > 0.1) {
              return ratioB - ratioA;
            }

            // If intersection ratios are similar, prioritize the one that's higher up
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

          const topEntry = sortedEntries[0];
          setActiveId(topEntry.target.id);
        }
      },
      {
        // Trigger when 10% of the heading is visible, with some margin for header
        rootMargin: "-100px 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    // Observe all headings that have corresponding TOC items
    const headingElements = items
      .map((item) => document.getElementById(item.url.slice(1))) // Remove # from URL
      .filter(Boolean);

    headingElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      headingElements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();

    const targetId = url.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Smooth scroll to the element
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update URL without triggering a page reload
      window.history.replaceState(null, "", url);

      // Close mobile TOC after navigation
      if (variant === "mobile") {
        setIsExpanded(false);
      }
    }
  };

  if (variant === "mobile") {
    return (
      <div className="lg:hidden mb-8 border border-border rounded-lg">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <h3 className="text-lg font-semibold text-foreground">
            Table of Contents
          </h3>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>

        {isExpanded && (
          <nav className="px-4 pb-4 space-y-2 border-t border-border pt-4">
            {items.map((item, index) => {
              const isActive = activeId === item.url.slice(1);
              return (
                <a
                  key={index}
                  href={item.url}
                  onClick={(e) => handleClick(e, item.url)}
                  className={`block text-sm transition-colors cursor-pointer py-1 ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ paddingLeft: `${(item.depth - 1) * 12}px` }}
                >
                  {item.value}
                </a>
              );
            })}
          </nav>
        )}
      </div>
    );
  }

  // Sidebar variant (desktop)
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {items.map((item, index) => {
          const isActive = activeId === item.url.slice(1);
          return (
            <a
              key={index}
              href={item.url}
              onClick={(e) => handleClick(e, item.url)}
              className={`block text-sm transition-colors cursor-pointer relative py-1 px-2 rounded ${
                isActive
                  ? "text-primary font-medium bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              style={{ marginLeft: `${(item.depth - 1) * 12}px` }}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r" />
              )}
              {item.value}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
