'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { createTime } from '@/utils/day';
import { useUserContext } from '@/context/UserContext';
import { useModalContext } from '@/context/ModalContext';
import { BoardCategory } from '@/types/Post';
import { Comment } from '@/types/comment';
import useComments from '@/hooks/useComments';

type Props = {
  postId: string;
  category: BoardCategory;
  replyId?: string;
  level?: number;
};

export default function CommentForm({
  postId,
  category,
  replyId,
  level,
}: Props) {
  const { user } = useUserContext();
  const { toggleLoginOpen } = useModalContext();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { uploadComment } = useComments(postId, category);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toggleLoginOpen();
    if (content.trim().length < 1) {
      setContent('');
      return alert('내용을 입력해주세요.');
    }
    setIsLoading((prev) => !prev);
    const id = uuid();
    const { name, uid, profileImage } = user;
    const comment: Comment = {
      id,
      postId,
      replyId: null,
      level: 0,
      content,
      name: name ?? '',
      uid,
      category,
      createdAt: createTime(),
      userImage: profileImage,
    };
    const newComment = replyId
      ? { ...comment, replyId, level: level! + 1 }
      : comment;

    uploadComment.mutate(
      { uid, postId, id, category, newComment },
      {
        onSuccess: () => {
          setContent('');
          setIsLoading((prev) => !prev);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <input
        type="text"
        value={content}
        min={1}
        placeholder="댓글을 입력해주세요."
        onChange={handleChange}
        className="grow w-full md:px-3 px-4 md:py-1 py-2 sm:text-sm md:text-base text-lg border border-r-0 rounded-l-md outline-none"
      />
      <button
        disabled={isLoading}
        className="sm:px-2 px-4 sm:py-1 py-2 sm:text-xs md:text-sm text-base text-gray-50 whitespace-pre rounded-r-md bg-gray-600 hover:brightness-110"
      >
        등록
      </button>
    </form>
  );
}
