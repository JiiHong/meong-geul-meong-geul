'use client';

import React from 'react';
import { BoardCategory } from '@/types/board';
import { Comment as CommentType } from '@/types/comment';
import { useUserContext } from '@/context/UserContext';
import { formateFullTime } from '@/utils/day';
import useComments from '@/hooks/useComments';
import UserImage from '../ui/UserImage';
import IconClose from '../ui/IconClose';
import Replybutton from './Replybutton';

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
  const { deleteComment } = useComments(postId, category);
  const filterdComments = comments.filter(
    (comment) => comment.replyId === replyId,
  );

  if (filterdComments.length === 0) return;

  const handleDeleteClick = (id: string) => {
    const isDelete = confirm('댓글을 삭제하시겠습니까?');
    if (isDelete) return deleteComment.mutate({ id });
    return;
  };

  return (
    <>
      {filterdComments.map(
        ({ id, uid, name, level, content, userImage, createdAt }) => (
          <React.Fragment key={id}>
            <li className={`p-4 ${PADDING_BY_LEVEL[level]} space-y-2 border-b`}>
              <div className="flex items-center gap-2">
                <UserImage title={name} userImage={userImage ?? undefined} />
                <span className="font-semibold">{name}</span>
                <span className="text-xs text-gray-400">
                  {formateFullTime(createdAt)}
                </span>
                {user?.uid === uid &&
                  !comments.find((comment) => comment.replyId === id) && (
                    <button
                      onClick={() => handleDeleteClick(id)}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      <IconClose />
                    </button>
                  )}
              </div>
              <p className="text-sm">{content}</p>
              {level < 4 && (
                <Replybutton
                  postId={postId}
                  id={id}
                  category={category}
                  level={level}
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
