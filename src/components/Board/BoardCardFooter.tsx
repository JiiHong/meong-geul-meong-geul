import { IoIosHeartEmpty } from 'react-icons/io';
import { LiaCommentDotsSolid } from 'react-icons/lia';
import { Board } from '@/types/board';

type Props = Pick<Board, 'likeCount' | 'commentCount'>;

export default function BoardCardFooter({ likeCount, commentCount }: Props) {
  return (
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
  );
}
