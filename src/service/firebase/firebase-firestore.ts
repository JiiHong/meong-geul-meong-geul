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
  where,
  deleteField,
  FieldValue,
  arrayRemove,
} from 'firebase/firestore';
import { app } from './firebase-config';
import { User } from '@/types/user';
import { Post, BoardCategory } from '@/types/Post';
import { Comment } from '@/types/comment';

const db = getFirestore(app);

export async function isAdmin(email: string) {
  const querySnapshot = await getDocs(collection(db, 'admins'));
  if (!querySnapshot.empty) {
    const docs = querySnapshot.docs;
    const admins = docs.map((doc) => doc.data() as Pick<User, 'email'>);
    const isAdmin = admins.some((admin) => admin.email === email);
    return isAdmin;
  }
  return false;
}

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

export async function fetchUserFromEmail(email: string) {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docs = querySnapshot.docs;
    const User = docs.map((doc) => doc.data() as User);

    return User;
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

export async function updateUser(
  uid: string,
  key: keyof User,
  value: string | FieldValue,
) {
  const ref = doc(db, 'users', uid);
  return updateDoc(ref, {
    [key]: value,
  }).then(() => (typeof value === 'string' ? value : ''));
}

export async function deleteProfileImageUrl(uid: string) {
  const ref = doc(db, 'users', uid);
  return updateDoc(ref, {
    profileImage: deleteField(),
  });
}

export async function uploadPost(
  uid: string,
  id: string,
  category: BoardCategory,
  post: Post,
) {
  return setDoc(doc(db, `${category}Boards`, id), post) //
    .then(() => updateUser(uid, 'myPosts', arrayUnion(id)));
}

export async function fetchPosts(category: string) {
  const q = query(
    collection(db, `${category}Boards`),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docs = querySnapshot.docs;
    const posts = docs.map((doc) => doc.data() as Post);

    return posts;
  }
  return [];
}

export async function fetchPostsFromUid(category: BoardCategory, uid: string) {
  const q = query(
    collection(db, `${category}Boards`),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docs = querySnapshot.docs;
    const posts = docs.map((doc) => doc.data() as Post);

    return posts;
  }
  return [];
}

export async function fetchPostsFromPostId(
  category: BoardCategory,
  postId: string,
) {
  const q = query(
    collection(db, `${category}Boards`),
    where('id', '==', postId),
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docs = querySnapshot.docs;
    const posts = docs.map((doc) => doc.data() as Post);

    return posts;
  }
  return [];
}

export async function fetchMyPagePosts(
  uid: string,
  type: 'recommendPosts' | 'commentPosts' | 'myPosts',
) {
  const user = await fetchUserFromUid(uid);

  if (!user) return [];

  const postIdList = user[type];

  const fetchPromises = postIdList.map(async (id) => {
    const result = await Promise.all([
      fetchPostsFromPostId('free', id),
      fetchPostsFromPostId('info', id),
      fetchPostsFromPostId('question', id),
    ]);
    const post = result.flat();

    return post[0];
  });

  const posts = await Promise.all(fetchPromises);
  posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return posts;
}

async function updatePost(
  category: BoardCategory,
  id: string,
  key: keyof Post,
  value: string,
) {
  const ref = doc(db, `${category}Boards`, id);

  await updateDoc(ref, {
    [key]: value,
  });
}

async function deletePostKey(
  category: BoardCategory,
  id: string,
  key: keyof Post,
) {
  const ref = doc(db, `${category}Boards`, id);

  await updateDoc(ref, {
    [key]: deleteField(),
  });
}

export async function updateAllCategoryPost(
  uid: string,
  key: keyof Post,
  method: 'update' | 'delete',
  value?: string,
) {
  const posts = await Promise.all([
    fetchPostsFromUid('free', uid),
    fetchPostsFromUid('info', uid),
    fetchPostsFromUid('question', uid),
  ]).catch(console.error);

  if (posts) {
    const flatedPosts = posts.flat();

    await Promise.all(
      flatedPosts.map(({ id, category }) =>
        method === 'update'
          ? updatePost(category, id, key, value ?? '')
          : deletePostKey(category, id, key),
      ),
    ).catch(console.error);
  }
}

export async function fetchPost(category: BoardCategory, id: string) {
  const docRef = doc(db, `${category}Boards`, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const post = docSnap.data() as Post;
    return post;
  }
  return null;
}

export async function deletePost(
  category: BoardCategory,
  uid: string,
  postId: string,
) {
  const promiseList = [
    deleteDoc(doc(db, `${category}Boards`, postId)),
    updateUser(uid, 'myPosts', arrayRemove(postId)),
    removeRecommendOrCommentPostId(postId, 'recommendPosts'),
    removeRecommendOrCommentPostId(postId, 'commentPosts'),
  ];
  await Promise.all(promiseList).catch(console.log);
}

export async function removeRecommendOrCommentPostId(
  postId: string,
  key: 'recommendPosts' | 'commentPosts',
) {
  const q = query(
    collection(db, 'users'),
    where(key, 'array-contains', postId),
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docs = querySnapshot.docs;
    const users = docs.map((doc) => doc.data() as User);

    users.forEach(async (user) => {
      const ref = doc(db, 'users', user.uid);
      await updateDoc(ref, {
        [key]: user[key].filter((post) => post !== postId),
      });
    });
  }
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
  uid: string,
  postId: string,
  commentId: string,
  category: BoardCategory,
  comment: Comment,
) {
  return setDoc(
    doc(db, `${category}Boards`, postId, 'comments', commentId),
    comment,
  ).then(() => uploadCommentPostId(uid, postId));
}

export async function uploadCommentPostId(uid: string, postId: string) {
  const ref = doc(db, 'users', uid);
  return updateDoc(ref, { commentPosts: arrayUnion(postId) });
}

export async function updateCommentCount(
  postId: string,
  category: BoardCategory,
  count: number,
) {
  const ref = doc(db, `${category}Boards`, postId);

  await updateDoc(ref, {
    commentCount: increment(count),
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
