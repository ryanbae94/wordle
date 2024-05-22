/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
			},
			animation: {
				'pop-in': 'popIn 0.15s ease-out',
				'pop-in-bg-color': 'popInBgColor 0.15s ease-out',
			},
		},
		screens: {
			xxsm: '375px',
			xsm: '390px',
			sm: '430px',
			lg: '800px',
		},
	},
	plugins: [],
};
