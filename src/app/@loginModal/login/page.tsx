'use client';

import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
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
          <button className="flex justify-center items-center gap-2 px-14 py-2 border border-gray-300 rounded-full md:px-10 hover:border-blue-100 hover:bg-blue-50">
            <FcGoogle className="text-2xl md:text-lg" />
            <p className="text-lg text-gray-700 md:text-xs">
              Google 계정으로 로그인
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
