import { getServerSession } from 'next-auth';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Post, BoardCategory } from '@/types/Post';
import { authOptions } from '@/next-auth/options';
import { fetchComments } from '@/service/firebase/firebase-firestore';
import ViewCount from '../ViewCount';
import Comments from '../comments/Comments';
import CommentForm from '../comments/CommentForm';

type Props = {
  post: Post;
  category: BoardCategory;
};

export default async function PostDetailComments({ post, category }: Props) {
  const session = await getServerSession(authOptions);
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
        <Comments
          session={session}
          postId={id}
          category={category}
          isAdmin={session?.user.isAdmin ?? false}
        />
        <CommentForm session={session} postId={id} category={category} />
      </HydrationBoundary>
    </section>
  );
}
