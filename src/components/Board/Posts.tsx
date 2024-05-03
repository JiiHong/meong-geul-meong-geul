'use client';

import BoardCard from '@/components/Board/BoardCard';
import { usePathname } from 'next/navigation';

import { BoardCategory } from '@/types/board';
import usePosts from '@/hooks/usePosts';

export default function Posts() {
  const path = usePathname();
  const category = path.split('/')[2] as BoardCategory;

  const {
    postsQuery: { data: boards },
  } = usePosts(category);

  return (
    <ul className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 py-8">
      {boards &&
        boards.map((board) => (
          <li
            key={board.id}
            className="h-64 border shadow-base rounded-2xl bg-white transition-all hover:-translate-y-2"
          >
            <BoardCard board={board} category={category} />
          </li>
        ))}
    </ul>
  );
}
