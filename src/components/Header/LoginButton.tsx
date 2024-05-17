'use client';

import { useState } from 'react';
import LoginModal from '../AuthModal/LoingModal';

export default function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <>
      <button
        className="px-4 py-2 text-base text-white font-bold rounded-3xl bg-gray-800 transition-all hover:-translate-y-1 hover:bg-gray-900 hover:brightness-120"
        onClick={handleClick}
      >
        로그인
      </button>
      {isOpen && <LoginModal onClick={handleClick} />}
    </>
  );
}
