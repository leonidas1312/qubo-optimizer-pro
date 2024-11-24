"use client";

import * as React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
// Remove unused imports
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function CustomNavigationMenu() {
  return (
    <div className="flex justify-center"> {/* Center the menu */}
      <NavigationMenu>
        <NavigationMenuList>
          {/* Playground Tab */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/playground" className={navigationMenuTriggerStyle()}>
                Playground
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Documentation Tab */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Documentation
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                <ListItem to="/docs/introduction" title="Introduction">
                  Overview of the platform and its features.
                </ListItem>
                <ListItem to="/docs/getting-started" title="Getting Started">
                  How to get started with the platform.
                </ListItem>
                <ListItem to="/docs/api" title="API Reference">
                  Detailed API documentation.
                </ListItem>
                {/* Add more documentation links as needed */}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Workspace Tab */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/workspace" className={navigationMenuTriggerStyle()}>
                Workspace
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; to: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
