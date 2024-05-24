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
} from '@/service/firebase/firebase-firestore';
import UserImage from '@/components/ui/UserImage';
import Loader from '@/components/ui/Loader';

type Props = { user: UserSession };

export default function ImageForm({ user }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      setIsLoading((prev) => !prev);
      uploadProfileImage(files[0], user.email)
        .then((url) =>
          updateUser(user.uid, 'profileImage', url) //
            .then((url) =>
              fetchPostsFromUid('free', user.uid) //
                .then(() =>
                  updateAllCategoryPost(user.uid, 'userImage', 'update', url),
                ),
            ),
        )
        .then(() => {
          setIsLoading((prev) => !prev);
          window.alert('이미지가 변경되었습니다. 🙌');
          router.refresh();
        });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteProfileImageUrl(user.uid)
      .then(router.refresh) //
      .then(() => {
        fetchPostsFromUid('free', user.uid) //
          .then(() => updateAllCategoryPost(user.uid, 'userImage', 'delete'));
      });
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
