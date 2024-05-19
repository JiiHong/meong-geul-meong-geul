'use client';

import { useUserContext } from '@/context/UserContext';
import useRecommendCount from '@/hooks/useRecommendCount';
import { BoardCategory } from '@/types/Post';
import IconThumbsup from '../ui/icons/IconThumbsup';
import {
  fetchRecommendPostsId,
  uploadRecommendPostId,
} from '@/service/firebase/firebase-firestore';

type Props = {
  postId: string;
  recommendCount: number;
  category: BoardCategory;
};

export default function RecommendButton({
  postId,
  recommendCount,
  category,
}: Props) {
  const { user } = useUserContext();
  const { increaseRecommendCount } = useRecommendCount({
    postId,
    category,
    recommendCount,
  });

  const handleClick = () => {
    if (!user) return alert('로그인이 필요한 서비스입니다.');
    fetchRecommendPostsId(user.uid) //
      .then((ids) => {
        const isExist = ids.find((id) => id === postId);
        if (isExist) return alert('이미 추천한 글입니다.');
        increaseRecommendCount.mutate(undefined, {
          onSuccess: () => uploadRecommendPostId(user.uid, postId),
        });
      });
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 border border-gray-400 rounded-md transition-all hover:bg-gray-50"
    >
      <IconThumbsup className="text-2xl text-gray-700" />
      <span className="text-sky-800">{recommendCount}</span>
    </button>
  );
}
