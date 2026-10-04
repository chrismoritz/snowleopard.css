import { useEffect, useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-[6px] border border-black/60 bg-[#ececec] shadow-[0_8px_26px_rgba(0,0,0,0.55)]">
      <header className="flex h-[22px] items-center gap-1.5 border-b border-[var(--snow-chrome-line)] bg-[linear-gradient(var(--snow-chrome-top),var(--snow-chrome-mid)_50%,var(--snow-chrome-bot))] px-2">
        <span className="size-3 rounded-full border border-[#8b2a22] bg-[radial-gradient(circle_at_50%_30%,#ffb0a8,#e0453a)]" />
        <span className="size-3 rounded-full border border-[#9a6a10] bg-[radial-gradient(circle_at_50%_30%,#ffe9a0,#e5a921)]" />
        <span className="size-3 rounded-full border border-[#2f7a28] bg-[radial-gradient(circle_at_50%_30%,#b9f0b0,#3fb335)]" />
        <h2 className="mr-14 flex-1 text-center text-[13px] font-normal">{title}</h2>
      </header>
      <div className="flex flex-col gap-4 p-5">{children}</div>
    </section>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="w-24 text-right text-[12px] text-[var(--snow-ink-soft)]">{label}</span>
      {children}
    </div>
  )
}

export function App() {
  const [graphite, setGraphite] = useState(false)
  const [open, setOpen] = useState(false)
  const [font, setFont] = useState("lucida")
  const [last, setLast] = useState("Nothing yet")

  useEffect(() => {
    document.documentElement.classList.toggle("theme-graphite", graphite)
  }, [graphite])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const run = (name: string) => {
    setLast(name)
    setOpen(false)
  }

  return (
    <main className="mx-auto flex max-w-[760px] flex-col gap-6 px-3 pt-10 pb-24">
      <Window title="snow-ui">
        <p className="m-0 leading-relaxed">
          Mac OS X 10.6 components for React, built on Radix UI and Tailwind. This is an early preview with three components.
        </p>
        <Row label="Appearance">
          <Button variant={graphite ? "secondary" : "default"} onClick={() => setGraphite(false)}>Blue</Button>
          <Button variant={graphite ? "default" : "secondary"} onClick={() => setGraphite(true)}>Graphite</Button>
        </Row>
      </Window>

      <Window title="Button">
        <Row label="Variants">
          <Button variant="secondary">Cancel</Button>
          <Button variant="default">Save</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </Row>
        <Row label="Sizes">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </Row>
        <Row label="Disabled">
          <Button disabled>Cancel</Button>
          <Button variant="default" disabled>Save</Button>
        </Row>
      </Window>

      <Window title="Select">
        <Row label="Pop-up button">
          <Select value={font} onValueChange={setFont}>
            <SelectTrigger aria-label="Font">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>System</SelectLabel>
                <SelectItem value="lucida">Lucida Grande</SelectItem>
                <SelectItem value="helvetica">Helvetica Neue</SelectItem>
                <SelectItem value="geneva">Geneva</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Monospaced</SelectLabel>
                <SelectItem value="menlo">Menlo</SelectItem>
                <SelectItem value="monaco">Monaco</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="text-[12px] text-[var(--snow-ink-soft)]">Selected: {font}</span>
        </Row>
        <Row label="Disabled">
          <Select disabled defaultValue="a">
            <SelectTrigger aria-label="Disabled example"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="a">Unavailable</SelectItem></SelectContent>
          </Select>
        </Row>
      </Window>

      <Window title="Command">
        <Row label="Spotlight">
          <Button variant="default" onClick={() => setOpen(true)}>
            Open command palette <span className="opacity-80">⌘K</span>
          </Button>
          <span className="text-[12px] text-[var(--snow-ink-soft)]">Last command: {last}</span>
        </Row>
      </Window>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Spotlight Search" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Applications">
            <CommandItem onSelect={() => run("Open Finder")}>Finder<CommandShortcut>⌘1</CommandShortcut></CommandItem>
            <CommandItem onSelect={() => run("Open Mail")}>Mail<CommandShortcut>⌘2</CommandShortcut></CommandItem>
            <CommandItem onSelect={() => run("Open Safari")}>Safari<CommandShortcut>⌘3</CommandShortcut></CommandItem>
          </CommandGroup>
          <CommandGroup heading="Documents">
            <CommandItem onSelect={() => run("Open Quarterly Report.pdf")}>Quarterly Report.pdf</CommandItem>
            <CommandItem onSelect={() => run("Open Trip Notes.txt")}>Trip Notes.txt</CommandItem>
          </CommandGroup>
          <CommandGroup heading="System Preferences">
            <CommandItem onSelect={() => run("Open Appearance")}>Appearance</CommandItem>
            <CommandItem onSelect={() => run("Open Dock")}>Dock</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <p className="text-center text-[12px] leading-relaxed text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]">
        Mac OS X, Aqua, and Snow Leopard are trademarks of Apple Inc. This project isn't affiliated with Apple.
      </p>
    </main>
  )
}
