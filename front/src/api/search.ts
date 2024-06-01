import axios from 'axios';

export const client = axios.create({
  //   baseURL: 'https://openapi.naver.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*/*',
    'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET,
  },
});

export const searchWord = async (word: string) => {
  try {
    const response = await client.get('/v1/search/encyc.json', {
      params: {
        query: word,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
