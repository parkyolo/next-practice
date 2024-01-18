import { connectDB } from '@/utils/database';
import { Db, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'DELETE') {
    console.log(request.body);
    const db: Db = (await connectDB).db(process.env.DB_NAME);
    await db
      .collection(process.env.COLLECTION_NAME ?? '')
      .deleteOne({ _id: new ObjectId(request.body) });
    return response.redirect(302, '/list');
  }
};

export default handler;
