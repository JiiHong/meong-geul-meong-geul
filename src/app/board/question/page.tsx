import { Metadata } from 'next';
import Board from '@/components/Board/Board';
import BoardTitle from '@/components/Board/BoardTitle';

export const metadata: Metadata = {
  title: '질문게시판',
  description: '모르는 내용을 질문하는 질문게시판',
};

type Props = { searchParams: { page: string | undefined } };

export default function QuestionBoardPage({ searchParams: { page } }: Props) {
  return (
    <main>
      <BoardTitle text="질문게시판" />
      <Board page={page} />
    </main>
  );
}
