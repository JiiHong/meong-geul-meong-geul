'use client';

import useComments from '@/hooks/useComments';
import Comment from './Comment';
import { BoardCategory } from '@/types/board';

type Props = {
  postId: string;
  category: BoardCategory;
};

export default function Comments({ postId, category }: Props) {
  const {
    commentQuery: { data: comments },
  } = useComments(postId, category);

  return (
    <ul>
      {comments && comments.length > 0 && (
        <Comment
          postId={postId}
          comments={comments}
          category={category}
          replyId={null}
        />
      )}
    </ul>
  );
}
