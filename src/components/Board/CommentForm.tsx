'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useUserContext } from '@/context/UserContext';
import { BoardCategory } from '@/types/board';
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
  const [content, setContent] = useState('');
  const { uploadComment } = useComments(postId, category);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return alert('로그인이 필요한 서비스입니다.');
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
      { postId, id, category, newComment },
      {
        onSuccess: () => setContent(''),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={content}
        placeholder="댓글을 입력해주세요."
        onChange={handleChange}
        className="px-4 py-2 grow border rounded-l-md outline-none"
      />
      <button className="px-4 py-2 text-gray-50 rounded-r-md bg-gray-600">
        등록
      </button>
    </form>
  );
}
