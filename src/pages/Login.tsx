import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from '@supabase/auth-helpers-react';
import { motion } from "framer-motion";

const Login = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/playground');
    }
  }, [session, navigate]);

  // Animation variants for the floating elements
  const floatingAnimation = {
    animate: {
      y: ["0px", "-20px", "0px"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={floatingAnimation.animate}
        />
        <motion.div 
          className="absolute -bottom-32 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            ...floatingAnimation.animate,
            transition: { ...floatingAnimation.animate.transition, delay: 1 }
          }}
        />
      </div>

      {/* Main content */}
      <div className="w-full max-w-4xl px-4 flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Left side - Mission Statement */}
        <div className="w-full md:w-1/2 text-left space-y-6 p-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-100">
            CEPTUM
          </h1>
          <p className="text-xl text-purple-200/80 leading-relaxed">
            Providing scalable, efficient, and accessible optimization solutions for businesses
            and researchers via a cloud-based platform.
          </p>
          <div className="hidden md:block">
            <motion.div 
              className="w-20 h-20 bg-purple-500/20 rounded-full absolute -bottom-10 -left-10 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                transition: { duration: 3, repeat: Infinity }
              }}
            />
          </div>
        </div>

        {/* Right side - Auth UI */}
        <div className="w-full md:w-1/2">
          <div className="bg-card/50 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-white/10">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#9b87f5',
                      brandAccent: '#7E69AB',
                    },
                  },
                },
                style: {
                  button: {
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    padding: '10px 15px',
                  },
                  input: {
                    borderRadius: '8px',
                    fontSize: '16px',
                    padding: '10px 15px',
                  },
                },
              }}
              providers={["github"]}
              redirectTo={`${window.location.origin}/auth/callback`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;