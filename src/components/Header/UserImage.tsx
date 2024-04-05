'use client';

import { useUserContext } from '@/context/UserContext';
import Image from 'next/image';
import UserDropdown from './UserDropdown';
import { useState } from 'react';

export default function UserImage() {
  const { user } = useUserContext();
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => setIsActive((active) => !active);

  return (
    <div className="relative p-[0.125rem] bg-pofile-border rounded-full">
      {user && (
        <Image
          src={user.picture!}
          alt={user.name}
          width={45}
          height={45}
          className="rounded-full cursor-pointer p-[0.15rem] bg-white"
          onClick={handleClick}
        />
      )}
      {isActive && <UserDropdown isActive={isActive} />}
    </div>
  );
}
