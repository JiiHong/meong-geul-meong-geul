import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { headers } from 'next/headers';
import WriteButton from '@/components/Board/WriteButton';
import { fetchPosts } from '@/service/firebase/firebase-firestore';
import Posts from '@/components/Board/Posts';

export default async function Board() {
  const headersList = headers();
  const path = headersList.get('x-pathname') || '';
  const category = path.split('/')[2];
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ['board', category],
    queryFn: () => fetchPosts(category),
  });

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
      <WriteButton />
    </section>
  );
}
