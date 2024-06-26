'use client';

import { useState } from 'react';
import IconReply from '../ui/icons/IconReply';
import { BoardCategory } from '@/types/Post';
import CommentForm from './comments/CommentForm';
import { Session } from 'next-auth';

type Props = {
  session: Session | null;
  postId: string;
  id: string;
  category: BoardCategory;
  level: number;
};

export default function Replybutton({
  session,
  postId,
  id,
  category,
  level,
}: Props) {
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
          session={session}
          postId={postId}
          replyId={id}
          level={level}
          category={category}
        />
      )}
    </>
  );
}
