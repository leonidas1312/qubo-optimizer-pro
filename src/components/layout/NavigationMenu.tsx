"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [open, setOpen] = React.useState(false);

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
    }
  };

  const handleContact = () => {
    toast.info("Contact feature coming soon!");
  };

  const handleSignUp = () => {
    toast.info("Sign up feature coming soon!");
  };

  const handleGitHubLogin = () => {
    login();
    setOpen(false);
  };

  const handleEmailLogin = () => {
    toast.info("Email login coming soon! Please connect Supabase first.");
    setOpen(false);
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-sm hover:bg-accent"
            >
              {isAuthenticated ? 'Log Out' : 'Log In'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-semibold mb-8">Log in to QUBOt</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-6"
                onClick={handleGitHubLogin}
              >
                <Code2 className="h-5 w-5" />
                Continue with GitHub
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full py-6"
                onClick={handleEmailLogin}
              >
                Continue with Email →
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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