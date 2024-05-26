import { headers } from 'next/headers';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { authOptions } from '@/next-auth/options';
import { BoardCategory } from '@/types/Post';
import PostDetailContent from '@/components/Board/postDetail/PostDetailContent';
import PostDetailComments from '@/components/Board/postDetail/PostDetailComments';
import { fetchPost } from '@/service/firebase/firebase-firestore';
import { getServerSession } from 'next-auth';

export default async function PostDetail() {
  const session = await getServerSession(authOptions);
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
        <PostDetailContent
          category={category}
          uid={(session && session.user.uid) ?? ''}
          postId={id}
          session={session}
        />
      </HydrationBoundary>
      <PostDetailComments post={post} category={category} />
    </>
  );
}
