#!/usr/bin/env node
// Fails if a --snow-* token in snow-ui's theme has a different value than src/snow.css.
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const read = (p) => readFileSync(path.join(root, p), "utf8")

// Collect `--snow-*: value;` declarations per selector block.
function tokens(css) {
  const out = {}
  for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const key = selector.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim()
    for (const [, name, value] of body.matchAll(/(--snow-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
      ;(out[key] ??= {})[name] = value.trim().replace(/\s+/g, " ")
    }
  }
  return out
}

const core = tokens(read("src/snow.css"))
const theme = tokens(read("packages/snow-ui/src/styles/snow-theme.css"))

// theme selector -> matching selector in snow.css
const pairs = [
  [":root, .snow", ".snow"],
  [".theme-graphite", ".snow.theme-graphite"],
]

let bad = 0
let checked = 0
for (const [themeSel, coreSel] of pairs) {
  for (const [name, value] of Object.entries(theme[themeSel] ?? {})) {
    const expected = core[coreSel]?.[name]
    if (expected === undefined) continue // derived token that only exists in snow-ui
    checked++
    if (expected !== value) {
      bad++
      console.error(`${name} in "${themeSel}": snow-ui has "${value}", snow.css has "${expected}"`)
    }
  }
}

if (checked === 0) {
  console.error("No shared tokens found. Did the selectors change?")
  process.exit(1)
}
if (bad) process.exit(1)
console.log(`Token check passed: ${checked} shared tokens match src/snow.css.`)
