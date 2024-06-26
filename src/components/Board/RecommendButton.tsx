'use client';

import { useUserContext } from '@/context/UserContext';
import { useModalContext } from '@/context/ModalContext';
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
  const { toggleLoginOpen } = useModalContext();
  const { increaseRecommendCount } = useRecommendCount({
    postId,
    category,
    recommendCount,
  });

  const handleClick = () => {
    if (!user) return toggleLoginOpen();
    fetchRecommendPostsId(user.uid) //
      .then((ids) => {
        const isExist = ids.find((id) => id === postId);
        if (isExist) return window.alert('이미 추천한 글입니다.');
        increaseRecommendCount.mutate(undefined, {
          onSuccess: () => {
            uploadRecommendPostId(user.uid, postId);
            window.alert('추천했습니다!');
          },
        });
      });
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 border border-gray-400 rounded-md transition-all hover:bg-gray-50"
    >
      <IconThumbsup className="sm:text-lg md:text-xl text-2xl text-gray-700" />
      <span className="sm:text-xs md:text-sm text-sky-800">
        {recommendCount}
      </span>
    </button>
  );
}
