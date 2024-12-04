import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from '@supabase/auth-helpers-react';

const Login = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 gradient-text text-center">Welcome to QUBOt</h1>
          <div className="bg-card p-6 rounded-lg shadow-lg border">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#3b82f6',
                      brandAccent: '#2563eb',
                    },
                  },
                },
              }}
              providers={["github"]}
              redirectTo={`${window.location.origin}/auth/callback`}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Login;