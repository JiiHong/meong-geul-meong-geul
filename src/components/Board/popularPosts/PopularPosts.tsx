'use client';

import { Post, BoardCategory } from '@/types/Post';
import PopularPostCard from '@/components/Board/popularPosts/PopularPostCard';
import usePosts from '@/hooks/usePosts';

type Props = { posts: Post[]; category: BoardCategory };

export default function PopularPosts({ category }: Props) {
  const {
    postsQuery: { data: posts },
  } = usePosts(category);

  const popularPosts = posts
    ? [...posts].sort((a, b) => b.recommendCount - a.recommendCount).slice(0, 5)
    : [];

  return (
    <section className="mt-4">
      <h2 className="px-2 sm:text-base md:text-lg text-xl font-bold">
        {translateTitle(category)}
      </h2>
      <ul className="flex gap-8 px-2 pb-4 mt-2 overflow-x-auto">
        {popularPosts.map((post) => (
          <PopularPostCard key={post.id} post={post} category={category} />
        ))}
      </ul>
    </section>
  );
}

function translateTitle(category: BoardCategory) {
  switch (category) {
    case 'question':
      return '인기 Q&A';
    case 'info':
      return 'Best 정보';
    case 'free':
      return '인기 글';
    default:
      return '인기 글';
  }
}
