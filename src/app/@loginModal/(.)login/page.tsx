'use client';

import GoogleLoginButton from '@/components/Header/GoogleLoginButton';
import { useRouter } from 'next/navigation';
import { IoCloseOutline } from 'react-icons/io5';

export default function LoginModalPage() {
  const router = useRouter();
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen bg-[#00000066]">
      <div className="flex flex-col items-center w-3/5 min-w-72 max-w-xl h-3/5 rounded-2xl bg-white">
        <button
          className="self-end m-2 text-gray-600 rounded-full hover:bg-gray-200"
          onClick={() => router.back()}
        >
          <IoCloseOutline className="w-10 h-10" />
        </button>
        <div className="flex justify-center items-center grow">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
