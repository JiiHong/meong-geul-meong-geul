'use client';

import usePosts from '@/hooks/usePosts';
import PostCard from '@/components/Board/posts/PostCard';
import { BoardCategory } from '@/types/Post';
import Pagination from '../Pagination';

type Props = { category: BoardCategory; page: string | undefined };

export default function Posts({ category, page }: Props) {
  const currentPage = page && parseInt(page) > 0 ? parseInt(page) : 1;
  const itemCountPerPage = 12;
  const pageCount = 5;
  const startIndex = currentPage * itemCountPerPage - itemCountPerPage;

  const {
    postsQuery: { data: posts },
  } = usePosts(category);

  return (
    <>
      {posts && (
        <>
          <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-4 gap-6 py-8 :">
            {posts
              .slice(startIndex, startIndex + itemCountPerPage)
              .map((post) => (
                <li
                  key={post.id}
                  className="h-64 border shadow-base rounded-2xl bg-white transition-all hover:-translate-y-2"
                >
                  <PostCard post={post} category={category} />
                </li>
              ))}
          </ul>
          <Pagination
            totalItems={posts.length}
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
