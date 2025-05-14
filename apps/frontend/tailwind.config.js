// tailwind.config.js

const {heroui} = require("@repo/ui-hero");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [heroui(),
        require('@tailwindcss/typography'),
    ],
};
