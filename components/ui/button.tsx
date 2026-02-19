import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-solid focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shrink-0 select-none group/button",
  {
    variants: {
      variant: {
        default:
          "bg-primary-solid text-primary-on-primary hover:bg-primary-solid-hover shadow-sm active:scale-[0.98]",
        outline:
          "border border-canvas-border bg-canvas-base text-canvas-text hover:bg-canvas-bg-hover hover:text-canvas-text-contrast",
        secondary:
          "bg-secondary-solid text-secondary-on-secondary hover:bg-secondary-solid-hover",
        ghost:
          "hover:bg-canvas-bg-hover hover:text-canvas-text-contrast aria-expanded:bg-canvas-bg-active",
        destructive:
          "bg-alert-solid text-alert-on-alert hover:bg-alert-solid-hover shadow-sm active:scale-[0.98]",
        link: "text-primary-text underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 rounded-md px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 rounded-md px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 gap-2 rounded-lg px-6 text-base",
        icon: "h-9 w-9",
        "icon-xs": "h-7 w-7 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
