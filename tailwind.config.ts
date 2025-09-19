import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'noise': "url('data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E')",
        'grid': "linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)",
        'radial-glow': 'radial-gradient(circle at center, rgba(0,255,65,0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '20px 20px',
        'noise': '256px 256px',
      },
      colors: {
        terminal: {
          green: "#00ff41",
          "green-bright": "#00ff7f",
          "green-dim": "#00cc33",
          cyan: "#00ffff",
          "cyan-bright": "#40ffff",
          blue: "#0080ff",
          purple: "#8000ff",
          amber: "#ffbf00",
          bg: "#0a0a0a",
          "bg-lighter": "#0f0f0f",
          gray: "#1a1a1a",
          "gray-light": "#2a2a2a",
          "gray-dark": "#151515",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.7' }],
        '2xl': ['1.5rem', { lineHeight: '1.6' }],
        '3xl': ['1.875rem', { lineHeight: '1.5' }],
        '4xl': ['2.25rem', { lineHeight: '1.4' }],
        '5xl': ['3rem', { lineHeight: '1.3' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 255, 65, 0.3)',
        'glow': '0 0 20px rgba(0, 255, 65, 0.4)',
        'glow-lg': '0 0 30px rgba(0, 255, 65, 0.5)',
        'glow-xl': '0 0 40px rgba(0, 255, 65, 0.6)',
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.4)',
        'glow-blue': '0 0 20px rgba(0, 128, 255, 0.4)',
        'terminal': '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 255, 65, 0.2)',
      },
      animation: {
        "cursor-blink": "cursor-blink 1.2s infinite",
        "cursor-terminal": "cursor-terminal 1s infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "scanlines": "scanlines 0.1s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        "cursor-blink": {
          "0%, 45%": { opacity: "1" },
          "46%, 100%": { opacity: "0" },
        },
        "cursor-terminal": {
          "0%, 49%": { opacity: "1", transform: "scale(1)" },
          "50%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)",
            transform: "scale(1)"
          },
          "50%": {
            boxShadow: "0 0 30px rgba(0, 255, 65, 0.6), 0 0 60px rgba(0, 255, 65, 0.2)",
            transform: "scale(1.02)"
          },
        },
        "scanlines": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;