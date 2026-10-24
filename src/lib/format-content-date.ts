/** Content dates describe a calendar day, independent of the reader's timezone. */
export function formatContentDate(
  date: string,
  locale = "en-US",
  month: "short" | "long" = "short",
): string {
  return new Intl.DateTimeFormat(locale, {
    month,
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
