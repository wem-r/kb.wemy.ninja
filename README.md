# kb.wemy.ninja

Personal knowledge base, built with [Hugo](https://gohugo.io/) and its own theme
(`themes/wem/`, a tiling-window-manager look), deployed to GitHub Pages at
<https://kb.wemy.ninja/>.

## Requirements

Node 24 LTS (npm 11), only to install the pinned Hugo extended binary.
The theme lives in this repo: no submodule, no Sass, no npm packages.

## Commands

```sh
git clone https://github.com/wem-r/kb.wemy.ninja.git
npm ci              # installs the pinned Hugo
npm run serve       # http://localhost:1313, drafts included
npm run build       # production build into public/
```

## Layout

| Path | What |
|---|---|
| `hugo.toml` | Site config; workspaces of the top bar in `[params.wem]` |
| `content/en/kb/` | Knowledge Base (`_index.md` + `weight` for ordering, `no_list: true` to hide the `ls -l` listing) |
| `content/en/cheatsheets/` | Cheatsheets (workspace 2) |
| `content/en/blog/` | Blog (workspace 3) |
| `themes/wem/` | The theme (see below) |
| `layouts/robots.txt` | Disallow everything |
| `scripts/` | One-off content helpers (image conversion/extraction) |
| `static/` | Copied as-is (`CNAME`, favicons) |

## The theme (`themes/wem/`)

| File | What |
|---|---|
| `assets/css/wm.css` | All styles. Colours are the token blocks at the top (`dark` = cyberpunk, `light` = to redesign) |
| `assets/css/chroma.css` | Code highlighting colours, generated with `hugo gen chromastyles` |
| `assets/js/wm.js` | Theme toggle, tree, toc, scroll %, copy buttons, phone tabs, keyboard |
| `assets/js/search.js` / `graph.js` | Search overlay (`/`) and the local graph tile |
| `layouts/baseof.html`, `_partials/desk.html` | Page frame: top bar + tiles [1] tree, [2] note, [3] toc, [4] graph |
| `layouts/home.html`, `404.html` | Home screen and 404 |
| `layouts/home.searchindex.json`, `home.graph.json` | `/index.json` (search) and `/graph.json` (graph), built on every deploy |
| `layouts/_markup/` | Render hooks: code blocks, ```` ```terminal ````, callouts, images, headings |

Content conventions:

- ```` ```terminal ```` blocks: lines starting with a prompt (`user@host:~$`, `#`, `PS C:\>`, …) are commands,
  the others output; the copy button copies commands only.
- Callouts: `> [!NOTE] Title`, `> [!WARNING]`, `> [!TIP]`, …
- Images: Obsidian paths work as-is (`IMG/Pasted image ….png`, or just the file name).

## Updating Hugo

Bump `hugo-extended` in `package.json`, `npm install`, then `npm run build` and look at a few pages.
