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
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내가 쓴 글',
  description: '내가 작성한 글 목록.',
};

type Props = { searchParams: { page: string } };

export default async function MyPostPage({ searchParams: { page } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['myPage', 'myPosts'],
    queryFn: () => fetchMyPagePosts(session.user.uid, 'myPosts'),
  });

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyPagePosts uid={session.user.uid} type={'myPosts'} page={page} />
      </HydrationBoundary>
    </section>
  );
}
