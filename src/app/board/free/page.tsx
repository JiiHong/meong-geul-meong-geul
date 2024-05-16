import BoardTitle from '@/components/Board/BoardTitle';
import Board from '@/components/Board/Board';

type Props = { searchParams: { page: string | undefined } };

export default async function FreeBoardPage({ searchParams: { page } }: Props) {
  return (
    <main>
      <BoardTitle text="자유게시판" />
      <Board page={page} />
    </main>
  );
}
