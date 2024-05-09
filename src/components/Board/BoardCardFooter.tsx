import { BoardCategory } from '@/types/board';
import IconThumbsup from '../ui/IconThumbsup';
import IconComment from '../ui/IconComment';
import useComments from '@/hooks/useComments';

type Props = { category: BoardCategory; id: string; recommendCount: number };

export default function BoardCardFooter({
  category,
  id,
  recommendCount,
}: Props) {
  const {
    commentQuery: { data: comments },
  } = useComments(id, category);
  const commentCount = comments ? comments.length : 0;

  return (
    <div className="flex items-center gap-3 px-2">
      <div className="flex items-center gap-0.5">
        <IconThumbsup className="text-sky-800" />
        <span className="text-xs  text-sky-800">{recommendCount}</span>
      </div>
      <div className="flex items-center gap-0.5">
        <IconComment className="text-lg text-orange-600" />
        <span className="text-xs text-orange-600">{commentCount}</span>
      </div>
    </div>
  );
}
