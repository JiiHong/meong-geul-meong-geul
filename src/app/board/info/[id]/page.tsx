import { Metadata } from 'next';
import PostDetail from '@/components/Board/postDetail/PostDetail';
import { fetchPostsFromPostId } from '@/service/firebase/firebase-firestore';

type Props = {
  params: {
    id: string;
  };
};

export default async function InfoBoardDetailPage() {
  return (
    <main className="pt-8">
      <PostDetail />
    </main>
  );
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const post = await fetchPostsFromPostId('info', id);
  return {
    title: post[0].title,
    description: post[0].content,
  };
}
