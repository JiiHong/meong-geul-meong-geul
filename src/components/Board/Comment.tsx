'use client';

import { useState } from 'react';
import UserImage from '@/components/ui/UserImage';
import IconReply from '@/components/ui/IconReply';
import { BoardCategory } from '@/types/board';
import { Comment as CommentType } from '@/types/comment';
import { formateFullTime } from '@/utils/day';
import CommentForm from './CommentForm';

type Props = { comment: CommentType; category: BoardCategory };

export default function Comment({ comment, category }: Props) {
  const { id, name, content, userImage, createdAt } = comment;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <li className="p-4 space-y-2 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <UserImage title={name} userImage={userImage ?? undefined} />
        <span className="font-semibold">ekfjdl</span>
        <span className="text-xs text-gray-400">
          {formateFullTime(createdAt)}
        </span>
      </div>
      <p className="text-sm">{content}</p>
      <div className="flex items-center gap-2 text-sm text-amber-500 hover:brightness-125">
        <IconReply />
        <button
          onClick={handleClick}
        >{`${isOpen ? '닫기' : '답글 달기'}`}</button>
      </div>
      {isOpen && (
        <div className="p-6 bg-gray-50 rounded-md">
          <CommentForm category={category} postId={id} />
        </div>
      )}
    </li>
  );
}
