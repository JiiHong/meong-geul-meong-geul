'use client';

import Image from 'next/image';
import UserDropdown from './UserDropdown';
import { useState } from 'react';
import { defaultUserImage } from '@/constants/image';

export default function UserLoginImage() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => setIsActive((active) => !active);

  return (
    <div className="relative">
      <button className="p-[0.125rem] bg-pofile-border rounded-full">
        <Image
          src={defaultUserImage}
          alt={'user'}
          width={45}
          height={45}
          className="rounded-full cursor-pointer p-[0.15rem] bg-white"
          onClick={handleClick}
        />
      </button>
      {isActive && <UserDropdown isActive={isActive} onClick={handleClick} />}
    </div>
  );
}
