import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get GitHub session data from our backend
        const response = await fetch('http://localhost:8000/api/auth/status', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.authenticated && data.user) {
          // Sign in with GitHub OAuth
          const { error: signInError } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
              queryParams: {
                access_token: data.user.access_token
              }
            }
          });

          if (signInError) {
            throw signInError;
          }

          // Wait briefly for the profile to be created by the trigger
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          toast.success('Successfully signed in!');
          navigate('/');
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error: any) {
        console.error('Auth callback error:', error);
        toast.error('Authentication failed');
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return null;
};