import UserImage from '@/components/ui/UserImage';
import IconReply from '@/components/ui/IconReply';
import { Comment as CommentType } from '@/types/comment';
import { formateFullTime } from '@/utils/day';

type Props = { comment: CommentType };

export default function Comment({ comment }: Props) {
  const { name, content, userImage, createdAt } = comment;

  return (
    <li className="p-4 space-y-2 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <UserImage title={name} userImage={userImage ?? undefined} />
        <span className="font-semibold">ekfjdl</span>
        <span className="text-xs text-gray-400">
          {formateFullTime(createdAt)}
        </span>
      </div>
      <p className="text-sm">{content}</p>
      <div className="flex items-center gap-2 text-sm text-amber-500 hover:brightness-125">
        <IconReply />
        <button>답글 달기</button>
      </div>
    </li>
  );
}
