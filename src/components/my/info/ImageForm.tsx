'use client';

import { ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { UserSession } from '@/types/user';
import { uploadProfileImage } from '@/service/firebase/firebase-storage';
import {
  deleteProfileImageUrl,
  updateProfileImageUrl,
} from '@/service/firebase/firebase-firestore';
import UserImage from '@/components/ui/UserImage';

type Props = { user: UserSession };

export default function ImageForm({ user }: Props) {
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      uploadProfileImage(files[0], user.email)
        .then((url) => updateProfileImageUrl(user.uid, url))
        .then(router.refresh);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteProfileImageUrl(user.uid).then(router.refresh);
  };

  return (
    <form className="flex items-center gap-4" onSubmit={handleSubmit}>
      <UserImage title="profile" userImage={user.profileImage} size="big" />
      <label
        htmlFor="file"
        className="px-4 py-2 text-gray-100 rounded-md bg-gray-700 cursor-pointer"
      >
        이미지 변경
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      {user.profileImage && (
        <button className="px-4 py-2 text-gray-100 rounded-md bg-rose-600 cursor-pointer">
          삭제
        </button>
      )}
    </form>
  );
}
