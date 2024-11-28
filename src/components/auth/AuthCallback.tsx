import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check hash fragment
        const hashFragment = window.location.hash;
        let accessToken, refreshToken;

        if (hashFragment) {
          // Parse hash fragment for tokens
          const params = new URLSearchParams(hashFragment.substring(1));
          accessToken = params.get('access_token');
          refreshToken = params.get('refresh_token');
        }

        // Check query parameters as fallback
        if (!accessToken || !refreshToken) {
          const searchParams = new URLSearchParams(window.location.search);
          accessToken = searchParams.get('access_token');
          refreshToken = searchParams.get('refresh_token');
        }

        if (!accessToken || !refreshToken) {
          throw new Error('Missing tokens in URL');
        }

        // Set the session using the tokens
        const { data: { session }, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });

        if (error) throw error;

        // Get the stored path and remove it from localStorage
        const preAuthPath = localStorage.getItem('preAuthPath') || '/';
        localStorage.removeItem('preAuthPath');

        navigate(preAuthPath);
        toast.success('Successfully logged in!');
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Authentication failed');
        navigate('/');
      }
};


    handleCallback();
  }, [navigate]);

  return null;
};