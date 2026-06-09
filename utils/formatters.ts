export type CopyFormat = "raw" | "markdown" | "twoLines" | "title";

export const formatDisplayLabel: Record<CopyFormat, string> = {
  raw: "Raw URL",
  markdown: "Markdown",
  twoLines: "Two Lines",
  title: "Title",
};

export function formatLink(url: string, title: string, format: CopyFormat): string {
  switch (format) {
    case "raw":
      return url;
    case "markdown":
      return `[${title}](${url})`;
    case "twoLines":
      return `${title}\n${url}`;
    case "title":
      return title;
  }
}
