export const convertDictResponse = (data: any) => {
	const htmlString = data.entryContent;

	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, 'text/html');
	const word = doc.querySelector('.hw')?.textContent;
	const type = doc.querySelector('toc-pos')?.textContent;
	const definition = doc.querySelector('.def')?.textContent;
	const example = doc.querySelector('.eg')?.textContent;

	return {
		word,
		type,
		definition,
		example,
	};
};
