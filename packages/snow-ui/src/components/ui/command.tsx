import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/* A Spotlight-style command palette: a search field over results grouped under blue-gray headings. */

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-[6px] bg-white text-black font-[family-name:var(--font-ui)]",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command palette",
  description = "Search for a command to run",
  children,
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & { title?: string; description?: string; className?: string }) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/30" />
        <DialogPrimitive.Content
          data-slot="command-dialog"
          className={cn(
            "fixed top-[16vh] left-1/2 z-50 w-[min(92vw,34rem)] -translate-x-1/2 overflow-hidden outline-none",
            "rounded-[6px] border border-[#8f8f8f] bg-white shadow-[var(--snow-menu-shadow)]",
            className
          )}
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">{description}</DialogPrimitive.Description>
          <Command>{children}</Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="flex items-center gap-2.5 border-b border-[#c4c4c4] bg-[linear-gradient(#fafafa,#ececec)] px-3.5">
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="var(--snow-ink-soft)" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <circle cx="6.5" cy="6.5" r="4.5" />
        <path d="m10 10 4 4" />
      </svg>
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "h-12 w-full bg-transparent text-[18px] outline-none placeholder:text-[#9a9a9a] disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn("max-h-80 overflow-x-hidden overflow-y-auto", className)}
      {...props}
    />
  )
}

function CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-[13px] text-[var(--snow-ink-soft)]"
      {...props}
    />
  )
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden",
        "[&_[cmdk-group-heading]]:border-y [&_[cmdk-group-heading]]:border-[var(--snow-source-edge)]",
        "[&_[cmdk-group-heading]]:bg-[var(--snow-source-bg)] [&_[cmdk-group-heading]]:px-3.5 [&_[cmdk-group-heading]]:py-0.5",
        "[&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-[var(--snow-source-head)]",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator data-slot="command-separator" className={cn("h-px bg-black/15", className)} {...props} />
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2.5 px-3.5 py-1.5 text-[13px] outline-none select-none",
        "data-[selected=true]:bg-[image:var(--snow-gel-flat)] data-[selected=true]:text-white",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="command-shortcut" className={cn("ml-auto text-xs opacity-70", className)} {...props} />
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
