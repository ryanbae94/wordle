import React from 'react';

type GameBoardProps = {
	cellValues: { letter: string; color: string }[][];
};

export default function GameBoard({ cellValues }: GameBoardProps) {
	const rows = 6;
	const columns = 5;
	return (
		<div className='flex flex-col items-center'>
			{Array.from({ length: rows }, (_, rowIndex) => (
				<div key={`row-${rowIndex}`} className='flex flex-row'>
					{Array.from({ length: columns }, (_, columnIndex) => {
						const cell = cellValues[rowIndex][columnIndex];
						let cellClassName =
							'flex items-center justify-center border-2 border-solid rounded m-1 h-12 w-12 text-4xl font-bold uppercase';
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
		</div>
	);
}
