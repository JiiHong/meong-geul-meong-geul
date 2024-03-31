'use client';

import { useRouter } from 'next/navigation';
import CloseButton from '@/components/Header/CloseButton';
import GoogleLoginButton from '@/components/Header/GoogleLoginButton';

export default function LoginModal() {
  const router = useRouter();

  const handleClick = () => router.back();

  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen bg-[#00000066]">
      <div className="flex flex-col items-center w-3/5 min-w-72 max-w-xl h-3/5 rounded-2xl bg-white">
        <CloseButton onClick={handleClick} />
        <p className="text-3xl font-bold tracking-widest">멍글멍글</p>
        <div className="flex justify-center items-center grow">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
