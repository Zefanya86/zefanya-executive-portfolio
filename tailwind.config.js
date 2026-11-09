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
        // Master Prompt Luxury Palette
        obsidian: {
          DEFAULT: "#0B0B0C", // Obsidian Black primary
          deep: "#070708",
          card: "#121215",
          surface: "#18181B", // Charcoal secondary
          border: "#242429",
          hover: "#1F1F24",
        },
        charcoal: {
          DEFAULT: "#18181B",
          light: "#27272A",
          dark: "#0F0F11",
          border: "#2E2E33",
        },
        gold: {
          DEFAULT: "#C5A477", // Champagne Gold primary accent
          light: "#D8BE9B",
          dark: "#A38253",
          soft: "#E8D8C3",
          muted: "rgba(197, 164, 119, 0.18)",
          glow: "rgba(197, 164, 119, 0.35)",
        },
        ivory: {
          DEFAULT: "#F4F0E8", // Warm Ivory background
          surface: "#FAF8F5",
          darker: "#E8E2D5",
          border: "#DED6C7",
        },
        softGray: {
          DEFAULT: "#A5A5A5", // Soft Gray muted text
          light: "#CCCCCC",
          dark: "#7A7A7A",
        },
        // Semantic aliases
        ink: {
          DEFAULT: "#0B0B0C",
          deep: "#070708",
          card: "#121215",
          surface: "#18181B",
          lighter: "#222227",
        },
        hairline: {
          DEFAULT: "#27272C",
          dark: "#1E1E22",
          light: "#E5DEC9",
          gold: "rgba(197, 164, 119, 0.28)",
        },
        // Retain cobalt/lime as secondary tokens for legacy components
        cobalt: {
          DEFAULT: "#C5A477", // map primary accent to Champagne Gold
          hover: "#D8BE9B",
          light: "#E8D8C3",
          glow: "rgba(197, 164, 119, 0.3)",
        },
        limeAccent: {
          DEFAULT: "#C5A477",
          hover: "#D8BE9B",
          soft: "rgba(197, 164, 119, 0.15)",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-cormorant)",
          "Georgia",
          "Cambria",
          "'Times New Roman'",
          "serif",
        ],
        sans: [
          "var(--font-manrope)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-cormorant)",
          "var(--font-manrope)",
          "Georgia",
          "serif",
        ],
        chinese: [
          "var(--font-chinese)",
          "'Noto Sans SC'",
          "'PingFang SC'",
          "'Microsoft YaHei'",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        "gold-subtle": "0 2px 14px -2px rgba(197, 164, 119, 0.18)",
        "gold-glow": "0 0 30px -5px rgba(197, 164, 119, 0.32)",
        "luxury-card": "0 10px 40px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(197, 164, 119, 0.15)",
        "luxury-elevated": "0 20px 50px -15px rgba(0, 0, 0, 0.85), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        "editorial": "0 4px 20px -2px rgba(11, 11, 12, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "marquee": "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
