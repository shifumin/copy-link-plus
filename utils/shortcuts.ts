import type { CopyFormat } from "@/utils/formatters";

const commandToFormat: Record<string, CopyFormat> = {
  "copy-raw-url": "raw",
  "copy-markdown": "markdown",
  "copy-two-lines": "twoLines",
};

export const formatShortcutForDisplay = (
  shortcut: string,
  isMac: boolean
): string => {
  if (!shortcut) return "";
  if (!isMac) return shortcut;

  return shortcut
    .replace(/MacCtrl\+/g, "⌃")
    .replace(/Command\+/g, "⌘")
    .replace(/Ctrl\+/g, "⌃")
    .replace(/Alt\+/g, "⌥")
    .replace(/Shift\+/g, "⇧");
};

export const fetchShortcuts = async (): Promise<Record<CopyFormat, string>> => {
  const commands = await browser.commands.getAll();
  const isMac = navigator.platform.includes("Mac");

  const result: Record<CopyFormat, string> = {
    raw: "",
    markdown: "",
    twoLines: "",
  };

  for (const cmd of commands) {
    const format = cmd.name ? commandToFormat[cmd.name] : undefined;
    if (format) {
      result[format] = formatShortcutForDisplay(cmd.shortcut ?? "", isMac);
    }
  }

  return result;
};
