import type { Config } from "tailwindcss"
import animatePlugin from "tailwindcss-animate"

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
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        //Light mode colors
        "color-back": "rgba(229, 231, 235, 1)",
        "color-navbar": "rgba(20, 27, 38, 1)",
        "color-card": "rgba(30, 41, 57, 1)",
        "color-button": "rgba(98, 116, 142, 1)",
        "hover-color-button": "rgba(78, 93, 114, 1)",
        "hover-color-button2": "rgba(189, 189, 190, 1)",
        "active-color-button": "rgba(51, 61, 75, 1)",
        "active-color-button2": "rgba(99, 99, 99, 1)",
        "color-text": "rgba(12, 10, 9, 1)",
        "color-search-bar": "rgba(153, 161, 175, 1)",
        "color-star": "rgba(253, 199, 0, 1)",
        "color-confirmed": "rgba(94, 165, 0, 1)",
        "color-canceled": "rgba(193, 0, 7, 1)",
        //Dark mode colors
        "dark-color-back": "rgba(12, 17, 25, 1)",
        "dark-color-navbar": "rgba(20, 27, 38, 1)",
        "dark-color-card": "rgba(53, 71, 98, 1)",
        "dark-color-button": "rgba(137, 161, 196, 1)",
        "dark-hover-color-button": "rgba(101, 118, 143, 1)",
        "dark-active-color-button": "rgba(63, 74, 89, 1)",
        "dark-color-text-title": "rgba(255, 255, 255, 1)",
        "dark-color-text-subtitle": "rgba(175, 173, 173, 1)",
        "dark-color-search-bar": "rgba(181, 190, 206, 1)",

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
      },
    },
  },
  plugins: [animatePlugin],
}

export default config
