/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        copa: {
          green: '#009C3B',
          yellow: '#FFDF00',
          blue: '#002776',
          gold: '#C8A951',
          dark: '#0A0A0A',
          card: '#141414',
          border: '#2A2A2A',
          text: '#FFFFFF',
          muted: '#A0A0A0',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

