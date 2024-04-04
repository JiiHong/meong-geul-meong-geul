import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from './firebase-config';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth(app);

export async function login() {
  return signInWithPopup(auth, provider).catch(console.error);
}

export async function logout() {
  return signOut(auth).catch(console.error);
}

export function onUserStateChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, async (user) => {
    callback(user);
  });
}
