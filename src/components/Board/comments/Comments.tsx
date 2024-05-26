'use client';

import useComments from '@/hooks/useComments';
import Comment from './Comment';
import { BoardCategory } from '@/types/Post';

type Props = {
  isAdmin: boolean;
  postId: string;
  category: BoardCategory;
};

export default function Comments({ isAdmin, postId, category }: Props) {
  const {
    commentQuery: { data: comments },
  } = useComments(postId, category);

  return (
    <ul>
      {comments && comments.length > 0 && (
        <Comment
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
