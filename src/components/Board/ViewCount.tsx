'use client';

import { BoardCategory } from '@/types/board';
import useComments from '@/hooks/useComments';
import IconComment from '@/components/ui/IconComment';
import IconHeart from '@/components/ui/IconHeart';

type Props = {
  postId: string;
  category: BoardCategory;
};

export default function ViewCount({ postId, category }: Props) {
  const {
    commentQuery: { data: comments },
  } = useComments(postId, category);

  return (
    <div className="flex items-center gap-0.5 pb-4 border-b">
      {comments && (
        <>
          <IconHeart />
          <span className="mr-2">{0}</span>
          <IconComment />
          <span>{comments.length}</span>
        </>
      )}
    </div>
  );
}
