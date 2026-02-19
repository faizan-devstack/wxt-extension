import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-success-text" />
        ),
        info: (
          <InfoIcon className="size-4 text-info-text" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4 text-warning-text" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-alert-text" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin text-primary-text" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--canvas-bg)",
          "--normal-text": "var(--canvas-text)",
          "--normal-border": "var(--border-canvas-border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
