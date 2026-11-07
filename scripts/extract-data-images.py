#!/usr/bin/env python3
"""Extract images embedded as data URIs in Markdown notes into real files.

  ![alt](data:image/png;base64,iVBOR...)   ->   ![alt](IMG/<Note_name>_img<N>.png)

The image is written to an IMG/ folder next to the note. Identical images in
the same note are written once. Notes are rewritten in place.

Usage:  python3 scripts/extract-data-images.py content/en
"""
import base64
import hashlib
import pathlib
import re
import sys

PATTERN = re.compile(r'!\[([^\]]*)\]\(data:image/([a-zA-Z0-9.+-]+);base64,([^)]+)\)')
EXT = {"png": "png", "jpeg": "jpg", "jpg": "jpg", "gif": "gif", "webp": "webp", "svg+xml": "svg"}

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "content")
total = 0
for md in sorted(root.rglob("*.md")):
    text = md.read_text(encoding="utf-8")
    if "data:image/" not in text:
        continue
    stem = re.sub(r"[^A-Za-z0-9_-]+", "_", md.stem).strip("_")
    img_dir = md.parent / "IMG"
    seen = {}

    def replace(m):
        global total
        alt, mime, data = m.group(1), m.group(2).lower(), re.sub(r"[^A-Za-z0-9+/=]", "", m.group(3))  # also drops stray copy-paste characters
        raw = base64.b64decode(data + "=" * (-len(data) % 4))
        digest = hashlib.sha256(raw).hexdigest()
        if digest not in seen:
            # next free number: never overwrite an existing file
            n = 1
            while (img_dir / f"{stem}_img{n}.{EXT.get(mime, mime)}").exists():
                n += 1
            name = f"{stem}_img{n}.{EXT.get(mime, mime)}"
            img_dir.mkdir(exist_ok=True)
            (img_dir / name).write_bytes(raw)
            seen[digest] = name
            total += 1
        return f"![{alt}](IMG/{seen[digest]})"

    new = PATTERN.sub(replace, text)
    md.write_text(new, encoding="utf-8")
    left = new.count("data:image/")
    print(f"{md}: {len(seen)} image(s) extracted" + (f", {left} not matched — check by hand" if left else ""))
print(f"total files written: {total}")
