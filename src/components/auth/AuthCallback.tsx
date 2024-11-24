import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/status', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.authenticated && data.user) {
          // Sign in to Supabase with custom token
          const { data: { user }, error } = await supabase.auth.signUp({
            email: data.user.email,
            password: crypto.randomUUID(), // Generate a random password
            options: {
              data: {
                avatar_url: data.user.avatar_url,
                github_username: data.user.login,
              }
            }
          });

          if (error && error.message !== 'User already registered') {
            throw error;
          }

          navigate('/uploadalgos');
        } else {
          throw new Error('Authentication failed');
        }
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