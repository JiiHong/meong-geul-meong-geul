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
    <div className="relative">
      {user && (
        <Image
          src={user.photoURL}
          alt={user.displayName}
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          onClick={handleClick}
        />
      )}
      {isActive && <UserDropdown isActive={isActive} />}
    </div>
  );
}
