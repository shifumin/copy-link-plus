import "./style.css";
import { CopyFormat, formatLink } from "@/utils/formatters";
import { fetchShortcuts } from "@/utils/shortcuts";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div class="container">
    <h1>Copy Link Plus</h1>
    <div class="buttons">
      <button id="copy-raw" class="copy-btn" data-format="raw">
        <span class="label">Raw URL</span>
        <span class="shortcut" data-shortcut-format="raw"></span>
      </button>
      <button id="copy-markdown" class="copy-btn" data-format="markdown">
        <span class="label">Markdown</span>
        <span class="shortcut" data-shortcut-format="markdown"></span>
      </button>
      <button id="copy-two-lines" class="copy-btn" data-format="twoLines">
        <span class="label">Two Lines</span>
        <span class="shortcut" data-shortcut-format="twoLines"></span>
      </button>
    </div>
    <div id="status" class="status"></div>
    <div class="footer">
      <a id="customize-shortcuts" class="customize-link" href="#">Customize shortcuts</a>
    </div>
  </div>
`;

const buttons = document.querySelectorAll<HTMLButtonElement>(".copy-btn");
const status = document.querySelector<HTMLDivElement>("#status")!;

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    const format = button.dataset.format as CopyFormat;
    await copyLink(format);
  });
});

document
  .querySelector("#customize-shortcuts")
  ?.addEventListener("click", (e) => {
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
    showStatus("Copied!");
  } catch {
    showStatus("Failed to copy", true);
  }
}

function showStatus(message: string, isError = false): void {
  status.textContent = message;
  status.className = `status ${isError ? "error" : "success"}`;

  setTimeout(() => {
    status.textContent = "";
    status.className = "status";
  }, 1500);
}
