// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DecodedIdToken } from 'firebase-admin/auth';

declare module 'firebase-admin/auth' {
  interface DecodedIdToken {
    name: string;
  }
}
