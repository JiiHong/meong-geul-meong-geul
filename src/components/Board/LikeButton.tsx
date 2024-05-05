'use client';

import {
  fetchLikePostId,
  increaseLikeCount,
  uploadLikePostId,
} from '@/service/firebase/firebase-firestore';
import IconHeart from '../ui/IconHeart';
import { useUserContext } from '@/context/UserContext';
import { BoardCategory } from '@/types/board';

type Props = { postId: string; likeCount: number; category: BoardCategory };

export default function LikeButton({ postId, likeCount, category }: Props) {
  const { user } = useUserContext();

  const handleClick = () => {
    if (!user) return alert('로그인이 필요한 서비스입니다.');

    fetchLikePostId(user.id, postId) //
      .then((id) => {
        if (id) return alert('이미 좋아요를 누른 글입니다.');
        increaseLikeCount(postId, category, likeCount);
        uploadLikePostId(user.id, postId);
      });
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 border border-gray-400 rounded-md transition-all hover:bg-gray-50"
    >
      <IconHeart className="text-2xl" />
      <span className="text-gray-800">{likeCount}</span>
    </button>
  );
}
