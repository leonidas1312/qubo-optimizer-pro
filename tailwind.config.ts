import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0FA0CE",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#403E43",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#ea384c",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F6F6F7",
          foreground: "#403E43",
        },
        accent: {
          DEFAULT: "#1EAEDB",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#403E43",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-slow": "fade-in-slow 1s ease-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;