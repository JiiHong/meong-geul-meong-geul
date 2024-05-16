import { Board } from '@/types/board';
import { formateAgo } from '@/utils/day';
import UserImage from '../../ui/UserImage';

type Props = Pick<Board, 'name' | 'title' | 'createdAt' | 'userImage'>;

export default function PostCardHeader({
  name,
  title,
  createdAt,
  userImage,
}: Props) {
  return (
    <div className="flex justify-between items-center px-2">
      <div className="flex items-center gap-1 shrink-0">
        <UserImage title={title} userImage={userImage} />
        <span className="font-semibold">{name}</span>
      </div>
      <span className="text-xs text-gray-300">{formateAgo(createdAt)}</span>
    </div>
  );
}
