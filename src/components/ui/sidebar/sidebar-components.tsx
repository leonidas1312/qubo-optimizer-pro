import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(({ side = "left", variant = "sidebar", className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative transition-all", className)} {...props}>
      {children}
    </div>
  )
})
Sidebar.displayName = "Sidebar"

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("sidebar-header", className)} {...props}>
        {props.children}
      </div>
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("sidebar-content", className)} {...props}>
        {props.children}
      </div>
    )
  }
)
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("sidebar-footer", className)} {...props}>
        {props.children}
      </div>
    )
  }
)
SidebarFooter.displayName = "SidebarFooter"

export const SidebarRail = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("sidebar-rail", className)} {...props}>
        {props.children}
      </div>
    )
  }
)
SidebarRail.displayName = "SidebarRail"

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("sidebar-group", className)} {...props}>
        {props.children}
      </div>
    )
  }
)
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("sidebar-group-label", className)} {...props}>
        {props.children}
      </div>
    )
  }
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => {
    return (
      <ul ref={ref} className={cn("sidebar-menu", className)} {...props}>
        {props.children}
      </ul>
    )
  }
)
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => {
    return (
      <li ref={ref} className={cn("sidebar-menu-item", className)} {...props}>
        {props.children}
      </li>
    )
  }
)
SidebarMenuItem.displayName = "SidebarMenuItem"

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<"div">
    size?: "default" | "sm" | "lg"
  }
>(({ asChild = false, isActive = false, className, size = "default", ...props }, ref) => {
  return (
    <Button ref={ref} className={cn("sidebar-menu-button", className)} {...props}>
      {props.children}
    </Button>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

export const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => {
    return (
      <ul ref={ref} className={cn("sidebar-menu-sub", className)} {...props}>
        {props.children}
      </ul>
    )
  }
)
SidebarMenuSub.displayName = "SidebarMenuSub"

export const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => {
    return (
      <li ref={ref} className={cn("sidebar-menu-sub-item", className)} {...props}>
        {props.children}
      </li>
    )
  }
)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

export const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  return (
    <a ref={ref} className={cn("sidebar-menu-sub-button", className)} {...props}>
      {props.children}
    </a>
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(
  ({ className, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn("relative flex min-h-screen flex-1 flex-col bg-background", className)}
        {...props}
      />
    )
  }
)
SidebarInset.displayName = "SidebarInset"