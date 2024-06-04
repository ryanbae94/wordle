import React, { useEffect, useState } from 'react';
import { GameBoard, Header, Keyboard } from './component';
import { ALL_WORDS, HARD_WORDS, EASY_WORDS } from './const/5words';

import toast, { Toaster } from 'react-hot-toast';
import { InfoModal } from './component/modal';
import { aiGuess } from './lib/aiGuess';
import { searchWord } from './api/search';
const AiWinModal = React.lazy(() => import('./component/modal/AiWinModal'));
const LoseModal = React.lazy(() => import('./component/modal/LoseModal'));
const WinModal = React.lazy(() => import('./component/modal/WinModal'));

function App() {
	const [answer, setAnswer] = useState(
		EASY_WORDS[Math.floor(Math.random() * EASY_WORDS.length)]
	);
	const [hardMode, setHardMode] = useState(false);
	const [aiMode, setAiMode] = useState(false);
	const [currentRow, setCurrentRow] = useState(0);
	const [currentColumn, setCurrentColumn] = useState(0);
	const [guess, setGuess] = useState('');
	const [isWinModalOpen, setIsWinModalOpen] = useState(false);
	const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);
	const [isHelpModalOpen, setIsHelpModalOpen] = useState(true);
	const [isAiWinModalOpen, setIsAiWinModalOpen] = useState(false);
	const [turn, setTurn] = useState(1);
	const [aiTyping, setAiTyping] = useState(false);
	const [cellValues, setCellValues] = useState<
		{ letter: string; color: string }[][]
	>(
		Array(6)
			.fill(null)
			.map(() => Array(5).fill({ letter: '', color: '' }))
	);

	const notWordToast = () => {
		toast('올바른 단어가 아닙니다.', {
			duration: 2000,
			style: {
				backgroundColor: '#f05650',
			},
		});
	};

	useEffect(() => {
		const a = searchWord(answer);
		console.log('a: ', a);
	}, [answer]);

	const notFiveCharToast = () => {
		toast('단어는 5글자로 입력해 주세요.', {
			duration: 2000,
			style: {
				backgroundColor: '#ffff99',
			},
		});
	};

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

	const openAiWinModal = (answer: string) => {
		setIsAiWinModalOpen(true);
	};

	const closeAiWinModalAndResetGame = () => {
		setIsAiWinModalOpen(false);
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
		setTurn(1);
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

	const guessing = async () => {
		setCellValues((prev) => {
			const newValues = [...prev]; // 각 행을 개별적으로 복사

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
			setTurn(turn + 1);
		}, 0);
	};

	const aiGuessing = async () => {
		const aiGuesses = aiGuess(turn, cellValues);
		console.log('aiGuesses: ', aiGuesses);

		if (aiGuesses) {
			setCellValues((prev) => {
				const newValues = prev.map((row, rowIndex) => {
					// 현재 행은 깊은 복사하고, 다른 행은 그대로 유지
					return rowIndex === currentRow ? [...row] : row;
				});

				for (let i = 0; i < aiGuesses.length; i++) {
					if (aiGuesses[i] === answer[i]) {
						newValues[currentRow][i] = {
							...newValues[currentRow][i],
							letter: aiGuesses[i],
							color: 'green',
						};
					} else if (answer.includes(aiGuesses[i])) {
						newValues[currentRow][i] = {
							...newValues[currentRow][i],
							letter: aiGuesses[i],
							color: 'yellow',
						};
					} else {
						newValues[currentRow][i] = {
							...newValues[currentRow][i],
							letter: aiGuesses[i],
							color: 'gray',
						};
					}
				}
				return newValues;
			});
			isAiWin(aiGuesses);
			setCurrentRow((prev) => Math.min(prev + 1, 6));
			setGuess('');
			setCurrentColumn(0);
			setTurn((prev) => prev + 1);
		}
	};

	const isAiWin = (aiGuesses: string) => {
		if (aiGuesses === answer) {
			openAiWinModal(aiGuesses);
		}
	};

	const handleAiMode = () => {
		const newMode = !aiMode;
		setAiMode(newMode);
		resetGame(newMode);
	};

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (aiMode && turn % 2 === 1 && turn < 6) {
			setAiTyping(true);
			timer = setTimeout(
				() => {
					aiGuessing();
					setAiTyping(false);
				},
				Math.floor(Math.random() * (4500 - 2000)) + 2000
			);
		}

		return () => {
			clearTimeout(timer);
			setAiTyping(false);
		};
	}, [aiMode, turn, cellValues, answer, currentRow]);

	const handleKeyPress = (key: string) => {
		if (key === 'del') {
			if (currentColumn >= 1) {
				setCellValues((prev) => {
					const newValues = [...prev];
					if (currentColumn > 0) {
						newValues[currentRow][currentColumn - 1].letter = '';
						setCurrentColumn(Math.max(currentColumn - 1, 0));
						setGuess(guess.slice(0, -1));
					}
					return newValues;
				});
			}
		} else if (key === 'enter') {
			if (currentColumn === 5) {
				console.log('guess: ', guess);

				if (!ALL_WORDS.includes(guess)) {
					notWordToast();
					return;
				}
				guessing();
			} else {
				notFiveCharToast();
				return;
			}
		} else {
			if (currentColumn < 5) {
				setCellValues((prev) => {
					const newValues = [...prev];
					if (currentColumn < 5) {
						const newRow = [...newValues[currentRow]];
						newRow[currentColumn] = { letter: key, color: '' };
						newValues[currentRow] = newRow;
						setGuess(guess + key);
						setCurrentColumn(Math.min(currentColumn + 1, 5));
					}
					return newValues;
				});
			}
		}
	};

	return (
		<div className='flex flex-col h-dvh md:h-screen gap-3 justify-between items-center'>
			<Toaster
				containerStyle={{
					top: 100,
				}}
			/>
			<Header onHelpClick={openHelpModal} />
			<GameBoard
				cellValues={cellValues}
				mode={hardMode}
				switchMode={handleMode}
				aiMode={aiMode}
				switchAiMode={handleAiMode}
			/>

			<Keyboard
				onKeyPress={handleKeyPress}
				cellValues={cellValues}
				aiTyping={aiTyping}
			/>
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
			<AiWinModal
				isOpen={isAiWinModalOpen}
				onClose={closeAiWinModalAndResetGame}
				answer={answer}
			/>
			{isHelpModalOpen && (
				<InfoModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
			)}
		</div>
	);
}
export default App;
