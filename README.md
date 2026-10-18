# Soft Focus

A minimal Hugo theme starter. It can be maintained in its own Git repository and added to a Hugo site as a Git submodule, without changing existing content files.

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
| `params.DateFormat` | `2006-01-02` | Date layout in Go's format |
| `params.showtoc` | `true` | Show the table of contents on article pages |
| `params.ShowBreadCrumbs` | `false` | Show article breadcrumbs |
| `params.ShowReadingTime` | `false` | Show estimated reading time |
| `params.ShowPostNavLinks` | `true` | Show newer and older article links |
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

## Theme development

The repository is standalone. Commit changes here, push it to a Git host, then update the submodule pointer in the site repository when ready.
