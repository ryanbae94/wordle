import React, { useEffect, useState } from 'react';
import './App.css';
import { GameBoard, Header, Keyboard } from './component';
import { ALL_WORDS, HARD_WORDS, EASY_WORDS } from './const/5words';

import toast, { Toaster } from 'react-hot-toast';
import { InfoModal } from './component/modal';
const LoseModal = React.lazy(() => import('./component/modal/LoseModal'));
const WinModal = React.lazy(() => import('./component/modal/WinModal'));

function App() {
	const [answer, setAnswer] = useState(
		EASY_WORDS[Math.floor(Math.random() * EASY_WORDS.length)]
	);
	const [hardMode, setHardMode] = useState(false);
	const [currentRow, setCurrentRow] = useState(0);
	const [currentColumn, setCurrentColumn] = useState(0);
	const [guess, setGuess] = useState('');
	const [isWinModalOpen, setIsWinModalOpen] = useState(false);
	const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);
	const [isHelpModalOpen, setIsHelpModalOpen] = useState(true);
	const [cellValues, setCellValues] = useState<
		{ letter: string; color: string }[][]
	>(
		Array(6)
			.fill(null)
			.map(() => Array(5).fill({ letter: '', color: '' }))
	);

	useEffect(() => {
		console.log(answer);
		console.log('mode: ', hardMode);
	}, [answer, hardMode]);

	const handleMode = () => {
		const newMode = !hardMode;
		setHardMode(newMode);
		resetGame(newMode);
	};

	const openWinModal = (answer: string) => {
		setIsWinModalOpen(true);
	};

	const closeWinModalAndResetGame = () => {
		setIsWinModalOpen(false);
		resetGame(hardMode);
	};
	const openLoseModal = (answer: string) => {
		setIsLoseModalOpen(true);
	};

	const closeLoseModalAndResetGame = () => {
		setIsLoseModalOpen(false);
		resetGame(hardMode);
	};

	const openHelpModal = () => {
		setIsHelpModalOpen(true);
	};
	const closeHelpModal = () => {
		setIsHelpModalOpen(false);
	};

	const resetGame = (mode: boolean) => {
		setCurrentRow(0);
		setCurrentColumn(0);
		setGuess('');
		setCellValues(
			Array(6)
				.fill(null)
				.map(() => Array(5).fill({ letter: '', color: '' }))
		);
		const newAnswer = mode
			? HARD_WORDS[Math.floor(Math.random() * HARD_WORDS.length)]
			: EASY_WORDS[Math.floor(Math.random() * EASY_WORDS.length)];
		setAnswer(newAnswer);
	};

	const isGameEnd = () => {
		if (guess === answer) {
			openWinModal(answer);
		}
		if (currentRow === 5 && guess !== answer) {
			openLoseModal(answer);
		}
	};

	const guessing = () => {
		setCellValues((prev) => {
			const newValues = [...prev];

			for (let i = 0; i < guess.length; i++) {
				if (guess[i] === answer[i]) {
					newValues[currentRow][i].color = 'green';
				} else if (answer.includes(guess[i])) {
					newValues[currentRow][i].color = 'yellow';
				} else {
					newValues[currentRow][i].color = 'gray';
				}
			}
			return newValues;
		});

		setTimeout(() => {
			isGameEnd();
			setCurrentRow(Math.min(currentRow + 1, 6));
			setGuess('');
			setCurrentColumn(0);
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
				console.log('guess: ', guess);

				if (!ALL_WORDS.includes(guess)) {
					const notify = () =>
						toast('단어 목록에 없어요. 다른 단어를 입력 해보세요.', {
							duration: 2000,
						});
					notify();
					return;
				}
				guessing();
			}
		} else {
			setCellValues((prev) => {
				const newValues = [...prev];
				if (currentColumn < 5) {
					const newRow = [...newValues[currentRow]];
					newRow[currentColumn] = { letter: key, color: '' };
					newValues[currentRow] = newRow;
					setGuess(guess + key);
					setCurrentColumn(Math.min(currentColumn + 1, 5));
					console.log('key: ', key);
				}
				return newValues;
			});
		}
	};

	return (
		<div className='flex flex-col h-dvh md:h-screen gap-3 justify-between'>
			<Toaster
				toastOptions={{
					style: {
						backgroundColor: '#f05650',
					},
				}}
				containerStyle={{
					top: 100,
				}}
			/>
			<Header onHelpClick={openHelpModal} />
			<GameBoard
				cellValues={cellValues}
				mode={hardMode}
				switchMode={handleMode}
			/>

			<Keyboard onKeyPress={handleKeyPress} cellValues={cellValues} />
			<WinModal
				isOpen={isWinModalOpen}
				onClose={closeWinModalAndResetGame}
				answer={answer}
			/>
			<LoseModal
				isOpen={isLoseModalOpen}
				onClose={closeLoseModalAndResetGame}
				answer={answer}
			/>
			{isHelpModalOpen && (
				<InfoModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
			)}
		</div>
	);
}

export default App;
