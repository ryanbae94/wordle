import axios from 'axios';

export const client = axios.create({
  baseURL:
    'https://6y75w55p2f.execute-api.ap-northeast-2.amazonaws.com/default',
});
export const searchWord = async (wordId: string) => {
  try {
    const response = await client.get(`/searchOxfordDictionary`, {
      params: {
        word_id: wordId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
