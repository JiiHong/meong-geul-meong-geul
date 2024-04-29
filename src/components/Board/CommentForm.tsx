'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useUserContext } from '@/context/UserContext';
import { BoardCategory } from '@/types/board';
import { Comment } from '@/types/comment';
import { uploadComment } from '@/service/firebase/firebase-firestore';
import { createTime } from '@/utils/day';

type Props = { postId: string; category: BoardCategory };

export default function CommentForm({ postId, category }: Props) {
  const { user } = useUserContext();
  const [content, setContent] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return alert('로그인이 필요한 서비스입니다.');
    const id = uuid();
    const { name, uid } = user;
    const comment: Comment = {
      id,
      level: 0,
      content,
      name,
      uid,
      createdAt: createTime(),
    };
    uploadComment(postId, id, category, comment);
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
