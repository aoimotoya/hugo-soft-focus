const script = document.currentScript;
const input = document.querySelector("#site-search");
const results = document.querySelector("#search-results");
const status = document.querySelector("#search-status");
const indexURL = script?.dataset.index;
const maximumResults = 30;

const normalize = (value) =>
  (value || "")
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[\u3000\s]+/gu, " ")
    .trim();

const makeTerms = (query) => {
  const terms = query.split(" ").filter(Boolean);
  // Also match individual Japanese characters so a query can find a word
  // inside Japanese text even when the user omits spaces.
  if (terms.length === 1 && /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(terms[0])) {
    const chars = Array.from(terms[0]);
    if (chars.length > 1) terms.push(...chars);
  }
  return [...new Set(terms)];
};

const scorePage = (page, terms) => {
  const title = normalize(page.title);
  const summary = normalize(page.summary);
  const content = normalize(page.content);
  let score = 0;
  let matchedTerms = 0;

  for (const term of terms) {
    let termScore = 0;
    if (title === term) termScore = 100;
    else if (title.startsWith(term)) termScore = 60;
    else if (title.includes(term)) termScore = 40;
    if (summary.includes(term)) termScore = Math.max(termScore, 12);
    if (content.includes(term)) termScore = Math.max(termScore, 3);
    if (termScore > 0) {
      matchedTerms += 1;
      score += termScore;
    }
  }

  // Prefer documents matching every query term, then prefer concise titles.
  if (matchedTerms !== terms.length) return 0;
  return score + Math.max(0, 2 - title.length / 80);
};

const clearResults = () => {
  results.replaceChildren();
  status.textContent = "";
};

const renderResults = (pages, query) => {
  results.replaceChildren();
  const terms = makeTerms(normalize(query));
  if (terms.length === 0) {
    status.textContent = "";
    return;
  }

  const matches = pages
    .map((page) => ({ page, score: scorePage(page, terms) }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title))
    .slice(0, maximumResults);

  status.textContent = matches.length
    ? `${matches.length} ${script.dataset.resultsLabel || "件の記事が見つかりました"}`
    : (script.dataset.emptyLabel || "記事が見つかりませんでした。");

  for (const { page } of matches) {
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
};

if (input && results && status && indexURL) {
  fetch(indexURL)
    .then((response) => {
      if (!response.ok) throw new Error("Search index could not be loaded");
      return response.json();
    })
    .then((pages) => {
      const searchable = pages.filter((page) => page.permalink && page.title);
      input.addEventListener("input", () => renderResults(searchable, input.value));

      // Listen at document level so key handling continues after focus moves
      // from the input into a result link. The input's search control can
      // otherwise consume ArrowUp/ArrowDown before a target-level listener.
      document.addEventListener("keydown", (event) => {
        const activeElement = document.activeElement;
        const links = [...results.querySelectorAll("a")];
        const currentIndex = links.indexOf(activeElement);
        const inSearch = activeElement === input || currentIndex >= 0;
        if (!inSearch) return;

        if (event.key === "Escape") {
          event.preventDefault();
          if (input.value) {
            input.value = "";
            clearResults();
          }
          input.focus();
        } else if (event.key === "ArrowDown" && links.length) {
          event.preventDefault();
          event.stopPropagation();
          if (activeElement === input) links[0].focus();
          else if (currentIndex < links.length - 1) links[currentIndex + 1].focus();
        } else if (event.key === "ArrowUp" && links.length) {
          event.preventDefault();
          event.stopPropagation();
          if (activeElement === input || currentIndex === 0) input.focus();
          else if (currentIndex > 0) links[currentIndex - 1].focus();
        }
      }, true);
    })
    .catch(() => {
      status.textContent = "検索データを読み込めませんでした。";
    });
}
