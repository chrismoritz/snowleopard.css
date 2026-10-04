# snow-ui

Mac OS X 10.6 "Snow Leopard" components for React, built on
[Radix UI](https://www.radix-ui.com/), [cmdk](https://cmdk.paco.me/), and Tailwind CSS v4. They follow
[shadcn/ui](https://ui.shadcn.com/) conventions, so you can install them through the shadcn CLI and own the
source.

> Status: early preview. Three components, not yet published.

## Components

| Component | Mac name | Built on |
| --- | --- | --- |
| `button` | Push button | Radix Slot |
| `select` | Pop-up button | Radix Select |
| `command` | Spotlight | cmdk, Radix Dialog |

## Develop

From the repo root:

```sh
npm install
npm run dev              # gallery at http://localhost:5173
npm run typecheck
npm run check:tokens     # fails if the theme drifts from src/snow.css
npm run registry:build   # writes packages/snow-ui/public/r/*.json
```

## Theme

`src/styles/snow-theme.css` defines the `--snow-*` tokens for Blue (default) and Graphite. Add the
`theme-graphite` class to `<html>` or any ancestor to switch. The color tokens mirror
[`src/snow.css`](../../src/snow.css); `npm run check:tokens` keeps them in sync.

## Install into an app

Once the registry JSON is hosted, add components with the shadcn CLI:

```sh
npx shadcn@latest add https://<host>/r/button.json
```

The `snow-theme` item copies the theme file to `~/styles/snow-theme.css`. Import it after Tailwind:

```css
@import "tailwindcss";
@import "./styles/snow-theme.css";
```

Hosting the registry isn't set up yet, and the install flow hasn't been tested end to end.

## Notes

- Lucida Grande isn't bundled. Text falls back to Lucida Sans, DejaVu Sans, or Verdana.
- Mac OS X, Aqua, and Snow Leopard are trademarks of Apple Inc. This project isn't affiliated with Apple.
