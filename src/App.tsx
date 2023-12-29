import React, { useEffect, useState } from 'react';
import './App.css';
import { GameBoard, Header, Keyboard } from './component';
import { WORDS } from './const/5words';

const answer = WORDS[Math.floor(Math.random() * WORDS.length)];

function App() {
	const [currentRow, setCurrentRow] = useState(0);
	const [currentColumn, setCurrentColumn] = useState(0);
	const [guess, setGuess] = useState('');

	const [cellValues, setCellValues] = useState<
		{ letter: string; color: string }[][]
	>(
		Array(6)
			.fill(null)
			.map(() => Array(5).fill({ letter: '', color: '' }))
	);

	useEffect(() => {
		console.log(answer);
	}, []);

	const guessing = () => {
		setCellValues((prev) => {
			const newValues = [...cellValues];

			for (let i = 0; i < guess.length; i++) {
				if (guess[i] === answer[i]) {
					newValues[currentRow][i].color = 'green';
				} else if (answer.includes(guess[i])) {
					if (newValues[currentRow][i].color === 'green') {
						continue;
					} else {
						newValues[currentRow][i].color = 'yellow';
					}
				} else {
					newValues[currentRow][i].color = 'gray';
				}
			}
			return newValues;
		});
		setTimeout(() => {
			if (guess === answer) {
				alert('정답입니당!');
			}
			setGuess('');
		}, 0);
	};
	const handleKeyPress = (key: string) => {
		if (key === 'del') {
			setCellValues((prev) => {
				const newValues = [...prev];
				if (currentColumn > 0) {
					newValues[currentRow][currentColumn - 1].letter = '';
					setCurrentColumn(Math.max(currentColumn - 1, 0));
					setGuess(guess.slice(0, -1));
				}
				return newValues;
			});
		} else if (key === 'enter') {
			if (currentColumn === 5) {
				guessing();
				setCurrentRow(Math.min(currentRow + 1, 6));
				setCurrentColumn(0);
			}
		} else {
			setCellValues((prev) => {
				const newValues = prev.map((row) => row.map((cell) => ({ ...cell }))); // 깊은 복사
				if (currentColumn < 5) {
					newValues[currentRow][currentColumn].letter = key;
					setCurrentColumn(Math.min(currentColumn + 1, 5));
					setGuess(guess + key);
				}
				return newValues;
			});
		}
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
