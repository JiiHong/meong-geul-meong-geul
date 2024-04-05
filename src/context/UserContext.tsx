'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { onUserStateChange } from '@/service/firebase/firebase-auth';
import { DecodedIdToken } from 'firebase-admin/auth';

export type LoginState = 'loading' | 'login' | 'logout';

type ContextProps = {
  user: DecodedIdToken | null;
  loginState: LoginState;
};

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<ContextProps>({
  user: null,
  loginState: 'loading',
});

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<DecodedIdToken | null>(null);
  const [loginState, setLoginState] = useState<LoginState>('loading');

  useEffect(() => onUserStateChange(setUser, setLoginState), []);

  return (
    <UserContext.Provider value={{ user, loginState }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
