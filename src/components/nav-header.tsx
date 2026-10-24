import Link from "next/link";
import Image from "next/image";
import { ThemeSelector } from "@/components/ui/theme-selector";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import {
  BlogIcon,
  ResumeIcon,
  ProjectsIcon,
  LinksIcon,
} from "@/components/icons/nav-icons";

export default function NavHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-28 border-b border-border bg-background sm:h-16">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-3"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className="mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-4 sm:flex sm:justify-between"
      >
        <Link
          href="/"
          aria-label={`${SITE_CONFIG.name} — home`}
          className="w-fit rounded-md focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Image
            src={SITE_CONFIG.assets.logo}
            width={40}
            height={40}
            alt={`${SITE_CONFIG.name} logo`}
          />
        </Link>
        <div className="col-span-2 row-start-2 min-w-0 sm:ml-auto sm:mr-6">
          <NavTabs />
        </div>
        <div className="col-start-2 row-start-1 justify-self-end">
          <ThemeSelector />
        </div>
      </nav>
    </header>
  );
}

function NavTabs() {
  return (
    <div className="flex items-center justify-between gap-1 sm:justify-start">
      {SITE_CONFIG.navigation.map((item) => (
        <NavItem
          key={item.url}
          text={item.text}
          url={item.url}
          icon={item.icon}
        />
      ))}
    </div>
  );
}

function NavItem({
  text,
  url,
  icon,
}: {
  text: string;
  url: string;
  icon?: string;
}) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "blog":
        return <BlogIcon size={16} />;
      case "projects":
        return <ProjectsIcon size={16} />;
      case "resume":
        return <ResumeIcon size={16} />;
      case "links":
        return <LinksIcon size={16} />;
      default:
        return null;
    }
  };

  return (
    <Link
      href={url}
      className={cn(
        "inline-flex h-11 sm:h-9 items-center justify-center gap-1.5 rounded-md px-1.5 py-2 text-xs sm:gap-2 sm:px-4 sm:text-sm font-medium outline-none transition-colors",
        "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
      )}
    >
      {icon && (
        <span className="hidden items-center sm:flex">{getIcon(icon)}</span>
      )}
      <span className="leading-none">{text}</span>
    </Link>
  );
}
