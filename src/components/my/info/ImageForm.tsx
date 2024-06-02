'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserSession } from '@/types/user';
import { uploadProfileImage } from '@/service/firebase/firebase-storage';
import {
  deleteProfileImageUrl,
  fetchPostsFromUid,
  updateUser,
  updateAllCategoryPost,
  updateUserComments,
} from '@/service/firebase/firebase-firestore';
import UserImage from '@/components/ui/UserImage';
import Loader from '@/components/ui/Loader';

type Props = { user: UserSession };

export default function ImageForm({ user }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      setIsLoading((prev) => !prev);
      const url = await uploadProfileImage(files[0], user.email);

      await Promise.all([
        updateUser(user.uid, 'profileImage', url),
        fetchPostsFromUid('free', user.uid),
        updateAllCategoryPost(user.uid, 'userImage', 'update', url),
        updateUserComments(user.uid, 'update', 'userImage', url),
      ]);

      setIsLoading((prev) => !prev);
      window.alert('이미지가 변경되었습니다. 🙌');

      router.refresh();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await Promise.all([
      deleteProfileImageUrl(user.uid),
      updateAllCategoryPost(user.uid, 'userImage', 'delete'),
      updateUserComments(user.uid, 'delete', 'userImage'),
    ]);

    router.refresh();
  };

  return (
    <form className="flex items-center gap-4" onSubmit={handleSubmit}>
      <UserImage title="profile" userImage={user.profileImage} size="big" />
      <label
        htmlFor="file"
        className={`px-4 py-2 text-gray-100 rounded-md bg-gray-700 ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}
      >
        {isLoading ? <Loader /> : '이미지 변경'}
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        disabled={isLoading}
        className="hidden"
        onChange={handleChange}
      />
      {user.profileImage && (
        <button
          disabled={isLoading}
          className={`px-4 py-2 text-gray-100 rounded-md bg-rose-600 `}
        >
          {isLoading ? <Loader /> : '삭제'}
        </button>
      )}
    </form>
  );
}
