"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Book, Database, Cpu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UserMenu } from "./navigation/UserMenu";
import { ListItem } from "./navigation/ListItem";

export function CustomNavigationMenu() {
  const { isAuthenticated, login } = useAuth();

  const handleAuth = async () => {
    if (!isAuthenticated) {
      login();
    }
  };

  return (
    <div className="w-full bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">CEPTUM</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Resources
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[400px]">
                  <ListItem to="/hardware" title="Hardware">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      <span>Available computing resources</span>
                    </div>
                  </ListItem>
                  <ListItem to="/datasets" title="Datasets">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span>Browse public datasets</span>
                    </div>
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Help
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                  <ListItem to="/docs/introduction" title="Documentation">
                    Overview of the platform and its features
                  </ListItem>
                  <ListItem to="/ai-assistant" title="AI Assistant">
                    Get help with using the platform
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {!isAuthenticated && (
            <Button
              variant="outline"
              onClick={handleAuth}
              className="text-sm bg-black text-white border-white hover:bg-white hover:text-black transition-colors"
            >
              Log In
            </Button>
          )}
          {isAuthenticated && <UserMenu />}
        </div>
      </div>
    </div>
  );
}