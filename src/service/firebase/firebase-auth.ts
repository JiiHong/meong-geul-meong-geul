import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from './firebase-config';
import { DecodedIdToken } from 'firebase-admin/auth';

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
  callback: (user: DecodedIdToken | null) => void,
) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return callback(null);

    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
    })
      .then((res) => res.json())
      .then(callback);
  });
}
