'use client';

import { useParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useUserContext } from '@/context/UserContext';
import Modal from './Modal';
import { setCookie } from '@/service/firebase/firebase-auth';
import {
  fetchUserFromName,
  sendUser,
} from '@/service/firebase/firebase-firestore';

type Params = { slug: string };

export default function SignupModal() {
  const { slug: uid } = useParams<Params>();
  const id = uuid();
  const [name, setName] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const { setUser, setLoginState, token, setToken } = useUserContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUserFromName(name).then((user) => {
      if (user) {
        setIsDuplicate(true);
        setTimeout(() => setIsDuplicate(false), 2000);
        return;
      }

      const newUser = { id, uid, name, createdAt: Date.now() };
      sendUser(id, newUser) //
        .then(() => {
          setCookie(token);
          setUser(newUser);
          setLoginState('login');
          setToken('');
          window.history.go(-2);
        });
    });
  };

  return (
    <Modal>
      <form
        className="grow flex flex-col justify-center gap-28 w-4/6"
        onSubmit={handleSumbit}
      >
        <div className="">
          <input
            type="text"
            placeholder="닉네임"
            className="w-full px-4 py-2 text-lg border rounded-lg"
            onChange={handleChange}
          />
          {isDuplicate && (
            <p className="text-xs text-red-500">
              * 이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.
            </p>
          )}
        </div>
        <button className="px-4 py-2 text-white rounded-lg bg-amber-500">
          가입하기
        </button>
      </form>
    </Modal>
  );
}
