'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import {
  fetchUserFromName,
  updateUser,
} from '@/service/firebase/firebase-firestore';
import Modal from './Modal';

import { signOut } from 'next-auth/react';
import { validateNickname } from '@/utils/validate';
import { useRouter } from 'next/navigation';
import { useModalContext } from '@/context/ModalContext';

type Props = { uid: string };

export default function SignupModal({ uid }: Props) {
  const [text, setText] = useState('');
  const { toggleSingupOpen } = useModalContext();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(' ')) return;
    setText(value);
  };

  const handleClick = () => signOut().then(toggleSingupOpen);

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await fetchUserFromName(text);

    if (user)
      return window.alert(
        '이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요. 😓',
      );

    if (!validateNickname(text))
      return window.alert('닉네임을 다시 입력해주세요. 🥺');

    const confirm = window.confirm('가입하시겠습니까?');
    if (!confirm) return;
    updateUser(uid, 'name', text);
    router.refresh();
  };

  return (
    <Modal onClick={handleClick}>
      <form
        className="grow flex flex-col justify-center gap-28 w-4/6"
        onSubmit={handleSumbit}
      >
        <div>
          <input
            type="text"
            value={text}
            placeholder="닉네임"
            minLength={2}
            maxLength={8}
            className="w-full px-4 py-2 mb-2 text-lg border rounded-lg"
            onChange={handleChange}
          />
          <p className="text-xs text-blue-800">
            * 특수 문자, 숫자, 띄어쓰기 제외 / 2~8 자리 문자.
          </p>
        </div>
        <button className="px-4 py-2 text-white rounded-lg bg-amber-500">
          가입하기
        </button>
      </form>
    </Modal>
  );
}
