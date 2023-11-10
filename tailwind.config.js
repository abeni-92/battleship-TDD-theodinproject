/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "*.js"],
  theme: {
    extend: {
		keyframes: {
			wave: {
				'0%': { opacity: 0 },
				'100%' : { opacity: 1 }
			}
		},
		animation: {
			'fade-in': 'wave 1s ease-in-out',
		}
	},
  },
  plugins: [],
}

