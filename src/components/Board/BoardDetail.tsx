import { headers } from 'next/headers';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { BoardCategory } from '@/types/board';
import BoardDetailContent from '@/components/Board/BoardDetailContent';
import BoardDetailComments from '@/components/Board/BoardDetailComments';
import { fetchPost } from '@/service/firebase/firebase-firestore';

export default async function BoardDetail() {
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
      {post && (
        <>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <BoardDetailContent postId={id} category={category} />
          </HydrationBoundary>
          <BoardDetailComments post={post} category={category} />
        </>
      )}
    </>
  );
}
