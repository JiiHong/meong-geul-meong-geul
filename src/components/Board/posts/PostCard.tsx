'use client';

import Link from 'next/link';
import { Post, BoardCategory } from '@/types/Post';
import PostCardHeader from './PostCardHeader';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import { increaseViewCount } from '@/service/firebase/firebase-firestore';

type Props = {
  post: Post;
  category: BoardCategory;
};

export default function PostCard({ post, category }: Props) {
  const {
    id,
    name,
    title,
    content,
    contentImage,
    userImage,
    recommendCount,
    commentCount,
    viewCount,
    createdAt,
  } = post;

  const handleClick = () => increaseViewCount(id, category, viewCount);

  return (
    <article onClick={handleClick} className="w-full h-full">
      <Link
        href={`/board/${category}/${id}`}
        className="flex flex-col w-full h-full py-3"
      >
        <PostCardHeader
          name={name}
          title={title}
          createdAt={createdAt}
          userImage={userImage}
        />
        <PostCardContent
          title={title}
          content={content}
          contentImage={contentImage}
        />
        <PostCardFooter
          recommendCount={recommendCount}
          commentCount={commentCount}
          viewCount={viewCount}
        />
      </Link>
    </article>
  );
}
