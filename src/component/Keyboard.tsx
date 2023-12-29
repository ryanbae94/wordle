import React, { useEffect } from 'react';

type KeyboardProps = {
	onKeyPress: (key: string) => void;
};

export default function Keyboard({ onKeyPress }: KeyboardProps) {
	const keys = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['del', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
	];
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
		<div className='flex flex-col my-4 items-center gap-2'>
			{keys.map((row, index) => (
				<div key={index} className='flex'>
					{row.map((key) => (
						<button
							key={key}
							onClick={() => onKeyPress(key)}
							className='flex font-bold p-2 mx-1 cursor-pointer uppercase border-2'
						>
							{key}
						</button>
					))}
				</div>
			))}
		</div>
	);
}
