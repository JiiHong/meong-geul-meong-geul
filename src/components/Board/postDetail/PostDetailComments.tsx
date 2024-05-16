import { Post, BoardCategory } from '@/types/Post';
import CommentForm from '../comments/CommentForm';
import Comments from '../comments/Comments';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchComments } from '@/service/firebase/firebase-firestore';
import ViewCount from '../ViewCount';

type Props = {
  post: Post;
  category: BoardCategory;
};

export default async function PostDetailComments({ post, category }: Props) {
  const { id } = post;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['comment', id],
    queryFn: () => fetchComments(id, category),
  });

  return (
    <section className="flex flex-col gap-4 p-8 mt-8 rounded-3xl bg-white">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ViewCount postId={id} category={category} />
        <Comments postId={id} category={category} />
        <CommentForm postId={id} category={category} />
      </HydrationBoundary>
    </section>
  );
}