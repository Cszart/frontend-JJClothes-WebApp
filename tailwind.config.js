module.exports = {
	content: [
		'./src/**/*.{html,js,ts,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				taviraj: ['Taviraj', 'serif'],
			},
			padding: {
				'100px': '100px',
				25: '6.25rem',
			},
			colors: {
				'teal-501': '#0EBEA6',
				'purple-301': '#E2A9FD',
				'red-601': '#D84727',
				'gray-701': '#333333',
				'zinc-101': '#F7F6F4',
				'esmerald-201': '#A3E4DB',
				'purple-901': '#570C7A',
			},
		},
	},

	plugins: [],
};
