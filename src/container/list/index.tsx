import { Article } from '@/types/article';
import { connectDB } from '@/utils/database';
import { Db } from 'mongodb';
import Link from 'next/link';
import DetailLink from './DetailLink';
import ListItem from './ListItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const List = async () => {
  // DB 연결
  const db: Db = (await connectDB).db(process.env.DB_NAME);
  // DB에서 모든 article 가져오기 (find)
  const result: Article[] = (await db
    .collection('post')
    .find()
    .toArray()) as Article[];
  const session = await getServerSession(authOptions);

  return (
    <div className="list-bg">
      {/* 객체를 props로 넘겨주기 위해 직렬화 */}
      <ListItem
        result={JSON.stringify(result)}
        session={JSON.stringify(session)}
      />
    </div>
  );
};

export default List;
