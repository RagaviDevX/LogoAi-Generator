import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        brand: {
          purple: "#7C3AED",
          "purple-light": "#A78BFA",
          blue: "#2563EB",
          "blue-light": "#60A5FA",
          pink: "#EC4899",
          glow: "rgba(124, 58, 237, 0.4)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-brand":
          "linear-gradient(135deg, #7C3AED 0%, #2563EB 50%, #EC4899 100%)",
        "gradient-subtle":
          "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.1) 100%)",
        "noise": "url('/noise.png')",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "typing": "typing 1.5s steps(30) infinite",
        "border-beam": "borderBeam 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124,58,237,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(124,58,237,0.6), 0 0 100px rgba(37,99,235,0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        typing: {
          "0%": { width: "0" },
          "50%": { width: "100%" },
          "100%": { width: "0" },
        },
        borderBeam: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,58,237,0.3)",
        "glow-lg": "0 0 80px rgba(124,58,237,0.4)",
        "glow-blue": "0 0 40px rgba(37,99,235,0.3)",
        glass: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        premium: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
