'use client';

import Image from 'next/image';
import { useUserContext } from '@/context/UserContext';

export default function UserImage() {
  const { user } = useUserContext();

  return (
    <div>
      {user && (
        <Image
          src={user.photoURL}
          alt={user.displayName}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
}
