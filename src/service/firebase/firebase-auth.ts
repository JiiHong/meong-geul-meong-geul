import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { app } from './firebase-config';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth(app);

export async function login() {
  return signInWithPopup(auth, provider).catch(console.error);
}

export function onUserStateChange(callback: (user: User) => void) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      return callback(user);
    }
    return null;
  });
}
