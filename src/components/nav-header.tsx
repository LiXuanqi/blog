import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SITE_CONFIG } from "@/lib/site-config";

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
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

function NavTabs() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {SITE_CONFIG.navigation.map((item) => (
          <NavItem key={item.url} text={item.text} url={item.url} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavItem({ text, url }: { text: string; url: string }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href={url}>{text}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
