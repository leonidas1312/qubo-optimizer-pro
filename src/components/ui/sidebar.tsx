"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Add mobile hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(defaultOpen)
  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (setOpenProp) setOpenProp(open)
  }

  const isMobile = useIsMobile()

  React.useEffect(() => {
    const sidebarState = localStorage.getItem(SIDEBAR_COOKIE_NAME)
    if (sidebarState) {
      handleOpenChange(sidebarState === "true")
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem(SIDEBAR_COOKIE_NAME, String(open))
  }, [open])

  return (
    <SidebarContext.Provider value={{ state: open ? "expanded" : "collapsed", open, setOpen: handleOpenChange, openMobile: false, setOpenMobile: () => {}, isMobile, toggleSidebar: () => handleOpenChange(!open) }}>
      <div ref={ref} className={cn("flex", className)} style={{ width: isMobile ? SIDEBAR_WIDTH_MOBILE : SIDEBAR_WIDTH }} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
})

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative transition-all", className)} {...props}>
      {children}
    </div>
  )
})

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  return (
    <Button ref={ref} className={cn("sidebar-trigger", className)} onClick={onClick} {...props}>
      {props.children}
    </Button>
  )
})

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("sidebar-content", className)} {...props}>
      {props.children}
    </div>
  )
})

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("sidebar-header", className)} {...props}>
      {props.children}
    </div>
  )
})

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  return (
    <ul ref={ref} className={cn("sidebar-menu", className)} {...props}>
      {props.children}
    </ul>
  )
})

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => {
  return (
    <li ref={ref} className={cn("sidebar-menu-item", className)} {...props}>
      {props.children}
    </li>
  )
})

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof SidebarMenuButton>
>(({ asChild = false, isActive = false, className, ...props }, ref) => {
  return (
    <Button ref={ref} className={cn("sidebar-menu-button", className)} {...props}>
      {props.children}
    </Button>
  )
})

export const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  return (
    <ul ref={ref} className={cn("sidebar-menu-sub", className)} {...props}>
      {props.children}
    </ul>
  )
})

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

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("sidebar-inset", className)} {...props}>
      {props.children}
    </div>
  )
})

// Export all other sidebar components
export {
  SidebarProvider,
  SidebarInset,
  SidebarRail,
  SidebarInput,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSubItem,
  SidebarSeparator,
}
