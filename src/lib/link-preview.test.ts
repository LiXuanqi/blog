import { describe, expect, it } from "vitest";
import { getLinkPreviewImage } from "./link-preview";

describe("bookmark preview images", () => {
  it("prefers an explicit cover", () => {
    expect(
      getLinkPreviewImage(
        "https://youtube.com/watch?v=7xTGNNLPyMI",
        "/covers/notes.png",
      ),
    ).toBe("/covers/notes.png");
  });
  it("recognizes video URLs without treating unrelated hosts as YouTube", () => {
    for (const url of [
      "https://www.youtube.com/watch?v=7xTGNNLPyMI&t=3s",
      "https://youtu.be/7xTGNNLPyMI",
      "https://youtube.com/shorts/7xTGNNLPyMI",
    ]) {
      expect(getLinkPreviewImage(url)).toBe(
        "https://i.ytimg.com/vi/7xTGNNLPyMI/hqdefault.jpg",
      );
    }
    for (const url of [
      undefined,
      "bad url",
      "https://example.com",
      "https://youtube.com.evil.test/watch?v=7xTGNNLPyMI",
      "https://youtube.com/watch?v=invalid",
    ]) {
      expect(getLinkPreviewImage(url)).toBeUndefined();
    }
  });
});
