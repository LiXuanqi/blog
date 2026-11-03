import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import NavHeader from "@/components/nav-header";
import SiteFooter from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Newsreader({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} flex min-h-screen flex-col`}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NavHeader />
        <main id="main-content" className="flex-1 pt-28 sm:pt-16">
          {children}
        </main>
        <SiteFooter />
      </ThemeProvider>
    </div>
  );
}
