"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Code2, UserRound, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from '@supabase/supabase-js';

interface ExtendedUser extends User {
  avatar_url?: string;
  github_username?: string;
}

export function CustomNavigationMenu() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const extendedUser = user as ExtendedUser;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await logout();
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
            <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
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

      {/* Auth Button and Avatar - Right Side */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={handleAuth}
          className="text-sm bg-black text-white border-white hover:bg-white hover:text-black transition-colors"
        >
          {isAuthenticated ? 'Log Out' : 'Log In'}
        </Button>

        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src={extendedUser?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${extendedUser?.email}`} />
                <AvatarFallback>
                  <UserRound className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{extendedUser?.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {extendedUser?.github_username || 'User'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAuth}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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