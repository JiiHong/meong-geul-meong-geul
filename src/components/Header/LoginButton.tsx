'use client';

import { useModalContext } from '@/context/ModalContext';
import LoginModal from '../AuthModal/LoingModal';

export default function LoginButton() {
  const { loginOpen, toggleLoginOpen } = useModalContext();

  return (
    <>
      <button
        className="px-4 py-2 text-base text-white font-bold rounded-3xl bg-gray-800 transition-all hover:-translate-y-1 hover:bg-gray-900 hover:brightness-120"
        onClick={toggleLoginOpen}
      >
        로그인
      </button>
      {loginOpen && <LoginModal onClick={toggleLoginOpen} />}
    </>
  );
}
