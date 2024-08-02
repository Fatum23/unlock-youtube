/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				default: 'var(--default)',
				light: 'var(--light)',
				dark: 'var(--dark)',
				text: 'var(--text)',
				accent: 'var(--accent)',
				'dark-accent': 'var(--dark-accent)',
			},
			boxShadow: {
				glow: '0 0 10px #f87171',
				dark: '0 0 10px var(--dark)',
			},
		},
	},
	plugins: [],
}
