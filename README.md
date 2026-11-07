# kb.wemy.ninja

Personal knowledge base — [Hugo](https://gohugo.io/) + [OINK](https://github.com/pgsty/oink)
(Terminal preset), deployed to GitHub Pages at <https://kb.wemy.ninja/>.

## Requirements

Node 24 LTS (npm 11) — only to install the pinned Hugo extended binary.
The theme is a git submodule in `themes/oink`; it bundles all its assets
(no Sass, Bootstrap or npm packages of its own).

## Commands

```sh
git clone --recurse-submodules https://github.com/wem-r/kb.wemy.ninja.git
npm ci              # installs the pinned Hugo, inits the theme submodule
npm run serve       # http://localhost:1313, drafts included
npm run build       # production build into public/
```

## Layout

| Path | What |
|---|---|
| `hugo.toml` | Site config and OINK params (`params.ui.preset = "terminal"`) |
| `data/home/en.yaml` | Home page (OINK landing: hero + cards) |
| `content/en/docs/` | Knowledge Base (`_index.md` + `weight` for ordering) |
| `content/en/cheatsheets/` | Cheatsheets (own sidebar: `sidebar_root_for: self`) |
| `content/en/blog/` | Blog posts |
| `assets/scss/_styles_project.scss` | Site styles (terminal window frame) |
| `layouts/` | Site overrides of the theme — re-check them on every OINK upgrade |
| `scripts/` | One-off content helpers (image conversion/extraction) |
| `static/` | Copied as-is (`CNAME`) |

## Updating OINK / Hugo

Read the OINK changelog, move the submodule to the new tag, bump
`hugo-extended` if the release needs a newer Hugo, then `npm ci && npm run build`
and check the overrides listed in `layouts/`.
