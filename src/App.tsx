import React, { useEffect, useState } from 'react';
import { GameBoard, Header, Keyboard } from './component';
import { ALL_WORDS } from './const/5words';

import toast, { Toaster } from 'react-hot-toast';
import { InfoModal } from './component/modal';
import { aiGuessing } from './lib/game/aiGuessing';
import { Cell, Dict, GameMode } from './types';
import { generateAnswer } from './lib/game/generateAnswer';
import { searchWord } from './api/search';
import { convertDictResponse } from './lib/convertDictResponse';
import AiLoseModal from './component/modal/AiLoseModal';
import AiDrawModal from './component/modal/AiDrawModal';
const AiWinModal = React.lazy(() => import('./component/modal/AiWinModal'));
const LoseModal = React.lazy(() => import('./component/modal/LoseModal'));
const WinModal = React.lazy(() => import('./component/modal/WinModal'));

function App() {
	const [answer, setAnswer] = useState('');
	const [gameMode, setGameMode] = useState<GameMode>({
		mode: 'easy',
		aiMode: false,
	});
	const [currentRow, setCurrentRow] = useState(0);
	const [currentColumn, setCurrentColumn] = useState(0);
	const [guess, setGuess] = useState('');
	const [aiGuess, setAiGuess] = useState('');
	const [isWinModalOpen, setIsWinModalOpen] = useState(false);
	const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);
	const [isHelpModalOpen, setIsHelpModalOpen] = useState(true);
	const [isAiWinModalOpen, setIsAiWinModalOpen] = useState(false);
	const [isAiLoseModalOpen, setIsAiLoseModalOpen] = useState(false);
	const [isAiDrawModalOpen, setIsAiDrawModalOpen] = useState(false);
	const [dict, setDict] = useState<Dict | null>(null);
	const [turn, setTurn] = useState(1);
	const [aiTyping, setAiTyping] = useState(false);
	const [cellValues, setCellValues] = useState<Cell[][]>(
		Array(6)
			.fill(null)
			.map(() => Array(5).fill({ letter: '', color: '' }))
	);

	// 첫 입장 시 EASY, ai off 모드로 시작
	useEffect(() => {
		const newAnswer = generateAnswer(gameMode);
		setAnswer(newAnswer);
	}, []);

	// useEffect(() => {
	// 	console.log('answer: ', answer);
	// 	console.log('gameMode: ', gameMode);
	// }, [answer]);

	// 난이도가 변경되면 게임 리셋
	useEffect(() => {
		resetGame();
	}, [gameMode]);

	// 게임 시작 시 단어 사전 검색
	useEffect(() => {
		if (answer) {
			const fetchDict = async () => {
				const data = await searchWord(answer);
				const dict = convertDictResponse(data);
				setDict(dict as Dict);
			};
			fetchDict();
		}
	}, [answer]);

	const notWordToast = () => {
		toast('올바른 단어가 아닙니다.', {
			duration: 2000,
			style: {
				backgroundColor: '#f05650',
			},
		});
	};

	const notFiveCharToast = () => {
		toast('단어는 5글자로 입력해 주세요.', {
			duration: 2000,
			style: {
				backgroundColor: '#ffff99',
			},
		});
	};

	const handleMode = () => {
		const newMode = gameMode.mode === 'easy' ? 'hard' : 'easy';
		setGameMode({
			...gameMode,
			mode: newMode,
		});
	};

	const resetGame = () => {
		setCurrentRow(0);
		setCurrentColumn(0);
		setTurn(1);
		setGuess('');
		setCellValues(
			Array(6)
				.fill(null)
				.map(() => Array(5).fill({ letter: '', color: '' }))
		);
		const newAnswer = generateAnswer(gameMode);

		setAnswer(newAnswer);
	};

	const openWinModal = () => {
		setIsWinModalOpen(true);
	};

	const closeWinModalAndResetGame = () => {
		setIsWinModalOpen(false);
		resetGame();
	};
	const openLoseModal = () => {
		setIsLoseModalOpen(true);
	};

	const closeLoseModalAndResetGame = () => {
		setIsLoseModalOpen(false);
		resetGame();
	};

	const openAiWinModal = () => {
		setIsAiWinModalOpen(true);
	};

	const closeAiWinModalAndResetGame = () => {
		setIsAiWinModalOpen(false);
		resetGame();
	};
	const openAiLoseModal = () => {
		setIsAiLoseModalOpen(true);
	};

	const closeAiLoseModalAndResetGame = () => {
		setIsAiLoseModalOpen(false);
		resetGame();
	};

	const openAiDrawModal = () => {
		setIsAiDrawModalOpen(true);
	};

	const closeAiDrawModalAndResetGame = () => {
		setIsAiDrawModalOpen(false);
		resetGame();
	};

	const openHelpModal = () => {
		setIsHelpModalOpen(true);
	};
	const closeHelpModal = () => {
		setIsHelpModalOpen(false);
	};

	const isGameEnd = async () => {
		if (gameMode.aiMode) {
			if (guess === answer) {
				openAiLoseModal();
			}
			if (currentRow === 5 && aiGuess !== answer && guess !== answer) {
				openAiDrawModal();
			}
		} else {
			if (guess === answer) {
				openWinModal();
			}
			if (currentRow === 5 && guess !== answer) {
				openLoseModal();
			}
		}
	};

	const isAiGameEnd = async (aiGuesses: string) => {
		if (aiGuesses === answer) {
			openAiWinModal();
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

		isGameEnd();

		setCurrentRow(Math.min(currentRow + 1, 6));
		setGuess('');
		setCurrentColumn(0);
		setTurn(turn + 1);
	};

	const handleAiGuessing = async () => {
		const aiGuesses = aiGuessing(turn, cellValues);
		setAiGuess(aiGuesses);
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
			isAiGameEnd(aiGuesses);
			setCurrentRow((prev) => Math.min(prev + 1, 6));
			setCurrentColumn(0);
			setTurn((prev) => prev + 1);
		}
	};

	const handleAiMode = () => {
		const newMode = !gameMode.aiMode;
		setGameMode({
			...gameMode,
			aiMode: newMode,
		});
	};

	useEffect(() => {
		if (!isAiWinModalOpen && !isAiLoseModalOpen && !isAiDrawModalOpen) {
			let timer: NodeJS.Timeout;
			if (gameMode.aiMode && turn % 2 === 1 && turn < 6) {
				setAiTyping(true);
				timer = setTimeout(
					() => {
						handleAiGuessing();
						setAiTyping(false);
					},
					Math.floor(Math.random() * (4500 - 2000)) + 2000
				);
			}
			return () => {
				clearTimeout(timer);
				setAiTyping(false);
			};
		}
	}, [gameMode, turn, cellValues, answer, currentRow]);

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
				gameMode={gameMode}
				switchMode={handleMode}
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
				dict={dict as Dict}
			/>
			<LoseModal
				isOpen={isLoseModalOpen}
				onClose={closeLoseModalAndResetGame}
				answer={answer}
				dict={dict as Dict}
			/>
			<AiWinModal
				isOpen={isAiWinModalOpen}
				onClose={closeAiWinModalAndResetGame}
				answer={answer}
				dict={dict as Dict}
			/>
			<AiLoseModal
				isOpen={isAiLoseModalOpen}
				onClose={closeAiLoseModalAndResetGame}
				answer={answer}
				dict={dict as Dict}
			/>
			<AiDrawModal
				isOpen={isAiDrawModalOpen}
				onClose={closeAiDrawModalAndResetGame}
				answer={answer}
				dict={dict as Dict}
			/>
			<InfoModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
		</div>
	);
}
export default App;
