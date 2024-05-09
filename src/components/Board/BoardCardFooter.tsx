import { BoardCategory } from '@/types/board';
import useComments from '@/hooks/useComments';
import IconThumbsup from '../ui/IconThumbsup';
import IconComment from '../ui/IconComment';
import IconEye from '../ui/IconEye';

type Props = {
  category: BoardCategory;
  id: string;
  recommendCount: number;
  viewCount: number;
};

export default function BoardCardFooter({
  category,
  id,
  recommendCount,
  viewCount,
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
      <div className="flex justify-end items-center grow gap-0.5">
        <IconEye className="text-lg text-gray-300" />
        <span className="text-xs text-gray-300">{viewCount}</span>
      </div>
    </div>
  );
}
