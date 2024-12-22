// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./public/index.html", // Include root HTML file
      "./src/**/*.{js,jsx,ts,tsx}", // Include all source files
    ],
    theme: {
      extend: {
        colors: {
          primary: "#003366", // Navy Blue
          secondary: "#EFEFEF", // Light Grey
          accent: "#00A676", // Emerald Green
        },
        fontFamily: {
          primary: ["Poppins", "sans-serif"], // Headline font
          secondary: ["Open Sans", "sans-serif"], // Body text font
        },
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        borderRadius: {
          'xl': '1.25rem',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'), // For better form styles
      require('@tailwindcss/typography'), // For prose styles
      require('@tailwindcss/aspect-ratio'), // For managing aspect ratios
    ],
  };
  