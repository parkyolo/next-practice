import { connectDB } from '@/utils/database';
import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    try {
      if (request.body.title === '') {
        return response.status(500).json('제목 없음');
      } else if (request.body.content === '') {
        return response.status(500).json('내용 없음');
      }
      const db: Db = (await connectDB).db(process.env.DB_NAME);
      await db
        .collection(process.env.COLLECTION_NAME ?? '')
        .insertOne(request.body);
      return response.redirect(302, '/list');
    } catch (error) {
      return response.status(500).json('에러가 있어..');
    }
  }
};

export default handler;
