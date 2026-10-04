import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap select-none",
    "rounded-[5px] border text-[13px] leading-none font-[family-name:var(--font-ui)]",
    "outline-none transition-[filter,box-shadow]",
    "focus-visible:shadow-[0_0_0_3px_var(--snow-focus)]",
    "active:brightness-90 disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // The default Aqua push button, filled with blue gel.
        default:
          "border-[var(--snow-sel-edge)] bg-[image:var(--snow-gel)] text-white [text-shadow:0_-1px_0_rgba(0,0,0,0.35)] shadow-[var(--snow-bevel)]",
        secondary:
          "border-[var(--snow-btn-edge)] bg-[image:var(--snow-btn)] text-black shadow-[var(--snow-bevel)]",
        destructive:
          "border-[var(--snow-red-edge)] bg-[image:var(--snow-red-gel)] text-white [text-shadow:0_-1px_0_rgba(0,0,0,0.35)] shadow-[var(--snow-bevel)]",
        ghost: "border-transparent hover:bg-black/[0.07]",
        link: "border-transparent text-[#0b5fc4] underline-offset-2 hover:underline",
      },
      size: {
        default: "h-7 px-3.5",
        sm: "h-6 px-2.5 text-xs",
        lg: "h-9 px-5 text-sm",
        icon: "size-7",
      },
    },
    defaultVariants: { variant: "secondary", size: "default" },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
