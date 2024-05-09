import { BoardCategory } from '@/types/board';
import IconThumbsup from '../ui/IconThumbsup';
import IconComment from '../ui/IconComment';
import useComments from '@/hooks/useComments';

type Props = { category: BoardCategory; id: string; likeCount: number };

export default function BoardCardFooter({ category, id, likeCount }: Props) {
  const {
    commentQuery: { data: comments },
  } = useComments(id, category);
  const commentCount = comments ? comments.length : 0;

  return (
    <div className="flex items-center gap-3 px-2">
      <div className="flex items-center gap-0.5">
        <IconThumbsup className="text-lg" />
        <span className="text-xs">{likeCount}</span>
      </div>
      <div className="flex items-center gap-0.5">
        <IconComment />
        <span className="text-xs">{commentCount}</span>
      </div>
    </div>
  );
}
