'use client';

import { useUserContext } from '@/context/UserContext';
import Image from 'next/image';
import UserDropdown from './UserDropdown';
import { useState } from 'react';
import { defaultUserImage } from '@/constants/image';

export default function UserLoginImage() {
  const { user } = useUserContext();
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => setIsActive((active) => !active);

  return (
    <div className="relative p-[0.125rem] bg-pofile-border rounded-full">
      {user && (
        <Image
          src={user.profileImage ?? defaultUserImage}
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
