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

Run `hugo server` from the site repository to preview it. The theme reads common Hugo page fields (`Title`, `Date`, `Summary`, `Content`) and site settings such as `menu.main`, `params.DateFormat`, `params.showtoc`, and `params.homeInfoParams`. You can edit `assets/css/main.css` and the templates in `layouts/` to develop the design.

## Theme development

The repository is standalone. Commit changes here, push it to a Git host, then update the submodule pointer in the site repository when ready.
