import { User } from './user';

declare module 'next-auth' {
  interface Session {
    user: Pick<User, 'uid' | 'email' | 'name' | 'profileImage'>;
  }
}
