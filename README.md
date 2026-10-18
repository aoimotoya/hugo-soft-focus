# Soft Focus

A Hugo theme with layered article cards, an autumn light palette, and a winter dark palette. It can be maintained in its own Git repository and added to a Hugo site as a Git submodule, without changing existing content files.

## Use with the blog

From the root of your Hugo site:

```sh
git submodule add <theme-repository-url> themes/hugo-soft-focus
```

Then change only the site configuration (`config.yml`) to:

```yaml
theme: hugo-soft-focus
```

Run `hugo server` from the site repository to preview it. The theme reads existing content and `menu.main`; Markdown files do not need to change. Edit `assets/css/main.css` and the templates in `layouts/` to develop the design.

## Settings

All settings below are optional. Add them to your site configuration, not to the theme repository. Existing PaperMod setting names are supported where they have a matching Soft Focus feature.

| Setting | Default | Effect |
| --- | --- | --- |
| `paginate` | Hugo default | Number of articles per page on the home page and list pages |
| `params.mainSections` | `["posts"]` | Content sections included in the archive |
| `params.DateFormat` | `2006-01-02` | Date layout in Go's format |
| `params.showtoc` | `true` | Show the table of contents on article pages |
| `params.tocopen` | `false` | Start the collapsible table of contents open |
| `params.ShowBreadCrumbs` | `false` | Show article breadcrumbs |
| `params.ShowReadingTime` | `false` | Show estimated reading time |
| `params.author` or page `author` | none | Show the author in article metadata |
| `params.env` | Hugo environment | Enable production metadata and analytics when set to `production` |
| `params.analytics.google.SiteVerificationTag` | none | Emit a Google site verification meta tag |
| `params.ShowPostNavLinks` | `true` | Show newer and older article links |
| `params.ShowCodeCopyButtons` | `false` | Add copy buttons to code blocks on article pages |
| `params.ShowRssButtonInSectionTermList` | `false` | Show RSS links on section and term lists |
| `params.disableScrollToTop` | `false` | Hide the back-to-top button |
| `params.list.preview` | `section` | `section`: first content section with headings and rich content; `summary`: Hugo summary; `hidden`: no preview |
| `params.defaultTheme` | `auto` | Initial appearance: `auto`, `light`, or `dark` |
| `params.disableThemeToggle` | `false` | Hide the appearance switcher and use `defaultTheme` |

For example:

```yaml
paginate: 10
params:
  DateFormat: "2006-01-02"
  showtoc: false
  ShowBreadCrumbs: true
  ShowReadingTime: false
  ShowPostNavLinks: true
  defaultTheme: auto
  disableThemeToggle: false
  list:
    preview: section
```

The appearance switcher starts with `defaultTheme` and then uses a visitor's saved choice when available. `auto` follows the operating system. With `disableThemeToggle: true`, saved choices are ignored.

Search needs the home JSON output enabled in the site configuration:

```yaml
outputs:
  home: [HTML, RSS, JSON]
```

The older `params.list.summary` values `show`, `auto`, and `hidden` remain accepted as aliases for `section`, `summary`, and `hidden`.

## Article previews

In the default `section` mode, article lists show the first h2–h6 section that contains text or media. The preview keeps its headings and complete rendered elements, including lists, code blocks, and images. Consecutive headings without content remain with the first populated section. If no section contains content, the preview uses the first paragraph; articles without paragraphs show their full content.

Markdown links and images with relative destinations resolve from the source article, so they also work in previews on the home page and taxonomy pages. Fragment links such as `#details` lead to the source article. The “read more” link appears only when the preview omits content.

## Typography

The theme loads Noto Sans JP from Google Fonts for text and Noto Sans Mono for code blocks. Japanese characters in code blocks use an available monospaced fallback, which may vary by system. Visitors need access to Google Fonts for these typefaces; otherwise the browser uses fallback fonts.

When Hugo emits class-based Chroma markup, the theme colors syntax tokens for both appearance modes. The site's `markup.highlight.style` setting applies to inline styles, not to these theme colors.

Images in article content and post previews open in a dialog when clicked. If a thumbnail links directly to an image file (`.jpg`, `.png`, `.webp`, and other common image formats), the dialog shows the linked full-size image. Other image links keep their link behavior. The dialog also supports keyboard opening, Escape to close it, and a close button.

## Theme development

The repository is standalone. Commit changes here, push it to a Git host, then update the submodule pointer in the site repository when ready.
