import Link from 'next/link';
import { Post, BoardCategory } from '@/types/Post';
import UserImage from '../../ui/UserImage';

type Props = { post: Post; category: BoardCategory };

export default function PopularPostCard({ post, category }: Props) {
  const { id, name, title, content, userImage, recommendCount, commentCount } =
    post;

  return (
    <li className="w-56 md:w-44 h-32 rounded-2xl shadow-base bg-orange-gradient flex-shrink-0">
      <Link
        href={`${category}/${id}`}
        className="flex flex-col w-full h-full p-4"
      >
        <div className="flex items-center gap-1 pb-1">
          <UserImage userImage={userImage} title={name} />
          <span className="sm:text-xs md:text-sm font-bold">{name}</span>
        </div>
        <p className="sm:text-xs md:text-sm font-semibold truncate">{title}</p>
        <p className="grow sm:text-[0.6rem] md:text-[0.65rem] text-xs py-1 truncate">
          {content}
        </p>
        <div className="flex items-center gap-2 sm:text-[0.6rem] md:text-[0.65rem] text-xs text-gray-400">
          <span>추천 {recommendCount}</span>
          <span>댓글 {commentCount}</span>
        </div>
      </Link>
    </li>
  );
}
