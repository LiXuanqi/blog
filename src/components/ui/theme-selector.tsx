"use client";

import * as React from "react";
import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  {
    label: "Light",
    value: "light",
    icon: Sun,
  },
  {
    label: "Dark",
    value: "dark",
    icon: Moon,
  },
  {
    label: "System",
    value: "system",
    icon: LaptopMinimal,
  },
] as const;

export function ThemeSelector() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme ?? "system") : "system";
  const currentOption =
    THEME_OPTIONS.find((option) => option.value === currentTheme) ??
    THEME_OPTIONS[2];
  const CurrentIcon = currentOption.icon;

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme selector. Current theme: ${currentOption.label}.`}
        title={`Theme: ${currentOption.label}`}
      >
        <CurrentIcon className="h-4 w-4" />
      </Button>

      <div
        className={cn(
          "absolute right-0 top-full z-50 mt-2 rounded-md border border-border bg-background p-1 shadow-md transition-all",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
        role="menu"
        aria-label="Theme options"
      >
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon;
          const selected = option.value === currentTheme;

          return (
            <button
              key={option.value}
              type="button"
              className={cn(
                "relative flex size-9 items-center justify-center rounded-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                selected && "bg-accent text-accent-foreground",
              )}
              onClick={() => {
                setTheme(option.value);
                setOpen(false);
              }}
              role="menuitemradio"
              aria-checked={selected}
              aria-label={option.label}
              title={option.label}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
