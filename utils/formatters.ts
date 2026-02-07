export type CopyFormat = "raw" | "markdown" | "twoLines";

export function formatLink(url: string, title: string, format: CopyFormat): string {
  switch (format) {
    case "raw":
      return url;
    case "markdown": {
      // Escape brackets in title for Markdown
      const escapedTitle = title.replace(/[[\]]/g, "\\$&");
      return `[${escapedTitle}](${url})`;
    }
    case "twoLines":
      return `${title}\n${url}`;
  }
}
