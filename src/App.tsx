import React, { useEffect, useState } from 'react';
import './App.css';
import { GameBoard, Header, Keyboard } from './component';
import { COMMON_WORDS, ALL_WORDS } from './const/5words';
import Modal from './component/modal/Modal';
import toast, { Toaster } from 'react-hot-toast';

function App() {
	const [answer, setAnswer] = useState(
		COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]
	);
	const [currentRow, setCurrentRow] = useState(0);
	const [currentColumn, setCurrentColumn] = useState(0);
	const [guess, setGuess] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	const [cellValues, setCellValues] = useState<
		{ letter: string; color: string }[][]
	>(
		Array(6)
			.fill(null)
			.map(() => Array(5).fill({ letter: '', color: '' }))
	);

	useEffect(() => {
		console.log(answer);
	}, [answer]);

	const openModal = (message: string) => {
		setModalMessage(message);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		resetGame();
	};

	const resetGame = () => {
		setCurrentRow(0);
		setCurrentColumn(0);
		setGuess('');
		setCellValues(
			Array(6)
				.fill(null)
				.map(() => Array(5).fill({ letter: '', color: '' }))
		);
		setAnswer(COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]);
	};

	const isGameEnd = () => {
		if (guess === answer) {
			openModal('정답입니다!');
		}
		if (currentRow === 5 && guess !== answer) {
			openModal(`실패요... 정답은 ${answer}`);
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
						toast('단어 목록에 없어요. 다른 단어를 입력 해보세요.');
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
			<Header />
			<GameBoard cellValues={cellValues} />
			<Keyboard onKeyPress={handleKeyPress} cellValues={cellValues} />
			<Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
		</div>
	);
}

export default App;
