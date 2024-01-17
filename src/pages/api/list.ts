import { connectDB } from '@/utils/database';
import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'GET') {
    const db: Db = (await connectDB).db(process.env.DB_NAME);
    const result = await db
      .collection(process.env.COLLECTION_NAME ?? '')
      .find()
      .toArray();
    return response.status(200).json(result);
  }
};

export default handler;
