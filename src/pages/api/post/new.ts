import { connectDB } from '@/utils/database';
import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    try {
      const session = await getServerSession(request, response, authOptions);
      console.log(session);

      if (session) {
        request.body.author = session.user.email;
        // console.log(request.body);
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
      }
    } catch (error) {
      return response.status(500).json('에러가 있어..');
    }
  }
};

export default handler;
