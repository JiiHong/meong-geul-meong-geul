'use client';

import { useUserContext } from '@/context/UserContext';
import useLikeCount from '@/hooks/useLikeCount';
import { BoardCategory } from '@/types/board';
import IconThumbsup from '../ui/IconThumbsup';
import {
  fetchLikePostId,
  uploadLikePostId,
} from '@/service/firebase/firebase-firestore';

type Props = { postId: string; likeCount: number; category: BoardCategory };

export default function RecommendButton({
  postId,
  likeCount,
  category,
}: Props) {
  const { user } = useUserContext();
  const { increaseLikeCount } = useLikeCount({ postId, category, likeCount });

  const handleClick = () => {
    if (!user) return alert('로그인이 필요한 서비스입니다.');
    fetchLikePostId(user.id, postId) //
      .then((id) => {
        if (id) return alert('이미 추천한 글입니다.');
        increaseLikeCount.mutate(undefined, {
          onSuccess: () => uploadLikePostId(user.id, postId),
        });
      });
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 border border-gray-400 rounded-md transition-all hover:bg-gray-50"
    >
      <IconThumbsup className="text-2xl text-gray-700" />
      <span className="text-sky-800">{likeCount}</span>
    </button>
  );
}
