import { NextApiRequest, NextApiResponse } from 'next';

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'GET') {
    const today = new Date();
    const year = today.getFullYear(); // 년도
    const month = today.getMonth() + 1; // 월
    const date = today.getDate(); // 날짜

    const hours = today.getHours(); // 시
    const minutes = today.getMinutes(); // 분
    const seconds = today.getSeconds(); // 초
    return response
      .status(200)
      .json(
        year +
          '년' +
          month +
          '월' +
          date +
          '일 ' +
          hours +
          '시' +
          minutes +
          '분' +
          seconds +
          '초'
      );
  }
};

export default handler;
