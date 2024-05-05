'use client';

import { useState } from 'react';
import IconReply from '../ui/IconReply';
import { BoardCategory } from '@/types/board';
import CommentForm from './CommentForm';

type Props = {
  postId: string;
  id: string;
  category: BoardCategory;
  level: number;
};

export default function Replybutton({ postId, id, category, level }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen((prev) => !prev);
  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 text-sm text-amber-500 hover:brightness-125"
      >
        <IconReply />
        {`${isOpen ? '닫기' : '답글 달기'}`}
      </button>
      {isOpen && (
        <CommentForm
          postId={postId}
          replyId={id}
          level={level}
          category={category}
        />
      )}
    </>
  );
}
