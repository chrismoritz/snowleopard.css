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
- **Overlays and menus:** command palette, context menu, checkable menus, hover card, combobox, drawer.
- **Inputs:** toggle groups, rating, one-time code, text counter, plan cards, price range.
- **Data:** stat tiles, bar chart, timeline, skeleton loading, inspector, tree view.
- **Layout and flow:** assistant stepper, split view, carousel, typography.
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

The [live demo](https://chrismoritz.github.io/snowleopard.css/) opens on **Web patterns** (40 patterns across
navigation, forms, feedback, content, overlays, inputs, data, and layout) with switches to the **Finder simulator**
a long **SaaS home page** (hero, features, pricing, testimonials, FAQ, and footer), and **Compass**, a
simulated Camino-inspired browser with tabs, a tab overview, a bookmark bar, find in page, downloads, and a
Keychain-style sheet. All content is made up.
You can also open each on its own:
[web patterns](https://chrismoritz.github.io/snowleopard.css/demo/web-patterns.html),
[Finder](https://chrismoritz.github.io/snowleopard.css/demo/finder.html),
[SaaS home page](https://chrismoritz.github.io/snowleopard.css/demo/saas.html),
[browser](https://chrismoritz.github.io/snowleopard.css/demo/browser.html). Deep-link to a tab with
[`#finder`](https://chrismoritz.github.io/snowleopard.css/#finder),
[`#saas`](https://chrismoritz.github.io/snowleopard.css/#saas), or
[`#browser`](https://chrismoritz.github.io/snowleopard.css/#browser).

To build the pages locally and open them in a browser:

```sh
python3 scripts/build.py
open demo/finder.html
open demo/web-patterns.html
open demo/saas.html
open demo/browser.html
```

## React components (preview)

[`packages/snow-ui`](packages/snow-ui) is an early set of React components (Button, Select, Command) built
on Radix UI and Tailwind, with a shadcn-compatible registry. Run `npm install && npm run dev` to open the
gallery. The plain CSS above doesn't depend on any of this.

## Repo layout

| Path | Purpose |
| --- | --- |
| `src/snow.css` | The stylesheet. |
| `demo/src/*.template.html` | Demo page sources. |
| `demo/*.html`, `index.html` | Built, self-contained demos and the GitHub Pages page that switches between them (generated). |
| `vendor/aqua.css` | Pinned copy of aqua.css, used only to build the demos. |
| `scripts/build.py` | Inlines the CSS into the demo templates. |

## Credits

The Compass demo is inspired by [Camino](https://en.wikipedia.org/wiki/Camino_(web_browser)), the Mac-native
Gecko browser (2002 to 2013). It doesn't use Camino's name, logo, code, or artwork.

## Notes

- Lucida Grande is not bundled because it is Apple's font. The stylesheet falls back to
  Lucida Sans, DejaVu Sans, or Verdana.
- Cover Flow and Dock reflections use `-webkit-box-reflect`, which works in Chrome and Safari only.
- Mac OS X, Aqua, and Snow Leopard are trademarks of Apple Inc. This project is not
  affiliated with or endorsed by Apple.

## License

MIT. See [LICENSE](LICENSE). aqua.css is also MIT-licensed; its license is in
[vendor/aqua.css.LICENSE](vendor/aqua.css.LICENSE).
