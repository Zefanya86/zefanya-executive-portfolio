/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#090A0D",
          deep: "#060709",
          soft: "#0E1116",
        },
        graphite: {
          DEFAULT: "#11141A",
          surface: "#191D24",
          border: "#232833",
          light: "#2C3340",
        },
        crimson: {
          DEFAULT: "#D72E43",
          glow: "rgba(215, 46, 67, 0.35)",
          dark: "#9E1C2D",
          light: "#FF455D",
        },
        platinum: {
          DEFAULT: "#D8DDE5",
          bright: "#ECEFF4",
          muted: "#A6ADB8",
          dark: "#687385",
        },
        warmWhite: "#F4F3EF",
      },
      fontFamily: {
        sans: [
          "var(--font-manrope)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        editorial: [
          "var(--font-editorial)",
          "'Cinzel'",
          "Georgia",
          "serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-spotlight": "radial-gradient(circle at 50% 30%, rgba(215, 46, 67, 0.12), transparent 70%)",
        "mesh-subtle": "radial-gradient(at 100% 0%, rgba(215, 46, 67, 0.08) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(216, 221, 229, 0.04) 0px, transparent 50%)",
      },
      boxShadow: {
        "cinematic": "0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px -5px rgba(215, 46, 67, 0.15)",
        "card-executive": "0 10px 30px -5px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(216, 221, 229, 0.08)",
        "glow-crimson": "0 0 25px rgba(215, 46, 67, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
