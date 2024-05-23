import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { app } from './firebase-config';

const storage = getStorage(app);

export async function uploadBoardImage(file: File, category: string) {
  const id = uuid();
  const storageRef = ref(storage, `board/${category}/${id}`);
  return uploadBytes(storageRef, file) //
    .then((snapshot) => getDownloadURL(snapshot.ref));
}

export async function uploadProfileImage(file: File, email: string) {
  const id = uuid();
  const storageRef = ref(storage, `users/${email}/${id}`);
  return uploadBytes(storageRef, file) //
    .then((snapshot) => getDownloadURL(snapshot.ref));
}
