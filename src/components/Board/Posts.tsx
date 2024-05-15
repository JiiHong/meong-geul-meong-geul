'use client';

import usePosts from '@/hooks/usePosts';
import BoardCard from '@/components/Board/BoardCard';
import { BoardCategory } from '@/types/board';
import Pagination from './Pagination';

type Props = { category: BoardCategory; page: string | undefined };

export default function Posts({ category, page }: Props) {
  const currentPage = page && parseInt(page) > 0 ? parseInt(page) : 1;
  const itemCountPerPage = 12;
  const pageCount = 5;
  const startIndex = currentPage * itemCountPerPage - itemCountPerPage;

  const {
    postsQuery: { data: boards },
  } = usePosts(category);

  return (
    <>
      {boards && (
        <>
          <ul className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 py-8">
            {boards
              .slice(startIndex, startIndex + itemCountPerPage)
              .map((board) => (
                <li
                  key={board.id}
                  className="h-64 border shadow-base rounded-2xl bg-white transition-all hover:-translate-y-2"
                >
                  <BoardCard board={board} category={category} />
                </li>
              ))}
          </ul>
          <Pagination
            totalItems={boards.length}
            currentPage={currentPage}
            itemCountPerPage={itemCountPerPage}
            pageCount={pageCount}
            category={category}
          />
        </>
      )}
    </>
  );
}
