import React, { useEffect, useState } from 'react';
import './App.css';
import { GameBoard, Header, Keyboard } from './component';
import { COMMON_WORDS, ALL_WORDS } from './const/5words';
import Modal from './component/modal/Modal';

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
		// 색상 업데이트를 먼저 진행
		setCellValues((prevValues) => {
			const newValues = prevValues.map((row) =>
				row.map((cell) => ({ ...cell }))
			);

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

		// 상태 업데이트 후에 currentRow를 업데이트
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
					alert('단어 목록에 없습니다. 정확한 단어를 입력하셈');
					console.log('틀림', guess);
					// setGuess('');
					return;
				}
				guessing();
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
		<div className='flex flex-col h-dvh md:h-screen gap-3 justify-between'>
			<Header />
			<GameBoard cellValues={cellValues} />
			<Keyboard onKeyPress={handleKeyPress} cellValues={cellValues} />
			<Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
		</div>
	);
}

export default App;
