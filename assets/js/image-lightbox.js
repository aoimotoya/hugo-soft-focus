(() => {
  const dialog = document.querySelector(".image-lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const enlargedImage = dialog.querySelector("img");
  const caption = dialog.querySelector("figcaption");
  const closeButton = dialog.querySelector(".image-lightbox-close");
  const imageExtension = /\.(?:avif|bmp|gif|jpe?g|png|svg|tiff?|webp)$/i;
  const preparedLinks = new WeakSet();
  let activeTrigger = null;

  const linksToImage = (link) => {
    try {
      return imageExtension.test(decodeURIComponent(new URL(link.href).pathname));
    } catch {
      return false;
    }
  };

  const openImage = (image, source, trigger) => {
    activeTrigger = trigger;
    enlargedImage.src = source;
    enlargedImage.alt = image.alt;
    caption.textContent = image.title || image.alt;
    caption.hidden = !caption.textContent;
    dialog.showModal();
    closeButton.focus();
  };

  for (const image of document.querySelectorAll(".content img")) {
    if (image.closest("button")) continue;

    const link = image.closest("a[href]");
    if (link) {
      if (!linksToImage(link) || link.hasAttribute("download")) continue;
      image.classList.add("image-lightbox-trigger");
      link.setAttribute("aria-haspopup", "dialog");
      if (!link.getAttribute("aria-label") && !link.textContent.trim()) link.setAttribute("aria-label", `画像を拡大: ${image.alt || "画像"}`);
      if (preparedLinks.has(link)) continue;
      preparedLinks.add(link);
      link.addEventListener("click", (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const clickedImage = event.target instanceof Element ? event.target.closest("img") : null;
        if (!clickedImage && event.detail !== 0) return;
        event.preventDefault();
        openImage(clickedImage || image, link.href, link);
      });
      link.addEventListener("keydown", (event) => {
        if (event.key !== " ") return;
        event.preventDefault();
        openImage(image, link.href, link);
      });
      continue;
    }

    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `画像を拡大: ${image.alt || "画像"}`);
    image.classList.add("image-lightbox-trigger");
    image.addEventListener("click", () => openImage(image, image.currentSrc || image.src, image));
    image.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openImage(image, image.currentSrc || image.src, image);
    });
  }

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => {
    enlargedImage.removeAttribute("src");
    if (activeTrigger?.isConnected) activeTrigger.focus({ preventScroll: true });
    activeTrigger = null;
  });
})();
