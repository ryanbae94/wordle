import React, { useEffect } from 'react';

type KeyboardProps = {
	onKeyPress: (key: string) => void;
	cellValues: { letter: string; color: string }[][];
};

export default function Keyboard({ onKeyPress, cellValues }: KeyboardProps) {
	const keys = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['del', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
	];

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

	useEffect(() => {
		const handleKeyDown = (event: any) => {
			if (event.key === 'Backspace') {
				onKeyPress('del');
			} else if (event.key === 'Enter') {
				onKeyPress('enter');
			} else {
				const key = event.key.toLowerCase();
				if (keys.flat().includes(key)) {
					onKeyPress(key);
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [keys]);

	return (
		<div className='flex flex-col my-4 items-center gap-2 w-4/5 mx-auto'>
			{keys.map((row, index) => (
				<div key={index} className='flex'>
					{row.map((key) => {
						const keyColor = getKeyColor(key);
						let className =
							'flex items-center justify-center font-bold md:w-20 p-1.5 mx-0.5 md:mx-1 md:text-xl text-m cursor-pointer uppercase border-2 ';
						className += keyColor;
						if (key === 'enter') {
							className += ' w-19'; // enter 키에 대해 너비 증가
						} else if (key === 'del') {
							className += ' w-9'; // del 키에 대해 너비 감소
						} else {
							className += ' w-8 h-14'; // 나머지 키의 기본 크기
						}
						return (
							<button
								key={key}
								onClick={() => onKeyPress(key)}
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
