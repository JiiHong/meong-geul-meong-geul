import {
  collection,
  getDocs,
  getFirestore,
  doc,
  setDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { app } from './firebase-config';
import { User } from '@/types/user';
import { Board, BoardCategory } from '@/types/board';

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

export async function fetchUserFromUid(uid: string) {
  const users = await fetchUsers();
  const user = users.find((user) => user.uid === uid);

  return user ? user : null;
}

export async function fetchUserFromName(name: string) {
  const users = await fetchUsers();
  return users.find((user) => user.name === name);
}

export async function sendUser(id: string, user: User) {
  return setDoc(doc(db, 'users', id), user);
}

export async function uploadPost(
  id: string,
  category: BoardCategory,
  post: Board,
) {
  return setDoc(doc(db, `${category}Boards`, id), post);
}

export async function fetchPosts(category: string) {
  const q = query(
    collection(db, `${category}Boards`),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docs = querySnapshot.docs;
    const posts = docs.map((doc) => doc.data() as Board);

    return posts;
  }
  return [];
}
