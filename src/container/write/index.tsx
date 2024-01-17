const Write = () => {
  return (
    <div>
      <h4>글작성</h4>
      {/* /api/test 이 url로 post 요청이 감 */}
      <form action="/api/list" method="GET">
        <button type="submit">모든 문서 가져오기 버튼</button>
      </form>
      <form action="/api/time" method="GET">
        <button type="submit">현재시간 버튼</button>
      </form>
      <form action="/api/article" method="POST">
        <input type="title" name="title" placeholder="제목" />
        <input type="content" name="content" placeholder="내용" />
        <button type="submit">글 발행</button>
      </form>
    </div>
  );
};

export default Write;
