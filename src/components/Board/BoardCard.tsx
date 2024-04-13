import Link from 'next/link';
import { IoIosHeartEmpty } from 'react-icons/io';
import { LiaCommentDotsSolid } from 'react-icons/lia';
import { Board } from '@/types/board';
import BoardCardHeader from './BoardCardHeader';
import BoardCardContent from './BoardCardContent';

type Props = {
  board: Board;
};

export default function BoardCard({ board }: Props) {
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

  return (
    <article className="w-full h-full">
      <Link
        href={`/board/info/${id}`}
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
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center gap-0.5">
            <IoIosHeartEmpty className="text-lg text-red-500 hover:scale-110" />
            <span className="text-xs">{likeCount}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <LiaCommentDotsSolid className="text-lg" />
            <span className="text-xs">{commentCount}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
