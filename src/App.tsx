import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { AuthCallback } from "@/components/auth/AuthCallback";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Solvers from "./pages/Solvers";
import Hardware from "./pages/Hardware";
import Playground from "./pages/Playground";
import QUBOts from "./pages/QUBOts";
import Datasets from "./pages/Datasets";
import Jobs from "./pages/Jobs";
import Billing from "./pages/Billing";
import Documentation from "./pages/Documentation";
import AIAssistant from "./pages/AIAssistant";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabase}>
          <BrowserRouter>
            <AuthProvider>
              <TooltipProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/playground" element={
                    <ProtectedRoute>
                      <Playground />
                    </ProtectedRoute>
                  } />
                  <Route path="/solvers" element={<Solvers />} />
                  <Route path="/hardware" element={<Hardware />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/qubots" element={
                    <ProtectedRoute>
                      <QUBOts />
                    </ProtectedRoute>
                  } />
                  <Route path="/datasets" element={<Datasets />} />
                  <Route path="/jobs" element={
                    <ProtectedRoute>
                      <Jobs />
                    </ProtectedRoute>
                  } />
                  <Route path="/billing" element={
                    <ProtectedRoute>
                      <Billing />
                    </ProtectedRoute>
                  } />
                  <Route path="/docs" element={<Documentation />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                </Routes>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </AuthProvider>
          </BrowserRouter>
        </SessionContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;