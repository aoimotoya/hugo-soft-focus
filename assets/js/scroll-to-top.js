(() => {
  const link = document.querySelector(".back-to-top");
  if (!link) return;

  const update = () => { link.hidden = window.scrollY < 800; };
  window.addEventListener("scroll", update, { passive: true });
  update();
})();
