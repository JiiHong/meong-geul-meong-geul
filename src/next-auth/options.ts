import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { v4 as uuid } from 'uuid';
import { auth } from '@/service/firebase/firebase-auth';
import {
  fetchUserFromEmail,
  fetchUserFromUid,
  sendUser,
} from '@/service/firebase/firebase-firestore';
import { User } from '@/types/user';
import { createTime } from '@/utils/day';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const googleCredential = GoogleAuthProvider.credential(account?.id_token);
      const userCredential = await signInWithCredential(auth, googleCredential);
      const uid = userCredential.user.uid;
      const email = userCredential.user.email ?? '';
      const fetchedUser = await fetchUserFromUid(uid);

      if (!fetchedUser) {
        const user: User = {
          id: uuid(),
          uid,
          email,
          recommendPosts: [],
          commentPosts: [],
          myPosts: [],
          createdAt: createTime(),
        };

        await sendUser(uid, user);
      }

      return true;
    },
    async session({ session }) {
      const user = session.user;

      const fetchedUser = await fetchUserFromEmail(user?.email ?? '');

      if (fetchedUser) {
        const { uid, email, name, profileImage } = fetchedUser[0];
        session.user = {
          uid,
          email,
          name,
          profileImage,
        };
      }

      return session;
    },
  },
};
