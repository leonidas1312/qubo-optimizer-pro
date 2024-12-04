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
import UploadSolver from "./pages/UploadSolver";

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
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  
                  {/* Protected routes with dashboard layout */}
                  <Route path="/" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Index />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/upload-solver" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <UploadSolver />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/hardware" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Hardware />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/datasets" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Datasets />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/jobs" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Jobs />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/billing" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Billing />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/docs" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Documentation />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/ai-assistant" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <AIAssistant />
                      </DashboardLayout>
                    </ProtectedRoute>
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
