const toggle = document.querySelector(".theme-toggle");

if (toggle) {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () =>
    document.documentElement.dataset.theme || (systemTheme.matches ? "dark" : "light");
  const updateButton = () => {
    toggle.setAttribute("aria-pressed", String(currentTheme() === "dark"));
  };

  updateButton();
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    const nextTheme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("soft-focus-theme", nextTheme);
    } catch (_) {
      // The current page still switches when storage is unavailable.
    }
    updateButton();
  });
  systemTheme.addEventListener("change", updateButton);
}
