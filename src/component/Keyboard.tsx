import React, { useEffect, useMemo, useState } from 'react';

type KeyboardProps = {
	onKeyPress: (key: string) => void;
	cellValues: { letter: string; color: string }[][];
};

export default function Keyboard({ onKeyPress, cellValues }: KeyboardProps) {
	const keys = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del'],
	];

	const [touchUsed, setTouchUsed] = useState(false);

	const getKeyColor = (key: string): string => {
		let color = '';
		cellValues.forEach((row) => {
			row.forEach((cell) => {
				if (cell.letter === key) {
					if (cell.color === 'green') {
						color = cell.color;
					} else if (cell.color === 'yellow' && color !== 'green') {
						color = 'yellow';
					} else if (cell.color === 'gray' && color === '') {
						color = 'gray';
					}
				}
			});
		});
		switch (color) {
			case 'green':
				return 'bg-green-200';
			case 'yellow':
				return 'bg-yellow-200';
			case 'gray':
				return 'bg-gray-400';
			default:
				return '';
		}
	};

	const handleClick = (key: string) => {
		if (!touchUsed) {
			onKeyPress(key);
		}
		setTouchUsed(false);
	};

	const handleTouch = (key: string) => {
		setTouchUsed(true);
		onKeyPress(key);
	};

	useEffect(() => {
		const handleKeyDown = (event: any) => {
			switch (event.key) {
				case 'Backspace':
					onKeyPress('del');
					break;
				case 'Enter':
					onKeyPress('enter');
					break;
				default:
					const key = event.key.toLowerCase();
					if (keys.flat().includes(key)) {
						onKeyPress(key);
					}
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onKeyPress]);

	return (
		<div className='flex flex-col my-4 items-center gap-2 w-5/6 mx-auto'>
			{keys.map((row, index) => (
				<div key={index} className='flex justify-center w-screen'>
					{row.map((key) => {
						const keyColor = getKeyColor(key);
						let className =
							'flex items-center justify-center h-16 font-bold cursor-pointer uppercase border-2 border-gray-300 mx-0.5 rounded bg-gray-300';
						className += ` ${keyColor}`;

						switch (key) {
							case 'del':
								className += ' w-9 sm:w-10 lg:w-20';
								break;
							case 'enter':
								className += ' w-14 sm:w-16 lg:w-24';
								break;
							default:
								className += ' w-8 xsm:w-9 sm:w-10 md:w-12 lg:w-20';
						}

						return (
							<button
								key={key}
								onClick={() => handleClick(key)}
								onTouchEnd={() => handleTouch(key)}
								className={className}
							>
								{key}
							</button>
						);
					})}
				</div>
			))}
		</div>
	);
}
