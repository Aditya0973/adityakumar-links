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
        cream: {
          50: '#FFFEFA',
          100: '#FFFCF3',
          200: '#F7F3E7',
          300: '#EDE7D3',
        },
        brand: {
          orange: '#FD601A',
          'orange-hover': '#E24E0C',
          'orange-light': '#FFEFE7',
          dark: '#1E1E1E',
          black: '#121212',
          blue: '#2B66FF',
          'blue-light': '#EEF4FF',
          purple: '#8B5CF6',
          'purple-light': '#F5F3FF',
          green: '#10B981',
          'green-light': '#ECFDF5',
          yellow: '#F59E0B',
          'yellow-light': '#FFFBEB',
          pink: '#EC4899',
          'pink-light': '#FDF2F8',
        }
      },
      fontFamily: {
        heading: ['"Neue Kabel"', 'Kabel', '"Space Grotesk"', 'Syne', 'sans-serif'],
        kabel: ['"Neue Kabel"', 'Kabel', '"Space Grotesk"', 'sans-serif'],
        syne: ['"Space Grotesk"', 'Syne', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #1E1E1E',
        'brutal': '4px 4px 0px #1E1E1E',
        'brutal-lg': '6px 6px 0px #1E1E1E',
        'brutal-xl': '8px 8px 0px #1E1E1E',
        'brutal-orange': '4px 4px 0px #FD601A',
        'brutal-orange-lg': '6px 6px 0px #FD601A',
        'brutal-blue': '4px 4px 0px #2B66FF',
        'brutal-purple': '4px 4px 0px #8B5CF6',
        'brutal-green': '4px 4px 0px #10B981',
        'brutal-white': '4px 4px 0px #FFFFFF',
        'inner-brutal': 'inset 2px 2px 0px rgba(0,0,0,0.1)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        'bounce-subtle': 'bounce-subtle 2.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 2s infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'wiggle': 'wiggle 0.8s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      }
    },
  },
  plugins: [],
}
