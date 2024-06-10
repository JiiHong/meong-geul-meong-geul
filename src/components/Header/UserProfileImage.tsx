'use client';

import { useState } from 'react';
import { UserSession } from '@/types/user';
import UserDropdown from './UserDropdown';
import UserImage from '../ui/UserImage';
import SignupModal from '../AuthModal/SignupModal';

type Props = { user: UserSession; name?: string; image?: string };

export default function UserLoginImage({ user, name, image }: Props) {
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
      {user && !user.name && <SignupModal uid={user.uid} />}
    </div>
  );
}
