import { useMutation, useQueryClient } from '@tanstack/react-query';
import { increaseLikeCount as upLikeCount } from '@/service/firebase/firebase-firestore';
import { BoardCategory } from '@/types/board';

type Props = {
  postId: string;
  category: BoardCategory;
  likeCount: number;
};

export default function useLikeCount({ postId, category, likeCount }: Props) {
  const queryClient = useQueryClient();

  const increaseLikeCount = useMutation({
    mutationFn: () => upLikeCount(postId, category, likeCount),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', category, postId],
      });
      console.log('aaa');
    },
  });
  return { increaseLikeCount };
}
