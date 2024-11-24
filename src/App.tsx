import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { AuthCallback } from "@/components/auth/AuthCallback";
import Index from "./pages/Index";
import Solvers from "./pages/Solvers";
import Hardware from "./pages/Hardware";
import Playground from "./pages/Playground";
import QUBOts from "./pages/QUBOts";
import Datasets from "./pages/Datasets";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/solvers" element={<Solvers />} />
                <Route path="/hardware" element={<Hardware />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/leaderboard" element={<div>Leaderboard Coming Soon</div>} />
                <Route path="/qubots" element={<QUBOts />} />
                <Route path="/datasets" element={<Datasets />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;