import { auth } from 'firebase-admin';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { customInitApp } from '@/service/firebase/firebase-admin-config';

customInitApp();

export async function POST() {
  const authorization = headers().get('Authorization');

  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    const expiresIn = 1000 * 60 * 60 * 24 * 5;
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    });

    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    cookies().set(options);

    return NextResponse.json(decodedToken);
  }
}
