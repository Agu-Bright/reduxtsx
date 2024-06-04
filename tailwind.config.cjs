/** @type {import('tailwindcss').Config} */
export default {
	content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
	theme: {
		extend: {
			colors: {
				primary: "#109324",
				secondary: "#E1C11A",
			},
		},
	},
	plugins: [],
};
