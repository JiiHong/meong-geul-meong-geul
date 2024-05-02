'use client';

import { Board, BoardCategory } from '@/types/board';
import useComments from '@/hooks/useComments';
import IconComment from '@/components/ui/IconComment';
import IconHeart from '@/components/ui/IconHeart';
import CommentForm from './CommentForm';
import Comment from './Comment';

type Props = {
  post: Board;
  category: BoardCategory;
};

export default function BoardDetailComments({ post, category }: Props) {
  const { id, likeCount, commentCount } = post;
  const {
    commentQuery: { data: comments },
  } = useComments(id, category);

  return (
    <section className="flex flex-col gap-4 p-8 mt-8 rounded-3xl bg-white">
      <div className="flex items-center gap-0.5">
        <IconHeart />
        <span className="mr-2">{likeCount}</span>
        <IconComment />
        <span>{commentCount}</span>
      </div>
      <CommentForm postId={id} category={category} />
      <ul>
        {comments && (
          <Comment
            postId={id}
            comments={comments}
            category={category}
            replyId={null}
          />
        )}
      </ul>
    </section>
  );
}
