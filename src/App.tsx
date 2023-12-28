import React, { useState } from 'react';
import './App.css';
import { GameBoard, Header, Keyboard } from './component';

function App() {
	const [cellValues, setCellValues] = useState<string[][]>(
		Array(6)
			.fill('')
			.map(() => Array(5).fill(''))
	);

	const handleKeyPress = (key: string) => {
		setCellValues((prev) => {
			const newValues = [...prev];
			newValues[0][0] = key;
			return newValues;
		});
	};

	return (
		<div className='flex flex-col h-screen justify-between items-center'>
			<Header />
			<GameBoard cellValues={cellValues} />
			<Keyboard onKeyPress={handleKeyPress} />
		</div>
	);
}

export default App;
