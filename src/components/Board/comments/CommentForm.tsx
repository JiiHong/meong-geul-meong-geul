'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useUserContext } from '@/context/UserContext';
import { useModalContext } from '@/context/ModalContext';
import { BoardCategory } from '@/types/Post';
import { Comment } from '@/types/comment';
import useComments from '@/hooks/useComments';
import { createTime } from '@/utils/day';

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
    if (!user.name) return alert('마이페이지에서 닉네임을 등록해주세요.');
    if (content.trim().length < 1) {
      setContent('');
      return alert('내용을 입력해주세요.');
    }
    setIsLoading((prev) => !prev);
    const id = uuid();
    const { name, uid } = user;
    const comment: Comment = {
      id,
      replyId: null,
      level: 0,
      content,
      name,
      uid,
      createdAt: createTime(),
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
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={content}
        min={1}
        placeholder="댓글을 입력해주세요."
        onChange={handleChange}
        className="px-4 py-2 grow border rounded-l-md outline-none"
      />
      <button
        disabled={isLoading}
        className="px-4 py-2 text-gray-50 rounded-r-md bg-gray-600 hover:brightness-110"
      >
        등록
      </button>
    </form>
  );
}
