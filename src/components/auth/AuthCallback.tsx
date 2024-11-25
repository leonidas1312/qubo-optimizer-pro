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
          // Generate a secure random password for the user
          const password = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);

          // Sign up new user in Supabase
          const { error: signUpError } = await supabase.auth.signUp({
            email: data.user.email,
            password: password,
            options: {
              data: {
                avatar_url: data.user.avatar_url,
                github_username: data.user.login,
                email: data.user.email,
              }
            }
          });

          // If user already exists, that's fine - proceed to sign in
          if (signUpError && signUpError.message !== 'User already registered') {
            throw signUpError;
          }

          // Sign in user with email/password
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: data.user.email,
            password: password
          });

          if (signInError) {
            // If sign in fails, try to sign in with OAuth
            const { error: oAuthError } = await supabase.auth.signInWithOAuth({
              provider: 'github',
              options: {
                redirectTo: window.location.origin
              }
            });

            if (oAuthError) {
              throw oAuthError;
            }
          }

          // Wait for the profile to be created by the trigger
          await new Promise(resolve => setTimeout(resolve, 1000));

          navigate('/qubots');
          toast.success('Successfully logged in!');
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