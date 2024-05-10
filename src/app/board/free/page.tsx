import BoardTitle from '@/components/Board/BoardTitle';
import Board from '@/components/Board/Board';

export default async function FreeBoardPage() {
  return (
    <main>
      <BoardTitle text="자유게시판" />
      <Board />
    </main>
  );
}
