import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/* A Mac pop-up button: white push button with a blue gel end cap holding the up and down arrows. */

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "group inline-flex h-7 min-w-36 items-center justify-between overflow-hidden",
        "rounded-[5px] border border-[var(--snow-btn-edge)] bg-[image:var(--snow-btn)] pl-3 text-[13px] text-black",
        "font-[family-name:var(--font-ui)] shadow-[var(--snow-bevel)] outline-none",
        "focus-visible:shadow-[0_0_0_3px_var(--snow-focus)] data-[state=open]:brightness-95",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      <span
        aria-hidden
        className="ml-3 grid h-full w-5 place-items-center border-l border-[var(--snow-sel-edge)] bg-[image:var(--snow-gel)]"
      >
        <svg width="9" height="12" viewBox="0 0 9 12" fill="white" className="drop-shadow-[0_-1px_0_rgba(0,0,0,0.35)]">
          <path d="M4.5 0.5 8 4.5H1zM4.5 11.5 1 7.5h7z" />
        </svg>
      </span>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({ className, children, position = "item-aligned", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-hidden",
          "rounded-[5px] border border-[#9a9a9a] bg-white/[0.97] text-black shadow-[var(--snow-menu-shadow)]",
          "font-[family-name:var(--font-ui)]",
          position === "popper" && "min-w-(--radix-select-trigger-width) data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className
        )}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex h-4 items-center justify-center text-[10px]">▲</SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport
          className={cn("p-1", position === "popper" && "w-full min-w-(--radix-select-trigger-width)")}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-4 items-center justify-center text-[10px]">▼</SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-6 py-1 text-[11px] font-bold text-[var(--snow-ink-soft)]", className)}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex cursor-default items-center rounded-[3px] py-[3px] pr-4 pl-6 text-[13px] outline-none select-none",
        "data-[highlighted]:bg-[image:var(--snow-gel-flat)] data-[highlighted]:text-white",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-1.5 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m2 6.5 3 3 5-7" />
          </svg>
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("mx-1 my-1 h-px bg-black/20", className)}
      {...props}
    />
  )
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue }
