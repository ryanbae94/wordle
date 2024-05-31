const koreanToEnglishMap: { [key: string]: string } = {
	ㅂ: 'q',
	ㅈ: 'w',
	ㄷ: 'e',
	ㄱ: 'r',
	ㅅ: 't',
	ㅛ: 'y',
	ㅕ: 'u',
	ㅑ: 'i',
	ㅐ: 'o',
	ㅔ: 'p',
	ㅁ: 'a',
	ㄴ: 's',
	ㅇ: 'd',
	ㄹ: 'f',
	ㅎ: 'g',
	ㅗ: 'h',
	ㅓ: 'j',
	ㅏ: 'k',
	ㅣ: 'l',
	ㅋ: 'z',
	ㅌ: 'x',
	ㅊ: 'c',
	ㅍ: 'v',
	ㅠ: 'b',
	ㅜ: 'n',
	ㅡ: 'm',
};

export const koreanToEnglish = (char: string): string => {
	console.log(char);
	return koreanToEnglishMap[char] || char;
};
