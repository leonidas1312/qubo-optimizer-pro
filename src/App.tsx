import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { AuthCallback } from "@/components/auth/AuthCallback";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Hardware from "./pages/Hardware";
import Datasets from "./pages/Datasets";
import Jobs from "./pages/Jobs";
import Billing from "./pages/Billing";
import Documentation from "./pages/Documentation";
import AIAssistant from "./pages/AIAssistant";

const queryClient = new QueryClient();

// Wrapper component for protected routes that need the dashboard layout
const ProtectedDashboardRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabase}>
          <BrowserRouter>
            <AuthProvider>
              <TooltipProvider>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<DashboardLayout><Index /></DashboardLayout>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  
                  {/* Protected routes with dashboard layout */}
                  <Route path="/hardware" element={
                    <ProtectedDashboardRoute>
                      <Hardware />
                    </ProtectedDashboardRoute>
                  } />
                  <Route path="/datasets" element={
                    <ProtectedDashboardRoute>
                      <Datasets />
                    </ProtectedDashboardRoute>
                  } />
                  <Route path="/jobs" element={
                    <ProtectedDashboardRoute>
                      <Jobs />
                    </ProtectedDashboardRoute>
                  } />
                  <Route path="/billing" element={
                    <ProtectedDashboardRoute>
                      <Billing />
                    </ProtectedDashboardRoute>
                  } />
                  <Route path="/docs" element={
                    <ProtectedDashboardRoute>
                      <Documentation />
                    </ProtectedDashboardRoute>
                  } />
                  <Route path="/ai-assistant" element={
                    <ProtectedDashboardRoute>
                      <AIAssistant />
                    </ProtectedDashboardRoute>
                  } />
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