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
          // Sign up new user in Supabase
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: data.user.email,
            password: String(data.user.id), // Convert GitHub ID to string
            options: {
              data: {
                avatar_url: data.user.avatar_url,
                github_username: data.user.login,
                email: data.user.email,
              }
            }
          });

          if (signUpError && signUpError.message !== 'User already registered') {
            throw signUpError;
          }

          // Sign in user
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: data.user.email,
            password: String(data.user.id) // Convert GitHub ID to string
          });

          if (signInError) {
            throw signInError;
          }

          // Wait for the profile to be created by the trigger
          await new Promise(resolve => setTimeout(resolve, 1000));

          navigate('/uploadalgos');
          toast.success('Successfully logged in!');
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