import axios from 'axios';

export const client = axios.create({
  baseURL:
    'https://xw1t98pkkf.execute-api.ap-northeast-2.amazonaws.com/default/',
});

export const searchWord = async (word: string) => {
  try {
    const response = await client.get('/searchNaverDictionary', {
      params: {
        key: word,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
