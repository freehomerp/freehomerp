import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'media',
  theme: {
    colors: {
      neutral: {
        DEFAULT: colors.slate[400],
        1: colors.slate[50],
        2: colors.slate[200],
        3: colors.slate[400],
        4: colors.slate[600],
        5: colors.slate[800],
      },
      primary: colors.cyan[600],
      secondary: colors.cyan[800],
      success: colors.emerald[400],
      warning: colors.amber[300],
      error: colors.red[600],
      white: colors.white,
      black: colors.black,
    },
    fontFamily: {
      sans: ['"Noto Sans"', 'sans'],
      serif: ['"Noto Serif"', 'sans-serif'],
      mono: ['"Noto Sans Mono"', 'monospace'],
    },
  },
  plugins: [],
};
