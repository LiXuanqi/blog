"use client";

import { useState, useEffect, useId, useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { TocItem } from "@/lib/toc";

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
  const toggleRef = useRef<HTMLButtonElement>(null);
  const minimumDepth = Math.min(...items.map((item) => item.depth));

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.url.slice(1)))
      .filter((element): element is HTMLElement => !!element);
    if (!headings.length) return;
    let frame = 0;
    const update = () => {
      const offset = window.matchMedia("(min-width: 768px)").matches
        ? 112
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
    <nav id={navId} aria-label="On this page">
      <ul className="relative space-y-0.5 before:absolute before:inset-y-2 before:left-0 before:w-px before:bg-border/60">
        {items.map((item) => {
          const isActive = activeId === item.url.slice(1);
          return (
            <li key={item.url}>
              <a
                href={item.url}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => {
                  if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return;
                  const heading = document.getElementById(item.url.slice(1));
                  if (heading) {
                    if (!heading.hasAttribute("tabindex"))
                      heading.tabIndex = -1;
                    heading.focus({ preventScroll: true });
                  }
                  setIsExpanded(false);
                }}
                style={{
                  paddingInlineStart: `${16 + Math.max(0, item.depth - minimumDepth) * 12}px`,
                }}
                className={`relative block py-1.5 pr-1 text-[13px] leading-5 [overflow-wrap:anywhere] transition-colors motion-reduce:transition-none focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 ${isActive ? "font-medium text-foreground before:absolute before:inset-y-2 before:-left-px before:w-[3px] before:rounded-full before:bg-link" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.value}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  if (variant === "mobile") {
    return (
      <div
        className="mb-8 border-y border-border/70 xl:hidden"
        onKeyDown={(event) => {
          if (event.key === "Escape" && isExpanded) {
            setIsExpanded(false);
            toggleRef.current?.focus();
          }
        }}
      >
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isExpanded}
          aria-controls={navId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
          className="flex min-h-12 w-full items-center gap-3 py-3 text-left text-sm hover:text-link focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2"
        >
          <span className="flex-1 font-medium">On this page</span>
          <span className="text-xs tabular-nums text-muted-foreground">
            {items.length} sections
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`size-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
        <div
          hidden={!isExpanded}
          className="max-h-72 overflow-y-auto overscroll-contain pb-4 pl-1 pr-3"
        >
          {links}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 pl-4 text-[13px] font-semibold tracking-normal text-foreground">
        On this page
      </p>
      {links}
    </div>
  );
}
