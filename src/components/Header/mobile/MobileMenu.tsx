'use client';

import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { UserSession } from '@/types/user';
import MobileAside from './MobileAside';

type Props = { user: UserSession | null };

export default function MobileMenu({ user }: Props) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => setIsOpenMenu((prev) => !prev);

  return (
    <>
      <button
        className={`text-3xl after:fixed after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:transition-all after:duration-500 ${isOpenMenu ? 'after:visible after:opacity-30' : 'after:invisible after:opacity-0'}`}
        onClick={handleClick}
      >
        <IoMenu />
      </button>
      <MobileAside user={user} isOpenMenu={isOpenMenu} onClick={handleClick} />
    </>
  );
}
