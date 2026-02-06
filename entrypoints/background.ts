import { CopyFormat, formatLink } from "@/utils/formatters";

export default defineBackground(() => {
  browser.commands.onCommand.addListener(async (command) => {
    let format: CopyFormat;
    switch (command) {
      case "copy-raw-url":
        format = "raw";
        break;
      case "copy-markdown":
        format = "markdown";
        break;
      case "copy-two-lines":
        format = "twoLines";
        break;
      default:
        return;
    }

    await copyCurrentPageLink(format);
  });
});

async function copyCurrentPageLink(format: CopyFormat): Promise<void> {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab?.url || !tab?.title) return;

  const text = formatLink(tab.url, tab.title, format);

  // Execute script in the active tab to copy to clipboard
  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: (textToCopy: string) => {
      navigator.clipboard.writeText(textToCopy);
    },
    args: [text],
  });
}
