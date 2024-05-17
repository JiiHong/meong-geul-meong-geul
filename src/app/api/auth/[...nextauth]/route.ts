import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '@/service/firebase/firebase-auth';

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

      return userCredential ? true : false;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
