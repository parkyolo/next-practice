'use client';

import Link from 'next/link';
import { Article } from '@/types/article';

const ListItem = (props: { result: string; session: string }) => {
  const result = JSON.parse(props.result);
  const session = JSON.parse(props.session);
  console.log('session', session);
  console.log('not session', !session);

  return (
    <div>
      {result.map((value: Article) => {
        const { _id, title, content, author } = value;
        const id: string = _id.toString();

        return (
          <div className="list-item " key={id}>
            <Link href={`/detail/${id}`}>{title}</Link>
            {!session || session?.user.email !== author ? (
              <></>
            ) : (
              <>
                <Link href={`/edit/${id}`} className="list-btn">
                  ✏️
                </Link>
                <button
                  onClick={(e) => {
                    fetch(`/api/post/delete?id=${id}`).then(() => {
                      const eventTarget = e.target as HTMLElement;
                      const parentElement =
                        eventTarget.parentElement as HTMLButtonElement;
                      // 상위 요소(글 박스)의 opacity를 0으로
                      parentElement.style.opacity = '0';
                      // 1초 후(opacity가 0이 된 후) 상위 요소의 display를 none으로
                      setTimeout(
                        () => (parentElement.style.display = 'none'),
                        1000
                      );
                    });
                  }}
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListItem;
