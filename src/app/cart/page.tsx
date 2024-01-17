'use client';

import { ReactElement, useState } from 'react';

// 부모 컴포넌트
export default function Cart() {
  let 장바구니: string[] = ['Tomatos', 'Past'];
  let [count, setCount] = useState([0, 0]);
  const cartItemHTMLElement: ReactElement[] = 장바구니.map(
    (v: string, i: number) => {
      return (
        <div key={i}>
          <p>{v}</p>
          <button
            onClick={() => {
              let copy = [...count];
              copy[i]++;
              setCount(copy);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              let copy = [...count];
              copy[i]--;
              setCount(copy);
            }}
          >
            -
          </button>
          <p>{count[i]}</p>
        </div>
      );
    }
  );
  return <div>{cartItemHTMLElement}</div>;
}
