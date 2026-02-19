import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-10 w-full rounded-lg border bg-canvas-base px-3 py-1.5",
        "text-sm text-canvas-text placeholder:text-canvas-text/50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Border & states
        "border-canvas-border/50 transition-colors",
        // Focus
        "focus-visible:border-primary-border-hover/50 focus-visible:outline-none",
        // Invalid / error state
        "aria-invalid:border-alert-border aria-invalid:text-alert-text",
        "aria-invalid:focus-visible:border-alert-border-hover",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-canvas-bg-subtle",
        // Remove outlines (safety)
        "outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }