import { BoardCategory } from '@/types/board';
import usePost from '@/hooks/usePost';
import { useRouter } from 'next/navigation';

type Props = { isActive: boolean; category: BoardCategory; id: string };

export default function PostDetailDropdown({ isActive, category, id }: Props) {
  const router = useRouter();
  const { deletePost } = usePost(category, id);

  const handleClick = () =>
    deletePost.mutate(undefined, {
      onSuccess: () => router.replace(`/board/${category}`),
    });

  return (
    <ul
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-20 py-2 mt-2 border rounded-md shadow-md bg-white ${isActive ? 'flex flex-col items-center gap-2' : 'hidden'}`}
    >
      <li className="text-sm w-full">
        <button
          onClick={handleClick}
          disabled={deletePost.isPending}
          className="block w-full py-1 hover:bg-gray-300"
        >
          삭제
        </button>
      </li>
    </ul>
  );
}
