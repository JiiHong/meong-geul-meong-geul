'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ddong from '../../public/ddong.png';

export default function Error() {
  const router = useRouter();

  const handleClick = () => router.replace('/');

  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={ddong}
        alt="Not Found"
        priority
        className="object-contain w-2/3 min-w-[22rem] max-w-[30.5rem] h-2/3 min-h-[22rem] max-h-[30.5rem]"
      ></Image>
      <div className="flex flex-col justify-center text-center">
        <p className="sm:text-3xl md:text-4xl text-5xl text-amber-600 font-bold">
          Poops! 500
        </p>
        <p className="mt-4 mb-2 sm:text-xs md:text-sm text-lg text-gray-700">
          에러가 났어요!
        </p>
        <button
          className="px-4 py-2 sm:text-xs md:text-xs text-white rounded-lg bg-amber-600 hover:brightness-105"
          onClick={handleClick}
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
