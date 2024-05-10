import Board from '@/components/Board/Board';
import BoardTitle from '@/components/Board/BoardTitle';

export default function QuestionBoardPage() {
  return (
    <main>
      <BoardTitle text="질문게시판" />
      <Board />
    </main>
  );
}
