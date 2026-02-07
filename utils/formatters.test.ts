import { describe, expect, it } from "vitest";
import { formatLink } from "./formatters";

describe("formatLink", () => {
  const url = "https://example.com/page";
  const title = "Example Page";

  describe("raw format", () => {
    it("should return the URL as-is", () => {
      expect(formatLink(url, title, "raw")).toBe("https://example.com/page");
    });
  });

  describe("markdown format", () => {
    it("should format as Markdown link", () => {
      expect(formatLink(url, title, "markdown")).toBe("[Example Page](https://example.com/page)");
    });

    it("should escape brackets in title", () => {
      const titleWithBrackets = "Page [with] brackets";
      expect(formatLink(url, titleWithBrackets, "markdown")).toBe(
        "[Page \\[with\\] brackets](https://example.com/page)",
      );
    });

    it("should handle multiple brackets", () => {
      const titleWithBrackets = "[Start] and [End]";
      expect(formatLink(url, titleWithBrackets, "markdown")).toBe(
        "[\\[Start\\] and \\[End\\]](https://example.com/page)",
      );
    });
  });

  describe("twoLines format", () => {
    it("should format as title and URL on two lines", () => {
      expect(formatLink(url, title, "twoLines")).toBe("Example Page\nhttps://example.com/page");
    });
  });

  describe("edge cases", () => {
    it("should handle empty title", () => {
      expect(formatLink(url, "", "markdown")).toBe("[](https://example.com/page)");
      expect(formatLink(url, "", "twoLines")).toBe("\nhttps://example.com/page");
    });

    it("should handle URL with special characters", () => {
      const urlWithParams = "https://example.com/page?q=test&foo=bar";
      expect(formatLink(urlWithParams, title, "raw")).toBe(urlWithParams);
      expect(formatLink(urlWithParams, title, "markdown")).toBe(`[Example Page](${urlWithParams})`);
    });

    it("should handle title with parentheses (not escaped in Markdown)", () => {
      const titleWithParens = "Title (with parens)";
      expect(formatLink(url, titleWithParens, "markdown")).toBe(
        "[Title (with parens)](https://example.com/page)",
      );
    });
  });
});
