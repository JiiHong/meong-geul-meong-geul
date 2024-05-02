import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BoardCategory } from '@/types/board';
import { Comment } from '@/types/comment';
import {
  fetchComments,
  uploadComment as sendComment,
} from '@/service/firebase/firebase-firestore';

type MutationType = {
  postId: string;
  id: string;
  category: BoardCategory;
  newComment: Comment;
};

export default function useComments(postId: string, category: BoardCategory) {
  const queryClient = useQueryClient();
  const commentQuery = useQuery({
    queryKey: ['comment', postId],
    queryFn: () => fetchComments(postId, category),
    staleTime: 1000 * 60 * 3,
  });

  const uploadComment = useMutation({
    mutationFn: ({ postId, id, category, newComment }: MutationType) =>
      sendComment(postId, id, category, newComment),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['comment', postId] }),
  });

  return { commentQuery, uploadComment };
}
