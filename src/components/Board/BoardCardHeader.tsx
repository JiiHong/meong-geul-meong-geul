import Image from 'next/image';
import { Board } from '@/types/board';
import { defaultUserImage } from '@/constants/image';
import { formateAgo } from '@/utils/day';

type Props = Pick<Board, 'name' | 'title' | 'createdAt' | 'userImage'>;

export default function BoardCardHeader({
  name,
  title,
  createdAt,
  userImage,
}: Props) {
  return (
    <div className="flex justify-between items-center px-2">
      <div className="flex items-center gap-1 shrink-0">
        <Image
          src={userImage ?? defaultUserImage}
          alt={title}
          width={25}
          height={25}
          className="rounded-full"
        />
        <span className="font-semibold">{name}</span>
      </div>
      <span className="text-xs text-gray-300">{formateAgo(createdAt)}</span>
    </div>
  );
}
