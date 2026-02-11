import { type CopyFormat, formatDisplayLabel, formatLink } from "@/utils/formatters";

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
  const label = formatDisplayLabel[format];

  // Execute script in the active tab to copy to clipboard and show toast
  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: (textToCopy: string, formatLabel: string) => {
      navigator.clipboard.writeText(textToCopy);

      // Show toast notification with shadow DOM isolation
      const hostId = "copy-link-plus-toast-host";
      const existingHost = document.getElementById(hostId);
      if (existingHost) {
        existingHost.remove();
      }

      const host = document.createElement("div");
      host.id = hostId;
      host.style.cssText =
        "all: initial; position: fixed; z-index: 2147483647; top: 16px; right: 16px; pointer-events: none;";

      const shadow = host.attachShadow({ mode: "closed" });

      const toast = document.createElement("div");
      toast.textContent = `Copied as ${formatLabel}`;
      toast.style.cssText = [
        'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        "font-size: 14px",
        "line-height: 1.5",
        "padding: 8px 16px",
        "background: rgba(0, 0, 0, 0.8)",
        "color: #fff",
        "border-radius: 8px",
        "box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)",
        "opacity: 0",
        "transform: translateY(-8px)",
        "transition: opacity 0.15s ease, transform 0.15s ease",
        "pointer-events: none",
      ].join("; ");

      shadow.appendChild(toast);
      document.body.appendChild(host);

      requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
      });

      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-8px)";
        setTimeout(() => host.remove(), 300);
      }, 1500);
    },
    args: [text, label],
  });
}
