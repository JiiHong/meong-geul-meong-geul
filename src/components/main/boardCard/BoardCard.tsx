import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Link from 'next/link';
import { BoardCategory } from '@/types/Post';
import { fetchPosts } from '@/service/firebase/firebase-firestore';
import BoardList from './BoardList';

type Props = { category: BoardCategory; title: string; calssName?: string };

export default async function BoardCard({ category, title, calssName }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['board', category],
    queryFn: () => fetchPosts(category),
  });

  return (
    <article
      className={`grow basis-1 p-4 space-y-3 rounded-xl shadow-base transition-all hover:scale-105 ${calssName}`}
    >
      <div className="flex justify-between items-center">
        <span className="md:text-sm text-md font-semibold">{title}</span>
        <Link
          href={`/board/${category}`}
          className="md:text-xs text-sm text-gray-600 font-semibold"
        >
          더보기
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BoardList category={category} />
      </HydrationBoundary>
    </article>
  );
}
