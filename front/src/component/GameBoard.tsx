import React from 'react';

type GameBoardProps = {
	cellValues: { letter: string; color: string }[][];
	mode: boolean;
	switchMode: () => void;
};

export default function GameBoard({
	cellValues,
	mode,
	switchMode,
}: GameBoardProps) {
	const rows = 6;
	const columns = 5;
	return (
		<div className='flex flex-col items-center'>
			{Array.from({ length: rows }, (_, rowIndex) => (
				<div key={`row-${rowIndex}`} className='flex flex-row'>
					{Array.from({ length: columns }, (_, columnIndex) => {
						const cell = cellValues[rowIndex][columnIndex];
						let cellClassName =
							'flex items-center justify-center border-2 border-solid rounded m-1 h-11 w-11 sm:h-14 sm:w-14 lg:h-20 lg:w-20 text-4xl font-bold uppercase';
						if (cell.color) {
							if (cell.color === 'gray') {
								cellClassName += ` bg-${cell.color}-400 animate-pop-in-bg-color`;
							} else {
								cellClassName += ` bg-${cell.color}-200 animate-pop-in-bg-color`;
							}
						}
						const animationClass = cell.letter ? 'animate-pop-in' : '';
						const borderClass = cell.letter ? 'border-black' : '';
						return (
							<div
								key={`cell-${rowIndex}-${columnIndex}`}
								className={`${cellClassName} ${borderClass} ${animationClass}`}
							>
								{cell.letter}
							</div>
						);
					})}
				</div>
			))}
			<button
				className='text-xs mt-4 text-indigo-700 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-100 font-medium hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:text-sm uppercase'
				onClick={switchMode}
			>
				{mode ? '너무 어려워 돌아갈래' : '아 이건 너무 쉬운데요'}
			</button>
		</div>
	);
}
