const themeScript = document.currentScript;
const defaultTheme = themeScript?.dataset.defaultTheme || "auto";
let selectedTheme = defaultTheme;

if (themeScript?.dataset.disableToggle !== "true") {
  try {
    const savedTheme = localStorage.getItem("soft-focus-theme");
    if (savedTheme === "light" || savedTheme === "dark") selectedTheme = savedTheme;
  } catch (_) {
    // Storage may be unavailable; use the site default.
  }
}

if (selectedTheme === "light" || selectedTheme === "dark") {
  document.documentElement.dataset.theme = selectedTheme;
}
