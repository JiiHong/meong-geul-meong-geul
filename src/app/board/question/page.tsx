import Board from '@/components/Board/Board';
import BoardTitle from '@/components/Board/BoardTitle';

type Props = { searchParams: { page: string | undefined } };

export default function QuestionBoardPage({ searchParams: { page } }: Props) {
  return (
    <main>
      <BoardTitle text="질문게시판" />
      <Board page={page} />
    </main>
  );
}
