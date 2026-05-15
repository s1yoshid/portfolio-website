/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // ─── DESIGN TOKENS ───────────────────────────────────────────────
      // Edit these to change the entire site's look & feel
      colors: {
        bg: {
          DEFAULT: '#0d0d0d',   // main background
          card: '#141414',       // card / surface
          hover: '#1a1a1a',      // hover state
        },
        accent: {
          DEFAULT: '#e8a04a',   // primary accent (amber/gold)
          dim: '#a06828',        // muted accent
          glow: '#e8a04a33',     // accent glow (for shadows)
        },
        ink: {
          DEFAULT: '#f0ece4',   // primary text
          muted: '#8a8378',      // secondary text
          faint: '#3a3530',      // borders / dividers
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'Consolas', 'monospace'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.4s ease forwards',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulseDot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%':      { opacity: 0.4, transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
};
