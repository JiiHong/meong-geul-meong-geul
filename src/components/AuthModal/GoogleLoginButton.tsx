'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleLoginButton() {
  const handleClick = () => {
    signIn('google');
  };

  return (
    <button
      className="flex justify-center items-center gap-2 px-14 py-2 border border-gray-300 rounded-full -translate-y-10 md:px-10 hover:border-blue-100 hover:bg-blue-50"
      onClick={handleClick}
    >
      <FcGoogle className="text-2xl md:text-lg" />
      <p className="text-lg text-gray-700 md:text-xs">Google 계정으로 로그인</p>
    </button>
  );
}
