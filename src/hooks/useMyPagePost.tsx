import { useQuery } from '@tanstack/react-query';
import { fetchMyPagePosts } from '@/service/firebase/firebase-firestore';

export default function UseMyPagePost(
  uid: string,
  type: 'recommendPosts' | 'commentPosts',
) {
  const myPagePostQuery = useQuery({
    queryKey: ['myPage', type],
    queryFn: () => fetchMyPagePosts(uid, type),
    staleTime: 1000 * 60 * 3,
  });
  return { myPagePostQuery };
}
