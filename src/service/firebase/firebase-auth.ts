import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { app } from './firebase-config';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth(app);
