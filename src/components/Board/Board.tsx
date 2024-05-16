import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { headers } from 'next/headers';
import { BoardCategory } from '@/types/Post';
import { fetchPosts } from '@/service/firebase/firebase-firestore';
import Posts from '@/components/Board/posts/Posts';
import PopularPosts from '@/components/Board/popularPosts/PopularPosts';
import WriteButton from '@/components/Board/write/WriteButton';

type Props = { page: string | undefined };

export default async function Board({ page }: Props) {
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
        <Posts category={category} page={page} />
      </HydrationBoundary>
      <WriteButton />
    </section>
  );
}
