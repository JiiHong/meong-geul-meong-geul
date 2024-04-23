import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchPosts,
  uploadPost as sendPost,
} from '@/service/firebase/firebase-firestore';
import { Board, BoardCategory } from '@/types/board';

type MutationType = {
  id: string;
  newPost: Board;
  contentImage?: string;
};

export default function usePost(category: BoardCategory) {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ['board', category],
    queryFn: () => fetchPosts(category),
  });

  const uploadPost = useMutation({
    mutationFn: ({ id, newPost, contentImage }: MutationType) =>
      sendPost(id, category, { ...newPost, contentImage }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['board', category] }),
  });

  return { postQuery, uploadPost };
}