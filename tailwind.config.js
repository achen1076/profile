/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "ui-sans-serif", "system-ui"],
      rockford: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        // JSON Tool namespaced colors (jt- prefix)
        "jt-bg": "#0f1117",
        "jt-surface-1": "#161822",
        "jt-surface-2": "#1c1f2e",
        "jt-surface-3": "#252839",
        "jt-text-primary": "#e4e6f0",
        "jt-text-secondary": "#9ba1b8",
        "jt-text-muted": "#5a6080",
        "jt-accent": "#6366f1",
        "jt-accent-hover": "#818cf8",
        "jt-accent-subtle": "rgba(99, 102, 241, 0.12)",
        "jt-border": "#262a3d",
        "jt-border-light": "#2f3450",
        "jt-json-string": "#86efac",
        "jt-json-number": "#fbbf24",
        "jt-json-boolean": "#c084fc",
        "jt-json-null": "#f87171",
        "jt-json-key": "#93c5fd",
        "jt-guide-line": "#262a3d",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        fadeUp: "fadeUp 0.6s ease-out forwards",
        fadeRight: "fadeRight 0.6s ease-out forwards",
        fadeLeft: "fadeLeft 0.6s ease-out forwards",
        scaleIn: "scaleIn 0.6s ease-out forwards",
        textFadeOut: "textFadeOut 0.3s ease-out forwards",
        textFadeIn: "textFadeIn 0.3s ease-out forwards",
        // JSON Tool animations
        "jt-live-pulse": "livePulse 2s ease-in-out infinite",
        "jt-toast-in": "toastIn 0.25s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeRight: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeLeft: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        textFadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
        textFadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        livePulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        toastIn: {
          from: { opacity: "0", transform: "translateX(-50%) translateY(8px)" },
          to: { opacity: "1", transform: "translateX(-50%) translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
