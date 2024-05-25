'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserSession } from '@/types/user';
import {
  fetchUserFromName,
  updateAllCategoryPost,
  updateUser,
} from '@/service/firebase/firebase-firestore';
import Loader from '@/components/ui/Loader';
import { validateNickname } from '@/utils/validate';

type Props = { user: UserSession };

export default function NicknameForm({ user }: Props) {
  const { uid, name } = user;
  const [text, setText] = useState(name ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isNameEqual = name === text;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(' ')) return;
    setText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateNickname(text))
      return window.alert('닉네임을 다시 입력해주세요. 🥺');

    const user = await fetchUserFromName(text);
    if (user) return window.alert('이미 존재하는 닉네임입니다. 😓');

    setIsLoading((prev) => !prev);
    await Promise.all([
      updateUser(uid, 'name', text),
      updateAllCategoryPost(uid, 'name', 'update', text),
    ]).catch(console.error);
    setIsLoading((prev) => !prev);
    window.alert('닉네임이 변경되었습니다. 🙌');
    router.refresh();
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
      <p className="text-xs text-blue-800">
        * 특수 문자, 숫자, 띄어쓰기 제외 / 2~8 자리 문자.
      </p>
      <div className="flex md:flex-col gap-4">
        <input
          type="text"
          value={text}
          maxLength={8}
          placeholder="닉네임을 입력하세요."
          className="px-4 py-2 border-0 rounded-md text-gray-900 ring-1 ring-inset ring-gray-300 outline-amber-500 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
          onChange={handleChange}
        />
        <button
          disabled={isLoading || isNameEqual}
          className={`px-4 py-2 text-gray-100 rounded-md bg-gray-700 ${isNameEqual ? 'brightness-75' : ''}`}
        >
          {isLoading ? <Loader /> : '닉네임 변경'}
        </button>
      </div>
    </form>
  );
}
