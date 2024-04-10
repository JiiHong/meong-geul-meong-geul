import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from './firebase-config';
import { LoginState } from '@/context/UserContext';
import { fetchUser } from './firebase-firestore';
import { Dispatch, SetStateAction } from 'react';
import { User } from '@/types/user';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth(app);

export async function login() {
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      const uid = user.uid;
      const userInfo = await fetchUser(uid);
      const token = await user.getIdToken();

      if (!userInfo) {
        return { uid };
      }

      setCookie(token);
    })
    .catch(console.error);
}

export async function logout() {
  return signOut(auth)
    .then(() =>
      fetch('/api/auth/logout', {
        method: 'POST',
      }),
    )
    .catch(console.error);
}

export function onUserStateChange(
  setUser: Dispatch<SetStateAction<User | null>>,
  setLoginState: (state: LoginState) => void,
) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setLoginState('logout');
      setUser(null);
      return;
    }

    const userInfo = await fetchUser(user.uid);

    if (user && !userInfo) setLoginState('logout');

    if (userInfo) {
      setUser(userInfo);
      setLoginState('login');
    }
  });
}

export async function setCookie(token: string) {
  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
