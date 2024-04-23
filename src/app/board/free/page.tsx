import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { headers } from 'next/headers';
import WriteButton from '@/components/Board/WriteButton';
import { fetchPosts } from '@/service/firebase/firebase-firestore';
import Posts from '@/components/Board/Posts';
import BoardTitle from '@/components/Board/BoardTitle';

export default async function FreeBoardPage() {
  const headersList = headers();
  const path = headersList.get('x-pathname') || '';
  const category = path.split('/')[2];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['board', category],
    queryFn: () => fetchPosts(category),
  });

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BoardTitle text="자유게시판" />
        <Posts />
      </HydrationBoundary>
      <WriteButton />
    </section>
  );
}
