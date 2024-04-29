import { Board, BoardCategory } from '@/types/board';
import IconComment from '@/components/ui/IconComment';
import IconHeart from '@/components/ui/IconHeart';
import CommentForm from './CommentForm';
import { fetchComments } from '@/service/firebase/firebase-firestore';
import Comment from './Comment';

type Props = {
  post: Board;
  category: BoardCategory;
};

export default async function BoardDetailComments({ post, category }: Props) {
  const { id, likeCount, commentCount } = post;
  const comments = await fetchComments(id, category);

  return (
    <section className="flex flex-col gap-4 p-8 mt-8 rounded-3xl bg-white">
      <div className="flex items-center gap-0.5">
        <IconHeart />
        <span className="mr-2">{likeCount}</span>
        <IconComment />
        <span>{commentCount}</span>
      </div>
      <CommentForm postId={post.id} category={category} />
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </section>
  );
}
