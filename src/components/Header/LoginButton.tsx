'use client';

import { useModalContext } from '@/context/ModalContext';

export default function LoginButton() {
  const { toggleLoginOpen } = useModalContext();

  return (
    <button
      className="px-4 py-2 text-base text-white font-bold rounded-3xl bg-gray-800 hover:bg-gray-900 hover:brightness-120"
      onClick={toggleLoginOpen}
    >
      로그인
    </button>
  );
}
