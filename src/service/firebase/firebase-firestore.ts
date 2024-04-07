import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from './firebase-config';

const db = getFirestore(app);

type FetchUser = {
  name: string;
  uid: string;
  picture?: string;
};

export async function fetchUsers(): Promise<FetchUser[]> {
  const querySnapshot = await getDocs(collection(db, 'users'));
  if (!querySnapshot.empty) {
    const docs = querySnapshot.docs;
    const users = docs.map((doc) => doc.data() as FetchUser);

    return users;
  }
  return [];
}

export async function fetchUser(uid: string) {
  const users = await fetchUsers();
  const user = users.find((user) => user.uid === uid);

  return user ? user : null;
}
