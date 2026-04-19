import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

function needsLocalePrefix(pathname: string): boolean {
  return pathname === "/posts" || pathname.startsWith("/posts/");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!needsLocalePrefix(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return NextResponse.next();
  }

  const localizedUrl = request.nextUrl.clone();
  localizedUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(localizedUrl);
}

export const config = {
  matcher: ["/posts/:path*"],
};
