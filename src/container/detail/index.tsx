import { Article } from '@/types/article';
import { ArticleProps } from '@/types/props';
import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';

const Detail = async (props: ArticleProps) => {
  // DB 연결
  let db = (await connectDB).db('forum');
  // DB에서 id에 해당하는 하나의 article 가져오기 (findOne)
  let result = (await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) })) as Article;

  return (
    <div>
      <h4>상세페이지임</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  );
};

export default Detail;
