'use client';

import Pagination from '@/components/Board/Pagination';
import PostCard from '@/components/Board/posts/PostCard';
import UseMyPagePost from '@/hooks/useMyPagePost';

type Props = {
  uid: string;
  type: 'recommendPosts' | 'commentPosts';
  page: string;
};

export default function MyPagePosts({ uid, type, page }: Props) {
  const {
    myPagePostQuery: { data: posts },
  } = UseMyPagePost(uid, type);
  const currentPage = page && parseInt(page) > 0 ? parseInt(page) : 1;
  const itemCountPerPage = 12;
  const pageCount = 5;
  const startIndex = currentPage * itemCountPerPage - itemCountPerPage;

  return (
    <>
      {posts && (
        <>
          <ul className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {posts
              .slice(startIndex, startIndex + itemCountPerPage)
              .map((post) => (
                <li
                  key={post.id}
                  className="h-64 border shadow-base rounded-2xl bg-white transition-all hover:-translate-y-2"
                >
                  <PostCard post={post} category={post.category} />
                </li>
              ))}
          </ul>
          <Pagination
            totalItems={posts.length}
            currentPage={currentPage}
            itemCountPerPage={itemCountPerPage}
            pageCount={pageCount}
          />
        </>
      )}
    </>
  );
}
