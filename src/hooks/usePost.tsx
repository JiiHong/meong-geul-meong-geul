import { useQuery } from '@tanstack/react-query';
import { BoardCategory } from '@/types/board';
import { fetchPost } from '@/service/firebase/firebase-firestore';

export default function usePost(category: BoardCategory, id: string) {
  const postQuery = useQuery({
    queryKey: ['board', category, id],
    queryFn: () => fetchPost(category, id),
    staleTime: 1000 * 60 * 3,
  });

  return { postQuery };
}
