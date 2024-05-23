'use client';

import { useState } from 'react';
import UserDropdown from './UserDropdown';
import UserImage from '../ui/UserImage';

type Props = { name?: string; image?: string };

export default function UserLoginImage({ name, image }: Props) {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive((active) => !active);

  return (
    <div className="relative">
      <button
        className="p-0.5 bg-pofile-border rounded-full"
        onClick={handleClick}
      >
        <UserImage title={name ?? 'user'} userImage={image} size="medium" />
      </button>
      {isActive && <UserDropdown isActive={isActive} onClick={handleClick} />}
    </div>
  );
}
