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
          // Check if user exists in Supabase
          const { data: existingUser } = await supabase
            .from('profiles')
            .select('*')
            .eq('github_username', data.user.login)
            .single();

          if (!existingUser) {
            // Sign up new user in Supabase
            const { error: signUpError } = await supabase.auth.signUp({
              email: data.user.email,
              password: crypto.randomUUID(),
              options: {
                data: {
                  avatar_url: data.user.avatar_url,
                  github_username: data.user.login,
                }
              }
            });

            if (signUpError) {
              throw signUpError;
            }
          } else {
            // Sign in existing user
            const { error: signInError } = await supabase.auth.signInWithPassword({
              email: data.user.email,
              password: existingUser.id // Using the user's ID as password for simplicity
            });

            if (signInError) {
              throw signInError;
            }
          }

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