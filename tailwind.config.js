module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        ibm_plex: ['IBM Plex Sans']
      },
      colors: {
        primary: '#fcd535',
        primary2: '#F0B90B',
        primary_dim: '#C99400',
        secondary: '#181a20',
        secondary_light: '#1e2329'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
