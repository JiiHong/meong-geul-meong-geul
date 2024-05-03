'use client';

import { BoardCategory } from '@/types/board';
import { Comment as CommentType } from '@/types/comment';
import CommentForm from './CommentForm';
import React, { useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import { formateFullTime } from '@/utils/day';
import UserImage from '../ui/UserImage';
import IconClose from '../ui/IconClose';
import IconReply from '../ui/IconReply';

const PADDING_BY_LEVEL: { [key: number]: string } = {
  0: 'pl-0',
  1: 'pl-8',
  2: 'pl-16',
  3: 'pl-24',
  4: 'pl-32',
};

type Props = {
  postId: string;
  comments: CommentType[];
  category: BoardCategory;
  replyId: string | null;
};

export default function Comment({
  postId,
  replyId,
  comments,
  category,
}: Props) {
  const { user } = useUserContext();
  const filterdComments = comments.filter(
    (comment) => comment.replyId === replyId,
  );
  if (filterdComments.length === 0) return;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <>
      {filterdComments.map(
        ({ id, uid, name, level, content, userImage, createdAt }) => (
          <React.Fragment key={id}>
            <li className={`p-4 ${PADDING_BY_LEVEL[level]} space-y-2 border-b`}>
              <div className="flex items-center gap-2">
                <UserImage title={name} userImage={userImage ?? undefined} />
                <span className="font-semibold">ekfjdl</span>
                <span className="text-xs text-gray-400">
                  {formateFullTime(createdAt)}
                </span>
                {user?.uid === uid &&
                  !comments.find((comment) => comment.replyId === id) && (
                    <button>
                      <IconClose />
                    </button>
                  )}
              </div>
              <p className="text-sm">{content}</p>
              {level < 4 && (
                <button
                  onClick={handleClick}
                  className="flex items-center gap-2 text-sm text-amber-500 hover:brightness-125"
                >
                  <IconReply />
                  {`${isOpen ? '닫기' : '답글 달기'}`}
                </button>
              )}
              {isOpen && (
                <CommentForm
                  postId={postId}
                  replyId={id}
                  level={level}
                  category={category}
                />
              )}
            </li>
            <Comment
              postId={postId}
              replyId={id}
              comments={comments}
              category={category}
            />
          </React.Fragment>
        ),
      )}
    </>
  );
}
