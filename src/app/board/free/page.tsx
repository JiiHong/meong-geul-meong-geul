import { Metadata } from 'next';
import BoardTitle from '@/components/Board/BoardTitle';
import Board from '@/components/Board/Board';

export const metadata: Metadata = {
  title: '자유게시판',
  description: '자유롭게 이야기하는 자유게시판.',
};

type Props = { searchParams: { page: string | undefined } };

export default async function FreeBoardPage({ searchParams: { page } }: Props) {
  return (
    <main>
      <BoardTitle text="자유게시판" />
      <Board page={page} />
    </main>
  );
}
