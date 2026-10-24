/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bb: {
          dark: '#050811',
          card: '#0d1527',
          cardHover: '#131f38',
          border: '#1a2b4c',
          borderGlow: '#294b80',
          blue: '#1d68ff',
          neon: '#00d2ff',
          cyan: '#06b6d4',
          gold: '#e6b84a',
          goldDark: '#b8860b',
          purple: '#8b5cf6',
          textMuted: '#94a3b8',
          textDim: '#64748b'
        }
      },
      boxShadow: {
        'neon-blue': '0 0 20px -3px rgba(29, 104, 255, 0.45), 0 0 8px -2px rgba(0, 210, 255, 0.3)',
        'neon-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.5)',
        'neon-gold': '0 0 20px -3px rgba(230, 184, 74, 0.4)',
        'card-glow': '0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
        'grid-pattern': "radial-gradient(circle, rgba(56, 189, 248, 0.08) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
