'use client';

import usePosts from '@/hooks/usePosts';
import { BoardCategory } from '@/types/Post';
import Link from 'next/link';

type Props = { category: BoardCategory };

export default function BoardList({ category }: Props) {
  const {
    postsQuery: { data: posts },
  } = usePosts(category);

  return (
    <ul className="space-y-1">
      {posts &&
        posts.slice(0, 5).map(({ id, title }) => (
          <li
            key={id}
            className="sm:text-xs md:text-sm text-sm text-gray-700 truncate"
          >
            <Link
              href={`/board/${category}/${id}`}
              className="hover:border-b hover:border-gray-700"
            >
              {title}
            </Link>
          </li>
        ))}
    </ul>
  );
}
