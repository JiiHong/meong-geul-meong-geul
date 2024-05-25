import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { authOptions } from '@/next-auth/options';
import { fetchMyPagePosts } from '@/service/firebase/firebase-firestore';
import MyPagePosts from '@/components/my/posts/MyPagePosts';

type Props = { searchParams: { page: string } };

export default async function RecommendedPage({
  searchParams: { page },
}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['myPage', 'recommendPosts'],
    queryFn: () => fetchMyPagePosts(session.user.uid, 'recommendPosts'),
  });

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyPagePosts
          uid={session.user.uid}
          type={'recommendPosts'}
          page={page}
        />
      </HydrationBoundary>
    </section>
  );
}
