// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from 'firebase/auth';

declare module 'firebase/auth' {
  interface User {
    displayName: string;
    photoURL: string;
  }
}
