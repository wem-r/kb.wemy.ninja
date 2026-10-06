# kb.wemy.ninja

Personal knowledge base — [Hugo](https://gohugo.io/) + [Docsy](https://www.docsy.dev/),
deployed to GitHub Pages at <https://kb.wemy.ninja/>.

## Requirements

Node 24 LTS (npm 11). Everything else — Docsy, Hugo extended, Dart Sass — is
pinned in `package.json` / `package-lock.json`. No Go, no global Hugo install.

## Commands

```sh
npm ci              # install pinned toolchain
npm run serve       # http://localhost:1313, drafts included
npm run build       # production build into public/
npm run clean       # remove build output and caches
```

## Layout

| Path | What |
|---|---|
| `hugo.toml` | Site config and Docsy params |
| `content/en/docs/` | Docs section (`_index.md` + `weight` for ordering) |
| `content/en/blog/` | Blog posts, grouped by year |
| `assets/scss/_variables_project.scss` | Brand variables (before Bootstrap) |
| `assets/scss/_styles_project.scss` | Style overrides (after Docsy) |
| `layouts/` | Template overrides — never edit `node_modules/@docsy/theme` |
| `static/` | Copied as-is (`CNAME`, favicons, images) |

## Updating Docsy / Hugo

Bump the three packages together (Dependabot groups them), read the Docsy
release report at <https://www.docsy.dev/blog/>, then `npm ci && npm run build`.
