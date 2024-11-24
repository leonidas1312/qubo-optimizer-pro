"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

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
  const { isAuthenticated, user, login, logout } = useAuth();

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  return (
    <div className="flex justify-between w-full items-center px-4"> 
      {/* Brand Logo - Left Side */}
      <Link to="/" className="flex items-center space-x-2 mr-8">
        <Code2 className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">QUBOt</span>
      </Link>

      {/* Navigation Menu - Center */}
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
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Workspace Tab */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/uploadalgos" className={navigationMenuTriggerStyle()}>
                Workspace
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Auth Button - Right Side */}
      <button
        onClick={handleAuth}
        className="opacity-0 hover:opacity-100 transition-opacity duration-200 text-sm text-muted-foreground hover:text-foreground"
      >
        {isAuthenticated ? 'Logout' : 'Login with Github'}
      </button>
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