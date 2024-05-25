'use client';

import { useRouter } from 'next/navigation';
import { PiPencilSimpleLine } from 'react-icons/pi';
import { BoardCategory } from '@/types/Post';
import { useUserContext } from '@/context/UserContext';
import { useModalContext } from '@/context/ModalContext';

type Props = { category: BoardCategory };

export default function WriteButton({ category }: Props) {
  const { user } = useUserContext();
  const { toggleLoginOpen } = useModalContext();
  const router = useRouter();

  const handleClick = () => {
    if (!user) return toggleLoginOpen();
    router.push(`/write/${category}`);
  };

  return (
    <div className="fixed bottom-10 right-5 text-2xl text-white rounded-full bg-gray-800 transition-all hover:scale-110 hover:brightness-125">
      <button className="block w-full h-full p-2" onClick={handleClick}>
        <PiPencilSimpleLine />
      </button>
    </div>
  );
}
