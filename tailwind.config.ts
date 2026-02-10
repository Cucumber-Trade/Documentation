import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#04070B',
          secondary: '#18181b',
        },
        foreground: {
          DEFAULT: '#FFFFFF',
          muted: '#6B7173',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          accent: 'rgba(85, 228, 97, 0.2)',
        },
        accent: {
          primary: '#55E461',
          secondary: '#53B2ED',
        },
        cucumber: {
          green: '#55E461',
          blue: '#53B2ED',
          gray: '#6B7173',
          black: '#04070B',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Rubik', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#FFFFFF',
            a: {
              color: '#55E461',
              '&:hover': {
                color: '#53B2ED',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            h1: {
              color: '#FFFFFF',
            },
            h2: {
              color: '#FFFFFF',
            },
            h3: {
              color: '#FFFFFF',
            },
            h4: {
              color: '#FFFFFF',
            },
            strong: {
              color: '#FFFFFF',
            },
            blockquote: {
              color: '#6B7173',
              borderLeftColor: '#55E461',
            },
            pre: {
              backgroundColor: '#18181b',
              color: '#FFFFFF',
            },
            code: {
              color: '#FFFFFF',
              backgroundColor: '#27272a',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
