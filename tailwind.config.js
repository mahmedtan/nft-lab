module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryLight: "var(--color-primary-light)",

        primaryDark: "var(--color-primary-dark)",

        secondary: "var(--color-secondary)",

        background: "var(--color-background)",

        foreground: "var(--color-foreground)",
        foregroundLight: "var(--color-foreground-light)",

        font: "var(--color-font)",

        heroBg: "var(--color-hero-background)",
        heroFont: "var(--color-hero-font)",

        aboutBg: "var(--color-about-background)",
        aboutFont: "var(--color-about-font)",

        teamBg: "var(--color-team-background)",
        teamFont: "var(--color-team-font)",

        collectionBg: "var(--color-collection-background)",
        collectionFont: "var(--color-collection-font)",

        faqBg: "var(--color-faq-background)",
        faqFont: "var(--color-faq-font)",
        roadmapBg: "var(--color-faq-background)",
        roadmapFont: "var(--color-faq-font)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Urbanist",
          "Rajdhani",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
