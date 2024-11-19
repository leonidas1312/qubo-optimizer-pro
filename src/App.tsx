import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Solvers from "./pages/Solvers";
import Playground from "./pages/Playground";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/solvers" element={<Solvers />} />
              </Routes>
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;