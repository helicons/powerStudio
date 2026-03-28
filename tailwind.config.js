/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de color del diseño
        'bg-primary':    '#0d1117',
        'bg-secondary':  '#111827',
        'bg-card':       '#1a2235',
        'acento':        '#7c3aed',
        'acento-suave':  '#a78bfa',
        'texto-primary': '#f1f5f9',
        'texto-secondary':'#94a3b8',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm:   ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
