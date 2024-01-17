import { Article } from '@/types/article';
import { ArticleProps } from '@/types/props';
import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';

const Edit = async (props: ArticleProps) => {
  console.log('id', props.params.id);
  let db = (await connectDB).db(process.env.DB_NAME);
  // DB에서 id에 해당하는 하나의 article 가져오기 (findOne)
  let result = (await db
    .collection(process.env.COLLECTION_NAME ?? '')
    .findOne({ _id: new ObjectId(props.params.id) })) as Article;
  console.log('result', result);
  return (
    <div className="p-20">
      <h4>수정페이지</h4>
      <form action="/api/article/edit" method="POST">
        <input type="hidden" name="_id" defaultValue={result._id.toString()} />
        <input name="title" defaultValue={result.title} />
        <input name="content" defaultValue={result.content} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default Edit;
