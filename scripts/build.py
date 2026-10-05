#!/usr/bin/env python3
"""Build the self-contained demo pages in demo/ from templates in demo/src/."""
import pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
aqua = (root / "vendor" / "aqua.css").read_text()
aqua = re.sub(r"@font-face\{[^}]*\}", "", aqua)  # fonts fall back to system fonts
snow = (root / "src" / "snow.css").read_text()

pages = {
    "finder.template.html": "demo/finder.html",
    "web-patterns.template.html": "demo/web-patterns.html",
    "saas.template.html": "demo/saas.html",
    "browser.template.html": "demo/browser.html",
    "index.template.html": "index.html",  # GitHub Pages landing page
}
for src, dst in pages.items():
    html = (root / "demo" / "src" / src).read_text()
    html = html.replace("/*AQUA_CSS*/", aqua).replace("/*SNOW_CSS*/", snow)
    (root / dst).write_text(html)
    print(f"built {dst} ({len(html) // 1024} KB)")
