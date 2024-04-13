import { defaultUserImage } from '@/constants/image';
import { Board } from '@/types/board';
import { formateAgo } from '@/utils/day';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosHeartEmpty } from 'react-icons/io';
import { LiaCommentDotsSolid } from 'react-icons/lia';

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
    <Link href={`/board/info/${id}`} className="block w-full h-full py-4">
      <article className="w-full h-full">
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-1 shrink-0">
            <Image
              src={userImage ?? defaultUserImage}
              alt={title}
              width={25}
              height={30}
              className="rounded-full"
            />
            <span className="font-semibold">{name}</span>
          </div>
          <span className="text-xs text-gray-300">{formateAgo(createdAt)}</span>
        </div>
        <div className="flex flex-col gap-1.5 h-full">
          <p className="px-2 mt-2 text-sm font-semibold">{title}</p>
          <div className="relative w-full h-2/3">
            {contentImage ? (
              <Image
                src={contentImage}
                alt={title}
                fill
                sizes="(max-width: 639px) 45vw, (max-width: 767) 25vw, 20vw"
              />
            ) : (
              <p className="px-2 h-full text-xs break-words">{content}</p>
            )}
          </div>
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
        </div>
      </article>
    </Link>
  );
}
