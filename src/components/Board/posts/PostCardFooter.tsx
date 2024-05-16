import IconThumbsup from '../../ui/icons/IconThumbsup';
import IconComment from '../../ui/icons/IconComment';
import IconEye from '../../ui/icons/IconEye';

type Props = {
  recommendCount: number;
  commentCount: number;
  viewCount: number;
};

export default function PostCardFooter({
  recommendCount,
  commentCount,
  viewCount,
}: Props) {
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
