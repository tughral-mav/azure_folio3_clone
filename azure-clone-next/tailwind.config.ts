import type { Config } from 'tailwindcss';

/**
 * Design tokens extracted from clone-kit/tokens.json — the REAL values
 * computed across all 243 live pages of azure.folio3.com.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // primary brand blues
        brand: {
          DEFAULT: '#1742E7', // rgb(23,66,231) — primary CTA / links
          bright: '#2F69F2',  // rgb(47,105,242) — hover / accents
          royal: '#143CD5',   // rgb(20,60,213)
          navy: '#00217F',    // rgb(0,33,127) — dark section bg
          ink: '#050D20',     // rgb(5,13,32) — darkest sections
          sky: '#0170B9',     // rgb(1,112,185) — secondary accent
        },
        // text
        ink: '#121127',       // rgb(18,17,39) — headings
        body: '#4B4F58',      // rgb(75,79,88) — paragraph text
        muted: '#6A6C70',     // rgb(106,108,112) — darkened for WCAG AA contrast (≥4.5:1 on white/tint)
        // surfaces / tints
        surface: {
          DEFAULT: '#FFFFFF',
          tint: '#F5F8FE',    // rgb(245,248,254)
          blue: '#EEF3FF',    // rgb(238,243,255)
          chip: '#E3E8FC',    // rgb(227,232,252)
          line: '#DAE3F8',    // rgb(218,227,248)
          gray: '#F9F9F9',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        display: ['Gilroy-SemiBold', 'var(--font-poppins)', 'sans-serif'],
      },
      fontSize: {
        // type scale observed on the live site
        xs: ['13px', '1.6'],
        sm: ['14px', '1.6'],
        base: ['16px', '1.7'],
        lg: ['18px', '1.6'],
        xl: ['22px', '1.4'],
        '2xl': ['25px', '1.3'],
        '3xl': ['30px', '1.25'],
        '4xl': ['32px', '1.2'],
        '5xl': ['50px', '1.1'],
        '6xl': ['64px', '1.05'],
      },
      borderRadius: {
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '13px',
        pill: '999px',
      },
      maxWidth: { container: '1240px' },
      boxShadow: {
        card: '0 10px 40px rgba(0, 33, 127, 0.08)',
        cardHover: '0 20px 60px rgba(0, 33, 127, 0.14)',
      },
    },
  },
  plugins: [],
};
export default config;
