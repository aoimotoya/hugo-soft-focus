try {
  const savedTheme = localStorage.getItem("soft-focus-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.dataset.theme = savedTheme;
  }
} catch (_) {
  // Storage may be unavailable; the CSS follows the system preference.
}
