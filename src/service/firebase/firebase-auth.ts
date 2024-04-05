import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from './firebase-config';
import { DecodedIdToken } from 'firebase-admin/auth';
import { LoginState } from '@/context/UserContext';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth(app);

export async function login() {
  return signInWithPopup(auth, provider).catch(console.error);
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
  setUser: (user: DecodedIdToken | null) => void,
  setLoginState: (state: LoginState) => void,
) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setLoginState('logout');
      setUser(null);
      return;
    }

    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
    })
      .then((res) => res.json())
      .then((decodedToken) => {
        setUser(decodedToken);
        setLoginState('login');
      });
  });
}
