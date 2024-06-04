import axios from 'axios';

export const client = axios.create({
	baseURL:
		'https://38sx10es71.execute-api.ap-northeast-2.amazonaws.com/default',
});
export const searchWord = async (wordId: string) => {
	try {
		const response = await client.get(`/searchCamDictionary`, {
			params: {
				q: wordId,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
