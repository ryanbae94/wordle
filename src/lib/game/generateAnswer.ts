import { EASY_WORDS, HARD_WORDS } from '../../const/5words';
import { GameMode } from '../../types';

export const generateAnswer = (mode: GameMode) => {
	return mode.mode === 'hard'
		? HARD_WORDS[Math.floor(Math.random() * HARD_WORDS.length)]
		: EASY_WORDS[Math.floor(Math.random() * EASY_WORDS.length)];
};
