'use client';

import Link from 'next/link';
import { Article } from '@/types/article';

const ListItem = (props: { result: string }) => {
  const result = JSON.parse(props.result);
  return (
    <div>
      {result.map((value: Article) => {
        const { _id, title, content } = value;
        const id: string = _id.toString();

        return (
          <div className="list-item" key={id}>
            <Link href={`/detail/${id}`}>{title}</Link>
            <Link href={`/edit/${id}`} className="list-btn">
              ✏️
            </Link>
            <button
              onClick={() => {
                fetch('/api/post/delete', {
                  method: 'DELETE',
                  body: id,
                }).then(() => {
                  console.log('삭제 완료');
                });
              }}
            >
              🗑️
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ListItem;
