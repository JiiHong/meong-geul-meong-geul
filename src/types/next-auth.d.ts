import { UserSession } from './user';

declare module 'next-auth' {
  interface Session {
    user: UserSession & { isAdmin: boolean };
  }
}
