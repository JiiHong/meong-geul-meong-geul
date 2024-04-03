import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from './firebase-config';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth(app);

export async function login() {
  return signInWithPopup(auth, provider).catch(console.error);
}
