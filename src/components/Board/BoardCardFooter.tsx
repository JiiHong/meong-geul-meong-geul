import { Board } from '@/types/board';
import IconHeart from '../ui/IconHeart';
import IconComment from '../ui/IconComment';

type Props = Pick<Board, 'likeCount' | 'commentCount'>;

export default function BoardCardFooter({ likeCount, commentCount }: Props) {
  return (
    <div className="flex items-center gap-3 px-2">
      <div className="flex items-center gap-0.5">
        <IconHeart />
        <span className="text-xs">{likeCount}</span>
      </div>
      <div className="flex items-center gap-0.5">
        <IconComment />
        <span className="text-xs">{commentCount}</span>
      </div>
    </div>
  );
}
