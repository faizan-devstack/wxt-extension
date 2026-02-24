import {
  getStoredTheme,
  onStoredThemeChange,
  type Theme,
} from "@/lib/theme-storage";

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export async function attachThemeToElement(el: HTMLElement) {
  el.classList.add("theme-root");

  let currentTheme: Theme = await getStoredTheme();
  let detachSystemListener = () => {};

  const apply = () => {
    const resolved = resolveTheme(currentTheme);
    el.classList.toggle("dark", resolved === "dark");
  };

  const setTheme = (next: Theme) => {
    currentTheme = next;

    detachSystemListener();
    detachSystemListener = () => {};

    if (currentTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => apply();
      media.addEventListener("change", listener);
      detachSystemListener = () => media.removeEventListener("change", listener);
    }

    apply();
  };

  setTheme(currentTheme);

  const detachStorageListener = onStoredThemeChange(setTheme);

  return () => {
    detachStorageListener();
    detachSystemListener();
  };
}

