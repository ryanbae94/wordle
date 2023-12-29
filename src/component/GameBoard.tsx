import React from 'react';

type GameBoardProps = {
	cellValues: { letter: string; color: string }[][];
};

export default function GameBoard({ cellValues }: GameBoardProps) {
	const rows = 6;
	const columns = 5;
	return (
		<div className='flex flex-col'>
			{Array.from({ length: rows }, (_, rowIndex) => (
				<div key={`row-${rowIndex}`} className='flex flex-row'>
					{Array.from({ length: columns }, (_, columnIndex) => {
						const cell = cellValues[rowIndex][columnIndex];
						let cellClassName =
							'flex items-center justify-center border-2 border-solid border-black rounded m-1 h-12 w-12 text-4xl font-bold uppercase';
						if (cell.color) {
							if (cell.color === 'gray') {
								cellClassName += ` bg-${cell.color}-400`;
							} else {
								cellClassName += ` bg-${cell.color}-200`;
							}
						}
						return (
							<div
								key={`cell-${rowIndex}-${columnIndex}`}
								className={cellClassName}
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
