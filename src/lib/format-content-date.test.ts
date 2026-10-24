import { describe, expect, it } from "vitest";
import { formatContentDate } from "./format-content-date";

describe("content calendar dates", () => {
  it("keeps cards and article headers on the same publication day", () => {
    expect(formatContentDate("2025-12-21")).toBe("Dec 21, 2025");
    expect(formatContentDate("2025-12-21", "en-US", "long")).toBe(
      "December 21, 2025",
    );
  });

  it("formats generated UTC timestamps without changing the day", () => {
    expect(formatContentDate("2025-12-21T00:00:00.000Z")).toBe("Dec 21, 2025");
    expect(formatContentDate("2025-12-21", "zh-CN", "long")).toBe(
      "2025年12月21日",
    );
  });
});
