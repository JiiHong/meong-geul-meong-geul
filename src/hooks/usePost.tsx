import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BoardCategory } from '@/types/Post';
import {
  deletePost as removePost,
  fetchPost,
} from '@/service/firebase/firebase-firestore';

export default function usePost(
  category: BoardCategory,
  uid: string,
  id: string,
) {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ['board', category, id],
    queryFn: () => fetchPost(category, id),
    staleTime: 1000 * 60 * 3,
  });

  const deletePost = useMutation({
    mutationFn: () => removePost(category, uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', category] });
      queryClient.invalidateQueries({ queryKey: ['board', category, id] });
      queryClient.invalidateQueries({ queryKey: ['myPage', 'myPosts'] });
    },
  });

  return { postQuery, deletePost };
}
