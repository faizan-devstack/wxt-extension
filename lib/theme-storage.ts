export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function isValidTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export async function getStoredTheme(): Promise<Theme> {
  // Prefer extension storage when available (shared across popup/background/content).
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    return await new Promise<Theme>((resolve) => {
      chrome.storage.local.get([STORAGE_KEY], (result) => {
        const raw = (result as Record<string, unknown>)[STORAGE_KEY];
        resolve(isValidTheme(raw) ? raw : "system");
      });
    });
  }

  // Fallback for non-extension environments.
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return isValidTheme(raw) ? raw : "system";
  }

  return "system";
}

export async function setStoredTheme(theme: Theme): Promise<void> {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    await new Promise<void>((resolve) => {
      if (theme === "system") {
        chrome.storage.local.remove([STORAGE_KEY], () => resolve());
      } else {
        chrome.storage.local.set({ [STORAGE_KEY]: theme }, () => resolve());
      }
    });
    return;
  }

  if (typeof window !== "undefined") {
    if (theme === "system") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, theme);
  }
}

export function onStoredThemeChange(callback: (theme: Theme) => void) {
  if (typeof chrome === "undefined" || !chrome.storage?.onChanged) return () => {};

  const listener: Parameters<typeof chrome.storage.onChanged.addListener>[0] = (
    changes,
    areaName,
  ) => {
    if (areaName !== "local") return;
    const change = changes[STORAGE_KEY];
    if (!change) return;

    const next = isValidTheme(change.newValue) ? change.newValue : "system";
    callback(next);
  };

  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
}

