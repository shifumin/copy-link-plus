import { describe, it, expect } from "vitest";
import { formatShortcutForDisplay } from "./shortcuts";

describe("formatShortcutForDisplay", () => {
  describe("Mac", () => {
    const isMac = true;

    it("should convert Command+Shift+Key to symbols", () => {
      expect(formatShortcutForDisplay("Command+Shift+C", isMac)).toBe("⌘⇧C");
    });

    it("should convert Alt+Shift+Key to symbols", () => {
      expect(formatShortcutForDisplay("Alt+Shift+X", isMac)).toBe("⌥⇧X");
    });

    it("should convert MacCtrl+Shift+Key to symbols", () => {
      expect(formatShortcutForDisplay("MacCtrl+Shift+C", isMac)).toBe("⌃⇧C");
    });

    it("should convert Command only", () => {
      expect(formatShortcutForDisplay("Command+C", isMac)).toBe("⌘C");
    });

    it("should convert Ctrl+Key to symbols", () => {
      expect(formatShortcutForDisplay("Ctrl+K", isMac)).toBe("⌃K");
    });
  });

  describe("Windows/Linux", () => {
    const isMac = false;

    it("should return shortcut as-is", () => {
      expect(formatShortcutForDisplay("Ctrl+Shift+C", isMac)).toBe(
        "Ctrl+Shift+C"
      );
    });

    it("should return Alt+Shift+Key as-is", () => {
      expect(formatShortcutForDisplay("Alt+Shift+X", isMac)).toBe(
        "Alt+Shift+X"
      );
    });
  });

  describe("empty shortcut", () => {
    it("should return empty string for empty input", () => {
      expect(formatShortcutForDisplay("", true)).toBe("");
      expect(formatShortcutForDisplay("", false)).toBe("");
    });
  });
});
