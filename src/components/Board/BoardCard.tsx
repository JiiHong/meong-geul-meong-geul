'use client';

import Link from 'next/link';
import { Board, BoardCategory } from '@/types/board';
import BoardCardHeader from './BoardCardHeader';
import BoardCardContent from './BoardCardContent';
import BoardCardFooter from './BoardCardFooter';

type Props = {
  board: Board;
  category: BoardCategory;
};

export default function BoardCard({ board, category }: Props) {
  const {
    id,
    name,
    title,
    content,
    contentImage,
    userImage,
    likeCount,
    commentCount,
    createdAt,
  } = board;

  const handleClick = () => {};

  return (
    <article onClick={handleClick} className="w-full h-full">
      <Link
        href={`/board/${category}/${id}`}
        className="flex flex-col w-full h-full py-3"
      >
        <BoardCardHeader
          name={name}
          title={title}
          createdAt={createdAt}
          userImage={userImage}
        />
        <BoardCardContent
          title={title}
          content={content}
          contentImage={contentImage}
        />
        <BoardCardFooter likeCount={likeCount} commentCount={commentCount} />
      </Link>
    </article>
  );
}
