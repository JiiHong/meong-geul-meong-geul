'use client';

import { IoMenu } from 'react-icons/io5';
import { useState } from 'react';
import MobileAside from './MobileAside';

export default function MobileMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => setIsOpenMenu((prev) => !prev);

  return (
    <div className="hidden lg:flex">
      <button
        className={`text-3xl after:fixed after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:transition-all after:duration-500 ${isOpenMenu ? 'after:visible after:opacity-30' : 'after:invisible after:opacity-0'}`}
        onClick={handleClick}
      >
        <IoMenu />
      </button>
      <MobileAside isOpenMenu={isOpenMenu} onClick={handleClick} />
    </div>
  );
}
