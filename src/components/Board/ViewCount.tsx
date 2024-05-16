'use client';

import { BoardCategory } from '@/types/Post';
import useComments from '@/hooks/useComments';
import IconComment from '@/components/ui/icons/IconComment';

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
          <IconComment className="text-lg" />
          <span>{comments.length}</span>
        </>
      )}
    </div>
  );
}
