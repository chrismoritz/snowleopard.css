# snow.css

A Mac OS X 10.6 "Snow Leopard" layer for the web, built on top of
[aqua.css](https://github.com/ahzs645/aqua.css). It adds the Finder-style window
chrome and a set of common web patterns, all drawn in glossy Aqua.

**[Live demo](https://chrismoritz.github.io/snowleopard.css/)**

> Status: early draft. The layout has been tested in a simulated DOM but not yet
> reviewed visually in a browser.

## What's included

- **Window chrome:** unified title bar and toolbar, traffic lights, segmented buttons.
- **Finder pieces:** source list, icon, list, column, and Cover Flow views, path bar, status bar.
- **Dock:** glass shelf with magnification and running indicators.
- **Navigation:** site nav bar, pop-up menu, breadcrumbs, pagination, tab view, document tabs.
- **Forms:** validation states, ON/OFF switch, stepper, token field, date picker, file drop zone.
- **Feedback:** HUD toasts, alert dialog, sheet, tooltip, popover, inline banners.
- **Content:** cards, accordion, sortable data table, empty state, avatars, badges, labels.
- **Appearances:** Blue (default) and Graphite, through CSS variables.

## Usage

Load aqua.css first, then `src/snow.css`. Wrap your UI in an element with the `snow`
class and the 10.6 era attribute:

```html
<div class="snow" data-aqua-era="10-6">
  <section class="window">
    <div class="snow-chrome">
      <div class="title-bar">
        <div class="title-bar-controls">
          <button aria-label="Close"></button>
          <button aria-label="Minimize"></button>
          <button aria-label="Zoom"></button>
        </div>
        <div class="title-bar-text">My window</div>
      </div>
    </div>
    <div class="window-body">…</div>
  </section>
</div>
```

For Graphite, add `theme-graphite` to the same element.

## Demos

View the demos online at <https://chrismoritz.github.io/snowleopard.css/>:
[Finder](https://chrismoritz.github.io/snowleopard.css/demo/finder.html) and
[web patterns](https://chrismoritz.github.io/snowleopard.css/demo/web-patterns.html).

To build the pages locally and open them in a browser:

```sh
python3 scripts/build.py
open demo/finder.html
open demo/web-patterns.html
```

## Repo layout

| Path | Purpose |
| --- | --- |
| `src/snow.css` | The stylesheet. |
| `demo/src/*.template.html` | Demo page sources. |
| `demo/*.html`, `index.html` | Built, self-contained demos and the GitHub Pages landing page (generated). |
| `vendor/aqua.css` | Pinned copy of aqua.css, used only to build the demos. |
| `scripts/build.py` | Inlines the CSS into the demo templates. |

## Notes

- Lucida Grande is not bundled because it is Apple's font. The stylesheet falls back to
  Lucida Sans, DejaVu Sans, or Verdana.
- Cover Flow and Dock reflections use `-webkit-box-reflect`, which works in Chrome and Safari only.
- Mac OS X, Aqua, and Snow Leopard are trademarks of Apple Inc. This project is not
  affiliated with or endorsed by Apple.

## License

MIT. See [LICENSE](LICENSE). aqua.css is also MIT-licensed; its license is in
[vendor/aqua.css.LICENSE](vendor/aqua.css.LICENSE).
