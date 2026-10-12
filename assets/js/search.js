const script = document.currentScript;
const input = document.querySelector("#site-search");
const results = document.querySelector("#search-results");
const status = document.querySelector("#search-status");
const indexURL = script?.dataset.index;

if (input && results && indexURL) {
  fetch(indexURL)
    .then((response) => {
      if (!response.ok) throw new Error("Search index could not be loaded");
      return response.json();
    })
    .then((pages) => {
      const searchable = pages.filter((page) => page.permalink && page.title);
      input.addEventListener("input", () => {
        const query = input.value.trim().toLocaleLowerCase();
        results.replaceChildren();
        if (!query) {
          status.textContent = "";
          return;
        }
        const matches = searchable.filter((page) =>
          [page.title, page.summary, page.content].some((value) =>
            (value || "").toLocaleLowerCase().includes(query),
          ),
        ).slice(0, 30);
        status.textContent = matches.length
          ? `${matches.length} ${script.dataset.resultsLabel || "件の記事が見つかりました"}`
          : (script.dataset.emptyLabel || "記事が見つかりませんでした。");
        for (const page of matches) {
          const item = document.createElement("li");
          const link = document.createElement("a");
          link.href = page.permalink;
          link.textContent = page.title;
          item.append(link);
          if (page.summary) {
            const summary = document.createElement("p");
            summary.textContent = page.summary;
            item.append(summary);
          }
          results.append(item);
        }
      });
    })
    .catch(() => {
      status.textContent = "検索データを読み込めませんでした。";
    });
}
