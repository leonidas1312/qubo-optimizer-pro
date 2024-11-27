import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  login: () => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  session: null,
  login: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions
    const checkSessions = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        // Check GitHub session if no Supabase session
        try {
          const response = await fetch('http://localhost:8000/api/auth/status', {
            credentials: 'include'
          });
          const data = await response.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setUser(data.user);
          }
        } catch (error) {
          console.error('Error checking GitHub session:', error);
        }
      }
    };

    checkSessions();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = () => {
    window.location.href = 'http://localhost:8000/api/auth/github';
  };

  const logout = async () => {
    try {
      // Logout from both GitHub session and Supabase
      await fetch('http://localhost:8000/api/auth/logout', {
        credentials: 'include'
      });
      await supabase.auth.signOut();
      
      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      
      navigate('/');
      toast.success('Successfully logged out!');
    } catch (error) {
      toast.error('Error logging out');
      console.error('Error:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        session,
        login, 
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);