'use client';

import { Session } from 'next-auth';
import useComments from '@/hooks/useComments';
import Comment from './Comment';
import { BoardCategory } from '@/types/Post';

type Props = {
  session: Session | null;
  isAdmin: boolean;
  postId: string;
  category: BoardCategory;
};

export default function Comments({
  session,
  isAdmin,
  postId,
  category,
}: Props) {
  const {
    commentQuery: { data: comments },
  } = useComments(postId, category);

  return (
    <ul>
      {comments && comments.length > 0 && (
        <Comment
          session={session}
          isAdmin={isAdmin}
          postId={postId}
          comments={comments}
          category={category}
          replyId={null}
        />
      )}
    </ul>
  );
}
