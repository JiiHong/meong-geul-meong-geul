'use client';

import { useParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useUserContext } from '@/context/UserContext';
import Modal from './Modal';
import { setCookie } from '@/service/firebase/firebase-auth';

type Params = { slug: string };

export default function SignupModal() {
  const { slug: uid } = useParams<Params>();
  const id = uuid();
  const [name, setName] = useState('');
  const { setUser, setLoginState, token, setToken } = useUserContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCookie(token);
    setUser({ id, uid, name, createdAt: Date.now() });
    setLoginState('login');
    setToken('');
    window.history.go(-2);
  };

  return (
    <Modal>
      <form
        className="grow flex flex-col justify-center items-center gap-12"
        onSubmit={handleSumbit}
      >
        <input
          type="text"
          placeholder="닉네임"
          className="px-4 py-2 text-lg border rounded-lg -translate-y-10"
          onChange={handleChange}
        />
        <button className="px-4 py-2 text-white rounded-lg bg-amber-500">
          가입하기
        </button>
      </form>
    </Modal>
  );
}
