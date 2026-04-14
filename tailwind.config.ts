import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // ✅ COLORS FIXED (must be inside colors)
      colors: {
        lama: {
          DEFAULT: "#F35C7A",
          light: "#FDE8ED",
          dark: "#D94A68",
          muted: "#FBCFE8",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#FAF9F7",
          muted: "#F3F2F0",
        },
        ink: {
          DEFAULT: "#1A1A2E",
          muted: "#6B7280",
          faint: "#9CA3AF",
        },
        accent: {
          gold: "#F59E0B",
          green: "#16A34A",
          blue: "#3B82F6",
        },
      },

      // ✅ FIXED boxShadow
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.07)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12)",
        nav: "0 2px 12px rgba(0,0,0,0.08)",
        modal: "0 12px 40px rgba(0,0,0,0.18)",
      },

      keyframes: {
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up-fade": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      // ✅ FIXED animation
      animation: {
        "slide-down": "slide-down 0.25s ease forwards",
        "fade-in": "fade-in 0.3s ease forwards",
        "slide-up-fade": "slide-up-fade 0.35s ease forwards",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;