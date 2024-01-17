'use client';

import { useRouter } from 'next/navigation';

const DetailLink = (props: { id: string }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(`detail/${props.id}`)}>버튼</button>
  );
};
export default DetailLink;
