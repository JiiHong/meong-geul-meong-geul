import { headers } from 'next/headers';
import { fetchPost } from '@/service/firebase/firebase-firestore';
import { BoardCategory } from '@/types/board';
import BoardDetailContent from '@/components/Board/BoardDetailContent';

import BoardDetailComments from '@/components/Board/BoardDetailComments';

export default async function FreeBoardDetailPage() {
  const headersList = headers();
  const path = (headersList.get('x-pathname') || '').split('/');
  const category = path[2] as BoardCategory;
  const id = path[3];
  const post = await fetchPost(category, id);

  return (
    <main className="pt-8">
      <BoardDetailContent post={post} />
      <BoardDetailComments post={post} category={category} />
    </main>
  );
}
