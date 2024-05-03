import { Board, BoardCategory } from '@/types/board';
import IconComment from '@/components/ui/IconComment';
import IconHeart from '@/components/ui/IconHeart';
import CommentForm from './CommentForm';
import Comments from './Comments';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchComments } from '@/service/firebase/firebase-firestore';

type Props = {
  post: Board;
  category: BoardCategory;
};

export default async function BoardDetailComments({ post, category }: Props) {
  const { id, likeCount, commentCount } = post;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['comment', id],
    queryFn: () => fetchComments(id, category),
  });

  return (
    <section className="flex flex-col gap-4 p-8 mt-8 rounded-3xl bg-white">
      <div className="flex items-center gap-0.5">
        <IconHeart />
        <span className="mr-2">{likeCount}</span>
        <IconComment />
        <span>{commentCount}</span>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Comments postId={id} category={category} />
        <CommentForm postId={id} category={category} />
      </HydrationBoundary>
    </section>
  );
}
