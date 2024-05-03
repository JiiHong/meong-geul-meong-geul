import { headers } from 'next/headers';
import { BoardCategory } from '@/types/board';
import BoardDetailContent from '@/components/Board/BoardDetailContent';
import BoardDetailComments from '@/components/Board/BoardDetailComments';
import usePost from '@/hooks/usePost';

export default async function FreeBoardDetailPage() {
  const headersList = headers();
  const path = (headersList.get('x-pathname') || '').split('/');
  const category = path[2] as BoardCategory;
  const id = path[3];

  const {
    postQuery: { data: post },
  } = usePost(category, id);

  return (
    <main className="pt-8">
      {post && (
        <>
          <BoardDetailContent post={post} />
          <BoardDetailComments post={post} category={category} />
        </>
      )}
    </main>
  );
}
