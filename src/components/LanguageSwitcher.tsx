"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface LanguageSwitcherProps {
  currentLanguage: string;
  availableLanguages: string[];
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: "EN",
  zh: "中文",
  es: "ES",
  fr: "FR",
  de: "DE",
  ja: "JP",
  ko: "KR",
};

export function LanguageSwitcher({
  currentLanguage,
  availableLanguages,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Don't render if no translations available
  if (!availableLanguages || availableLanguages.length === 0) {
    return null;
  }

  // Get all available languages including current
  const allLanguages = [currentLanguage, ...availableLanguages].sort();

  const handleLanguageChange = (language: string) => {
    const params = new URLSearchParams(searchParams);

    if (language === "en") {
      params.delete("lang");
    } else {
      params.set("lang", language);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl);
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground">Also available in:</span>
      <div className="flex gap-1">
        {allLanguages.map((language) => {
          const isCurrentLanguage = language === currentLanguage;
          const languageName =
            LANGUAGE_NAMES[language] || language.toUpperCase();

          return (
            <Button
              key={language}
              variant={isCurrentLanguage ? "secondary" : "ghost"}
              size="sm"
              onClick={() => handleLanguageChange(language)}
              disabled={isCurrentLanguage}
              className="h-7 px-2 text-xs"
            >
              {languageName}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
