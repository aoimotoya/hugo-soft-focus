(() => {
  const copyText = async (text) => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {
        // Fall back when clipboard permission is unavailable.
      }
    }

    const field = document.createElement("textarea");
    field.value = text;
    field.readOnly = true;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    try {
      return document.execCommand("copy");
    } catch (_) {
      return false;
    } finally {
      field.remove();
    }
  };

  for (const code of document.querySelectorAll(".single .content pre > code")) {
    const pre = code.parentElement;
    let container = pre.closest(".highlight");
    if (!container) {
      container = document.createElement("div");
      pre.before(container);
      container.append(pre);
    }
    container.classList.add("copyable-code");

    const button = document.createElement("button");
    button.className = "copy-code";
    button.type = "button";
    button.textContent = "コピー";
    button.setAttribute("aria-label", "コードをコピー");
    button.setAttribute("aria-live", "polite");
    container.append(button);

    let resetTimer;
    button.addEventListener("click", async () => {
      const copied = await copyText(code.textContent);
      button.focus();
      button.textContent = copied ? "コピーしました" : "コピーできませんでした";
      button.setAttribute("aria-label", copied ? "コードをコピーしました" : "コードをコピーできませんでした");
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        button.textContent = "コピー";
        button.setAttribute("aria-label", "コードをコピー");
      }, 2000);
    });
  }
})();
