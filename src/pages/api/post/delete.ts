import { connectDB } from '@/utils/database';
import { Db, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Article } from '@/types/article';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (typeof request.query.id === 'string') {
    const session = await getServerSession(request, response, authOptions);

    const db: Db = (await connectDB).db(process.env.DB_NAME);
    const one = (await db
      .collection('post')
      .findOne({ _id: new ObjectId(request.query.id) })) as Article;

    if (one.author !== undefined && one.author === session?.user.email) {
      await db
        .collection(process.env.COLLECTION_NAME ?? '')
        .deleteOne({ _id: new ObjectId(request.query.id) });
      return response.redirect(302, '/list');
    } else {
      return response.status(500).json('현재유저와 작성자 불일치');
    }
  }
};

export default handler;
