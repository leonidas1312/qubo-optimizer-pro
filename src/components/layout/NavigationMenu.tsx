"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Code2, Trophy, Book, Beaker, FileText, Puzzle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
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
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">QUBOt</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex items-center gap-2">
                  <Puzzle className="h-4 w-4" />
                  Optimization Lab
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[400px]">
                  <ListItem to="/playground" title="Interactive Workspace">
                    <div className="flex items-center gap-2">
                      <Beaker className="h-4 w-4" />
                      <span>Experiment with QUBO problems and solutions</span>
                    </div>
                  </ListItem>
                  <ListItem to="/uploadalgos" title="Create a QUBOt solver">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Build and test your own QUBO solver</span>
                    </div>
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Community
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[400px]">
                  <ListItem to="/leaderboard" title="Leaderboard">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      <span>View top performing solvers and users</span>
                    </div>
                  </ListItem>
                  <ListItem to="/qubots" title="QUBOts created">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Browse community-created solvers</span>
                    </div>
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Documentation
                </div>
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
};