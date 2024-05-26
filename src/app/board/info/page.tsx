import { Metadata } from 'next';
import Board from '@/components/Board/Board';
import BoardTitle from '@/components/Board/BoardTitle';

export const metadata: Metadata = {
  title: '정보게시판',
  description: '유용한 정보를 공유하는 정보게시판.',
};

type Props = { searchParams: { page: string | undefined } };

export default function InfoBoardPage({ searchParams: { page } }: Props) {
  return (
    <main>
      <BoardTitle text="정보게시판" />
      <Board page={page} />
    </main>
  );
}
