import React, { useEffect, useMemo, useState } from 'react';
import { koreanToEnglish } from '../lib/koreanToEnglish';

type KeyboardProps = {
	onKeyPress: (key: string) => void;
	cellValues: { letter: string; color: string }[][];
	aiTyping: boolean;
};

export default function Keyboard({
	onKeyPress,
	cellValues,
	aiTyping,
}: KeyboardProps) {
	const keys = useMemo(
		() => [
			['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
			['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
			['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del'],
		],
		[]
	);

	const koreanKeys = useMemo(() => {
		return [
			'ㅂ',
			'ㅈ',
			'ㄷ',
			'ㄱ',
			'ㅅ',
			'ㅛ',
			'ㅕ',
			'ㅑ',
			'ㅐ',
			'ㅔ',
			'ㅁ',
			'ㄴ',
			'ㅇ',
			'ㄹ',
			'ㅎ',
			'ㅗ',
			'ㅓ',
			'ㅏ',
			'ㅣ',
			'ㅋ',
			'ㅌ',
			'ㅊ',
			'ㅍ',
			'ㅠ',
			'ㅜ',
			'ㅡ',
		];
	}, []);

	const [touchUsed, setTouchUsed] = useState(false);

	const getKeyColor = (key: string): string => {
		let color = '';
		cellValues.forEach((row) => {
			row.forEach((cell) => {
				if (cell.letter === key) {
					if (cell.color === 'green') {
						color = cell.color;
					} else if (cell.color === 'yellow' && color !== 'green') {
						color = 'yellow';
					} else if (cell.color === 'gray' && color === '') {
						color = 'gray';
					}
				}
			});
		});
		switch (color) {
			case 'green':
				return 'bg-green-200';
			case 'yellow':
				return 'bg-yellow-200';
			case 'gray':
				return 'bg-gray-400';
			default:
				return '';
		}
	};

	const handleClick = (key: string) => {
		if (!touchUsed) {
			onKeyPress(key);
		}
		setTouchUsed(false);
	};

	const handleTouch = (key: string) => {
		if (!aiTyping) {
			setTouchUsed(true);
			onKeyPress(key);
		}
	};

	useEffect(() => {
		if (aiTyping) {
			return;
		}
		const handleKeyDown = (event: any) => {
			switch (event.key) {
				case 'Backspace':
					onKeyPress('del');
					break;
				case 'Enter':
					onKeyPress('enter');
					break;
				default:
					const key = event.key.toLowerCase();
					if (koreanKeys.includes(key)) {
						const englishChar = koreanToEnglish(key);
						onKeyPress(englishChar);
					} else if (keys.flat().includes(key)) {
						onKeyPress(key);
					}

					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onKeyPress, keys, koreanKeys]);

	return (
		<div className='relative flex flex-col my-4 items-center gap-2 w-full mx-auto'>
			{aiTyping && (
				<div className='absolute top-0 left-0 right-0 flex justify-center items-center z-50 bg-gray-200 bg-opacity-75 h-full w-full'>
					<p className='text-2xl font-bold animate-opacity-in'>
						AI가 입력 중입니다.
					</p>
				</div>
			)}
			{keys.map((row, index) => (
				<div key={index} className='flex justify-center w-screen'>
					{row.map((key) => {
						const keyColor = getKeyColor(key);
						let className =
							'flex items-center justify-center h-16 font-bold cursor-pointer uppercase border-2 border-gray-300 mx-0.5 rounded bg-gray-300';
						className += ` ${keyColor}`;

						switch (key) {
							case 'del':
								className += ' w-9 sm:w-10 lg:w-20';
								break;
							case 'enter':
								className += ' w-14 sm:w-16 lg:w-24';
								break;
							default:
								className += ' w-8 xsm:w-9 sm:w-10 md:w-12 lg:w-20';
						}

						return (
							<button
								key={key}
								onClick={() => handleClick(key)}
								onTouchEnd={() => handleTouch(key)}
								className={className}
							>
								{key}
							</button>
						);
					})}
				</div>
			))}
		</div>
	);
}
