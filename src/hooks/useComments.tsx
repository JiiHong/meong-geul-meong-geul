import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BoardCategory } from '@/types/board';
import { Comment } from '@/types/comment';
import {
  fetchComments,
  updateCommentCount,
  deleteComment as removeComment,
  uploadComment as sendComment,
} from '@/service/firebase/firebase-firestore';

type MutationType = {
  uid: string;
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
    mutationFn: ({ uid, postId, id, category, newComment }: MutationType) =>
      sendComment(uid, postId, id, category, newComment).then(() =>
        updateCommentCount(postId, category, 1),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', postId] });
      queryClient.invalidateQueries({ queryKey: ['board', category] });
    },
  });

  const deleteComment = useMutation({
    mutationFn: ({ id }: Pick<MutationType, 'id'>) =>
      removeComment(postId, id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', postId] });
      queryClient.invalidateQueries({ queryKey: ['board', category, postId] });
    },
  });

  return { commentQuery, uploadComment, deleteComment };
}
