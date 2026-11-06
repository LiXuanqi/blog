"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeSelector } from "@/components/ui/theme-selector";
import { SITE_CONFIG } from "@/lib/site-config";

export default function NavHeader() {
  const pathname = usePathname();
  const navigation = [{ text: "Home", url: "/" }, ...SITE_CONFIG.navigation];
  return (
    <header className="site-navigation">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-3"
      >
        Skip to content
      </a>
      <nav aria-label="Main navigation" className="navigation-inner">
        <Link
          href="/"
          aria-label={`${SITE_CONFIG.name} — home`}
          className="identity-link"
        >
          <Image
            src={SITE_CONFIG.assets.profileImage}
            width={36}
            height={36}
            alt=""
            priority
            className="size-9 rounded-full object-cover"
          />
          <span className="text-lg font-semibold tracking-tight">
            Xuanqi Li
          </span>
        </Link>
        <div className="navigation-links">
          {navigation.map((item) => {
            const active =
              item.url === "/"
                ? pathname === "/"
                : item.url === "/posts"
                  ? /\/posts(?:\/|$)/.test(pathname)
                  : pathname.startsWith(item.url);
            return (
              <Link
                key={item.url}
                href={item.url}
                aria-current={active ? "page" : undefined}
                className={`navigation-link ${active ? "navigation-link-active" : ""}`}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
        <div className="navigation-theme">
          <ThemeSelector />
        </div>
      </nav>
    </header>
  );
}
