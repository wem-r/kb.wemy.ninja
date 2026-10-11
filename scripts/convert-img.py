#!/usr/bin/env python3
"""Convert raw HTML <img> tags in Markdown notes to Markdown images.

  <p align="center"><img src="IMG/x.png"></p>   ->  ![](IMG/x.png)
  <img src="IMG/x.png">                          ->  ![](IMG/x.png)

Usage: python3 convert-img.py content/en   (rewrites .md files in place)
"""
import pathlib
import re
import sys

WRAPPED = re.compile(r'<p\s+align="center">\s*<img\s+src="([^"]+)"\s*/?>\s*</p>', re.I | re.S)
BARE = re.compile(r'<img\s+src="([^"]+)"\s*/?>', re.I)

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "content")
total = 0
for md in sorted(root.rglob("*.md")):
    text = md.read_text(encoding="utf-8")
    new, n1 = WRAPPED.subn(lambda m: f"![]({m.group(1)})", text)
    new, n2 = BARE.subn(lambda m: f"![]({m.group(1)})", new)
    if n1 + n2:
        md.write_text(new, encoding="utf-8")
        print(f"{md}: {n1 + n2} image(s)")
        total += n1 + n2
print(f"total: {total}")
