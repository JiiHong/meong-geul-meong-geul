import {
  collection,
  getDocs,
  getFirestore,
  doc,
  setDoc,
  query,
  orderBy,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  increment,
} from 'firebase/firestore';
import { app } from './firebase-config';
import { User } from '@/types/user';
import { Board, BoardCategory } from '@/types/board';
import { Comment } from '@/types/comment';

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
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as User;
  }
  return null;
}

export async function fetchUserFromName(name: string) {
  const users = await fetchUsers();
  return users.find((user) => user.name === name);
}

export async function sendUser(uid: string, user: User) {
  return setDoc(doc(db, 'users', uid), user);
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

export async function fetchPost(category: BoardCategory, id: string) {
  const docRef = doc(db, `${category}Boards`, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const post = docSnap.data() as Board;
    return post;
  }
  throw new Error('존재하지 않는 글입니다.');
}

export async function deletePost(category: BoardCategory, id: string) {
  await deleteDoc(doc(db, `${category}Boards`, id));
}

export async function fetchRecommendPostsId(uid: string) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { recommendPosts } = docSnap.data() as User;
    return recommendPosts;
  }
  return [];
}

export async function uploadRecommendPostId(uid: string, postId: string) {
  const ref = doc(db, 'users', uid);
  return updateDoc(ref, { recommendPosts: arrayUnion(postId) });
}

export async function increaseRecommendCount(
  postId: string,
  category: BoardCategory,
  recommendCount: number,
) {
  const ref = doc(db, `${category}Boards`, postId);

  await updateDoc(ref, {
    recommendCount: recommendCount + 1,
  });
}

export async function increaseViewCount(
  postId: string,
  category: BoardCategory,
  viewCount: number,
) {
  const ref = doc(db, `${category}Boards`, postId);

  await updateDoc(ref, {
    viewCount: viewCount + 1,
  });
}

export async function uploadComment(
  postId: string,
  commentId: string,
  category: BoardCategory,
  comment: Comment,
) {
  return setDoc(
    doc(db, `${category}Boards`, postId, 'comments', commentId),
    comment,
  );
}

export async function increaseCommentCount(
  postId: string,
  category: BoardCategory,
) {
  const ref = doc(db, `${category}Boards`, postId);

  await updateDoc(ref, {
    commentCount: increment(1),
  });
}

export async function fetchComments(postId: string, category: BoardCategory) {
  const q = query(
    collection(db, `${category}Boards`, postId, 'comments'),
    orderBy('createdAt', 'asc'),
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docs = querySnapshot.docs;
    const comments = docs.map((doc) => doc.data() as Comment);

    return comments;
  }
  return [];
}

export async function deleteComment(
  postId: string,
  id: string,
  category: BoardCategory,
) {
  await deleteDoc(doc(db, `${category}Boards`, postId, 'comments', id));
}
