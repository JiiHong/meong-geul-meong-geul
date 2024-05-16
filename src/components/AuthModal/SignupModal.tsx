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
import { User } from '@/types/user';
import { createTime } from '@/utils/day';

type Params = { slug: string };

export default function SignupModal() {
  const { slug: uid } = useParams<Params>();
  const id = uuid();
  const [name, setName] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { setUser, setLoginState, token, setToken } = useUserContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes(' ')) return;
    setName(value);
  };

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUserFromName(name).then((user) => {
      if (user) {
        setIsDuplicate(true);
        setTimeout(() => setIsDuplicate(false), 2000);
        return;
      }

      const isValid = name.match(/^[가-힣a-zA-Z]+$/g);
      if (!isValid || name.length < 2) {
        setIsValid(false);
        return;
      }

      const newUser: User = {
        id,
        uid,
        name,
        createdAt: createTime(),
        recommendPosts: [],
        commentPosts: [],
      };
      sendUser(uid, newUser) //
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
    <Modal backCount={2}>
      <form
        className="grow flex flex-col justify-center gap-28 w-4/6"
        onSubmit={handleSumbit}
      >
        <div>
          <input
            type="text"
            value={name}
            placeholder="닉네임"
            minLength={2}
            maxLength={8}
            className="w-full px-4 py-2 mb-2 text-lg border rounded-lg"
            onChange={handleChange}
          />
          <p
            className={`text-xs ${isValid ? 'text-blue-800' : 'text-red-500'}`}
          >
            * 특수 문자, 숫자, 띄어쓰기 제외 / 2~8 자리 문자.
          </p>
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
