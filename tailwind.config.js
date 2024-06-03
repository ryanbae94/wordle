/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Pretendard', 'sans-serif'],
			},
			keyframes: {
				popIn: {
					'0%': { transform: 'scale(1)', opacity: 0 },
					'50%': { transform: 'scale(1.1)', opacity: 1 },
					'100%': { transform: 'scale(1)', opacity: 1 },
				},
				popInBgColor: {
					'0%': {
						transform: 'scale(1)',
						backgroundColor: 'transparent',
					},
					'50%': {
						transform: 'scale(1.1)',
					},
					'100%': {
						transform: 'scale(1)',
					},
				},
				opacityIn: {
					'50%': {
						opacity: 0,
					},
				},
			},
			animation: {
				'pop-in': 'popIn 0.15s ease-out',
				'pop-in-bg-color': 'popInBgColor 0.15s ease-out',
				'opacity-in': 'opacityIn 1.5s ease-in-out infinite',
			},
		},
		screens: {
			xxsm: '375px',
			xsm: '390px',
			sm: '430px',
			lg: '800px',
			xxl: '1200px',
		},
	},
	plugins: [],
};
