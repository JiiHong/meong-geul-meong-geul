import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { headers } from 'next/headers';
import { BoardCategory } from '@/types/board';
import { fetchPosts } from '@/service/firebase/firebase-firestore';
import Posts from '@/components/Board/Posts';
import PopularPosts from '@/components/Board/PopularPosts';
import WriteButton from '@/components/Board/WriteButton';

export default async function Board() {
  const queryClient = new QueryClient();

  const headersList = headers();
  const path = headersList.get('x-pathname') || '';
  const category = path.split('/')[2] as BoardCategory;

  const posts = await queryClient.fetchQuery({
    queryKey: ['board', category],
    queryFn: () => fetchPosts(category),
  });

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PopularPosts posts={posts} category={category} />
        <Posts />
      </HydrationBoundary>
      <WriteButton />
    </section>
  );
}
