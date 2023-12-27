import React from 'react';

type Props = {
	cellValues: string[][];
};

export default function GameBoard() {
	const rows = 6;
	const columns = 5;
	return (
		<div className='flex flex-col'>
			{Array.from({ length: rows }, (_, rowIndex) => (
				<div key={`row-${rowIndex}`} className='flex flex-row'>
					{Array.from({ length: columns }, (_, columnIndex) => (
						<div
							key={`cell-${rowIndex}-${columnIndex}`}
							className='border-2 border-solid border-black rounded m-1 h-12 w-12'
						></div>
					))}
				</div>
			))}
		</div>
	);
}
