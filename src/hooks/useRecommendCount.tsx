import { useMutation, useQueryClient } from '@tanstack/react-query';
import { increaseRecommendCount as upRecommendCount } from '@/service/firebase/firebase-firestore';
import { BoardCategory } from '@/types/Post';

type Props = {
  postId: string;
  category: BoardCategory;
  recommendCount: number;
};

export default function useRecommendCount({
  postId,
  category,
  recommendCount,
}: Props) {
  const queryClient = useQueryClient();

  const increaseRecommendCount = useMutation({
    mutationFn: () => upRecommendCount(postId, category, recommendCount),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', category, postId],
      });
    },
  });
  return { increaseRecommendCount };
}
