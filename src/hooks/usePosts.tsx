import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchPosts,
  uploadPost as sendPost,
} from '@/service/firebase/firebase-firestore';
import { Post, BoardCategory } from '@/types/Post';

type MutationType = {
  uid: string;
  id: string;
  newPost: Post;
  contentImage?: string;
};

export default function usePosts(category: BoardCategory) {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ['board', category],
    queryFn: () => fetchPosts(category),
    staleTime: 1000 * 60 * 3,
  });

  const uploadPost = useMutation({
    mutationFn: ({ uid, id, newPost, contentImage }: MutationType) => {
      const prop = contentImage ? { ...newPost, contentImage } : { ...newPost };
      return sendPost(uid, id, category, prop);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', category] });
      queryClient.invalidateQueries({ queryKey: ['myPage', 'myPosts'] });
    },
  });

  return { postsQuery, uploadPost };
}
