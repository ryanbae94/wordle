import React from 'react';

type KeyboardProps = {
	onKeyPress: (key: string) => void;
};

export default function Keyboard({ onKeyPress }: KeyboardProps) {
	const keys = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['del', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
	];
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
