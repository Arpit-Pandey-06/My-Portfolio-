import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg) / <alpha-value>)',
        'bg-2': 'hsl(var(--bg-2) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        'surface-2': 'hsl(var(--surface-2) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        'border-soft': 'hsl(var(--border-soft) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)',
        'text-dim': 'hsl(var(--text-dim) / <alpha-value>)',
        'text-faint': 'hsl(var(--text-faint) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        amber: 'hsl(var(--amber) / <alpha-value>)',
        blue: 'hsl(var(--blue) / <alpha-value>)'
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)']
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.6)', opacity: '1' },
          '100%': { transform: 'scale(1.9)', opacity: '0' }
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      },
      animation: {
        pulseRing: 'pulseRing 2s infinite',
        blink: 'blink 1s step-start infinite'
      }
    }
  },
  plugins: []
};

export default config;
