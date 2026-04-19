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
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50">
      <nav className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <div className="flex items-center">
            <Image
              src={SITE_CONFIG.assets.logo}
              width={50}
              height={50}
              alt={`${SITE_CONFIG.name} logo`}
            />
            {/* <span>1x7</span> */}
          </div>
        </Link>
        <div className="flex items-center space-x-6">
          <NavTabs />
          <ThemeSelector />
        </div>
      </nav>
    </header>
  );
}

function NavTabs() {
  return (
    <div className="flex items-center gap-1">
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
        "inline-flex h-9 w-max items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium outline-none transition-colors",
        "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
      )}
    >
      {icon && <span className="flex items-center">{getIcon(icon)}</span>}
      <span className="leading-none">{text}</span>
    </Link>
  );
}
