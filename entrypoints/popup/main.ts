import "./style.css";
import { type CopyFormat, formatDisplayLabel, formatLink } from "@/utils/formatters";
import { fetchShortcuts } from "@/utils/shortcuts";

// biome-ignore lint/style/noNonNullAssertion: #app is guaranteed to exist in index.html
const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div class="container">
    <h1>Copy Link Plus</h1>
    <div class="buttons">
      <button id="copy-raw" class="copy-btn" data-format="raw">
        <span class="btn-content">
          <span class="label">Raw URL</span>
          <span class="format-preview">URL</span>
        </span>
        <span class="shortcut" data-shortcut-format="raw" aria-hidden="true"></span>
      </button>
      <button id="copy-markdown" class="copy-btn" data-format="markdown">
        <span class="btn-content">
          <span class="label">Markdown</span>
          <span class="format-preview">[Title](URL)</span>
        </span>
        <span class="shortcut" data-shortcut-format="markdown" aria-hidden="true"></span>
      </button>
      <button id="copy-two-lines" class="copy-btn" data-format="twoLines">
        <span class="btn-content">
          <span class="label">Two Lines</span>
          <span class="format-preview">Title\\nURL</span>
        </span>
        <span class="shortcut" data-shortcut-format="twoLines" aria-hidden="true"></span>
      </button>
      <button id="copy-title" class="copy-btn" data-format="title">
        <span class="btn-content">
          <span class="label">Title</span>
          <span class="format-preview">Title</span>
        </span>
        <span class="shortcut" data-shortcut-format="title" aria-hidden="true"></span>
      </button>
    </div>
    <div id="status" class="status" role="status" aria-live="polite"></div>
    <div class="footer">
      <a id="customize-shortcuts" class="customize-link" href="#">Customize shortcuts</a>
    </div>
  </div>
`;

const buttons = document.querySelectorAll<HTMLButtonElement>(".copy-btn");
// biome-ignore lint/style/noNonNullAssertion: #status is guaranteed to exist in the template above
const status = document.querySelector<HTMLDivElement>("#status")!;

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    const format = button.dataset.format as CopyFormat;
    await copyLink(format);
  });
});

document.querySelector("#customize-shortcuts")?.addEventListener("click", (e) => {
  e.preventDefault();
  browser.tabs.create({ url: "chrome://extensions/shortcuts" });
  window.close();
});

const initShortcuts = async (): Promise<void> => {
  const shortcuts = await fetchShortcuts();
  for (const [format, text] of Object.entries(shortcuts)) {
    const el = document.querySelector(`[data-shortcut-format="${format}"]`);
    if (el) {
      el.textContent = text;
    }
  }
};

initShortcuts();

async function copyLink(format: CopyFormat): Promise<void> {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!tab?.url || !tab?.title) {
    showStatus("Failed to get page info", true);
    return;
  }

  const text = formatLink(tab.url, tab.title, format);

  try {
    await navigator.clipboard.writeText(text);
    showStatus(`Copied as ${formatDisplayLabel[format]}`);
  } catch {
    showStatus("Failed to copy", true);
  }
}

let statusTimeout: ReturnType<typeof setTimeout> | undefined;

function showStatus(message: string, isError = false): void {
  if (statusTimeout) {
    clearTimeout(statusTimeout);
  }

  status.textContent = message;
  status.className = `status ${isError ? "error" : "success"}`;

  statusTimeout = setTimeout(() => {
    status.className = "status";
    setTimeout(() => {
      status.textContent = "";
    }, 200);
  }, 1300);
}
