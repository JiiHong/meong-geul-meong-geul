import {
  collection,
  getDocs,
  getFirestore,
  doc,
  setDoc,
} from 'firebase/firestore';
import { app } from './firebase-config';
import { User } from '@/types/user';

const db = getFirestore(app);

export async function fetchUsers(): Promise<User[]> {
  const querySnapshot = await getDocs(collection(db, 'users'));
  if (!querySnapshot.empty) {
    const docs = querySnapshot.docs;
    const users = docs.map((doc) => doc.data() as User);

    return users;
  }
  return [];
}

export async function fetchUser(uid: string) {
  const users = await fetchUsers();
  const user = users.find((user) => user.uid === uid);

  return user ? user : null;
}

export async function sendUser(id: string, user: User) {
  return setDoc(doc(db, 'users', id), user);
}

export async function fetchUserFromName(name: string) {
  const users = await fetchUsers();
  return users.find((user) => user.name === name);
}
