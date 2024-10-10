/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./src/assets/bgpic.jpg"
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			hero: "url('./src/assets/bgpic.jpg')"
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [
	// require("tailwindcss-animate")
	import("tailwindcss-animate")
],
}
