import { Board } from '@/types/board';
import IconComment from '@/components/ui/IconComment';
import IconHeart from '@/components/ui/IconHeart';
import UserImage from '@/components/ui/UserImage';
import IconReply from '@/components/ui/IconReply';

type Props = {
  post: Board;
};

export default function BoardDetailComments({ post }: Props) {
  const { likeCount, commentCount } = post;

  return (
    <section className="flex flex-col gap-4 p-8 mt-8 rounded-3xl bg-white">
      <div className="flex items-center gap-0.5">
        <IconHeart />
        <span className="mr-2">{likeCount}</span>
        <IconComment />
        <span>{commentCount}</span>
      </div>
      <form className="flex">
        <input
          type="text"
          placeholder="댓글을 입력해주세요."
          className="px-4 py-2 grow border rounded-l-md outline-none"
        />
        <button className="px-4 py-2 text-gray-50 rounded-r-md bg-gray-600">
          등록
        </button>
      </form>
      <ul>
        <li className="p-4 space-y-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <UserImage title="d" userImage="/profile.jpg" />
            <span className="font-semibold">ekfjdl</span>
            <span className="text-xs text-gray-400">2024-04-24 14:30</span>
          </div>
          <p className="text-sm">배고파 배고파 배고파 배고파</p>
          <div className="flex items-center gap-2 text-sm text-amber-500 hover:brightness-125">
            <IconReply />
            <button className="">답글 달기</button>
          </div>
        </li>
      </ul>
    </section>
  );
}
