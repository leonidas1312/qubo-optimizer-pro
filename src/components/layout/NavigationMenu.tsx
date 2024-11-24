"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

  const handleContact = () => {
    toast.info("Contact feature coming soon!");
  };

  const handleSignUp = () => {
    toast.info("Sign up feature coming soon!");
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

      {/* Auth Buttons - Right Side */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={handleAuth}
          className="text-sm hover:bg-accent"
        >
          {isAuthenticated ? 'Log Out' : 'Log In'}
        </Button>
        <Button
          variant="ghost"
          onClick={handleContact}
          className="text-sm hover:bg-accent"
        >
          Contact
        </Button>
        <Button
          variant="outline"
          onClick={handleSignUp}
          className="text-sm bg-white text-black hover:bg-accent"
        >
          Sign Up
        </Button>
      </div>
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