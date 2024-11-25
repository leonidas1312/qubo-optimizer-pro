import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          toast.success('Successfully signed in!');
          navigate('/');
        } else {
          // If no session, initiate GitHub OAuth
          const { error: signInError } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
              redirectTo: 'https://zddqnxesbhbvmdcyqpuw.supabase.co/auth/v1/callback'
            }
          });

          if (signInError) {
            throw signInError;
          }
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