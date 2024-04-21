import { headers } from 'next/headers';
import WriteButton from '@/components/Board/WriteButton';
import BoardCard from '@/components/Board/BoardCard';
import { fetchPosts } from '@/service/firebase/firebase-firestore';

export default async function FreeBoardPage() {
  const headersList = headers();
  const path = headersList.get('x-pathname') || '';
  const category = path.split('/')[2];

  const boards = await fetchPosts(category);

  return (
    <section>
      <ul className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 py-8">
        {boards &&
          boards.map((board) => (
            <li
              key={board.id}
              className="h-64 border shadow-base rounded-2xl bg-white transition-all hover:-translate-y-2"
            >
              <BoardCard board={board} />
            </li>
          ))}
      </ul>
      <WriteButton />
    </section>
  );
}
