'use client';

import { Session } from 'next-auth';
import { IoMenu } from 'react-icons/io5';
import { useState } from 'react';
import MobileAside from './MobileAside';

type Props = { session: Session | null };

export default function MobileMenu({ session }: Props) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => setIsOpenMenu((prev) => !prev);

  return (
    <div className="hidden md:flex z-20">
      <button
        className={`text-3xl after:fixed after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:transition-all after:duration-500 ${isOpenMenu ? 'after:visible after:opacity-30' : 'after:invisible after:opacity-0'}`}
        onClick={handleClick}
      >
        <IoMenu />
      </button>
      <MobileAside
        session={session}
        isOpenMenu={isOpenMenu}
        onClick={handleClick}
      />
    </div>
  );
}
