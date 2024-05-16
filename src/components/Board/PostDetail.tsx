import { headers } from 'next/headers';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { BoardCategory } from '@/types/board';
import PostDetailContent from '@/components/Board/PostDetailContent';
import PostDetailComments from '@/components/Board/PostDetailComments';
import { fetchPost } from '@/service/firebase/firebase-firestore';

export default async function PostDetail() {
  const headersList = headers();
  const path = (headersList.get('x-pathname') || '').split('/');
  const category = path[2] as BoardCategory;
  const id = path[3];

  const queryClient = new QueryClient();

  const post = await queryClient.fetchQuery({
    queryKey: ['board', category, id],
    queryFn: () => fetchPost(category, id),
  });

  if (!post) return notFound();

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostDetailContent postId={id} category={category} />
      </HydrationBoundary>
      <PostDetailComments post={post} category={category} />
    </>
  );
}
