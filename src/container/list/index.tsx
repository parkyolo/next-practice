import { Article } from '@/types/article';
import { connectDB } from '@/utils/database';
import { Db } from 'mongodb';
import Link from 'next/link';
import DetailLink from './DetailLink';

const List = async () => {
  // DB 연결
  const db: Db = (await connectDB).db(process.env.DB_NAME);
  // DB에서 모든 article 가져오기 (find)
  const result: Article[] = (await db
    .collection('post')
    .find()
    .toArray()) as Article[];

  return (
    <div className="list-bg">
      {result.map((value: Article) => {
        const { _id, title, content } = value;
        const id: string = _id.toString();

        return (
          <div className="list-item" key={id}>
            <DetailLink id={id} />
            <Link href={`/detail/${id}`}></Link>
            <Link href={`/edit/${id}`} className="list-btn">
              ✏️
            </Link>
            <h4>{title}</h4>
            <p>{content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
