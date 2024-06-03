import { EASY_WORDS, HARD_WORDS } from '../const/5words';

export const aiGuess = (
	turn: number,
	cellValues: { letter: string; color: string }[][]
) => {
	const WORDS = turn === 1 ? EASY_WORDS : EASY_WORDS.concat(HARD_WORDS);

	if (turn === 1) {
		return WORDS[Math.floor(Math.random() * WORDS.length)];
	} else {
		let filteredWords = WORDS;
		for (let t = 0; t < turn; t++) {
			const previousGuess = cellValues[t].map((cell) => cell.letter).join('');
			const feedbackColors = cellValues[t].map((cell) => cell.color);

			filteredWords = filteredWords.filter((word) => {
				for (let i = 0; i < feedbackColors.length; i++) {
					const letter = previousGuess[i];
					const color = feedbackColors[i];
					if (color === 'green' && word[i] !== letter) return false;
					if (
						color === 'yellow' &&
						(word[i] === letter || !word.includes(letter))
					)
						return false;
					if (color === 'gray' && word[i] === letter) return false;
				}
				return true;
			});
		}

		return filteredWords[Math.floor(Math.random() * filteredWords.length)];
	}
};
