'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { onUserStateChange } from '@/service/firebase/firebase-auth';
import { User } from '@/types/user';

export type LoginState = 'loading' | 'login' | 'logout';

type ContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loginState: LoginState;
  setLoginState: Dispatch<SetStateAction<LoginState>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  loginState: 'loading',
  setLoginState: () => {},
  token: '',
  setToken: () => {},
});

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loginState, setLoginState] = useState<LoginState>('loading');
  const [token, setToken] = useState('');

  useEffect(() => onUserStateChange(setUser, setLoginState), []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loginState, setLoginState, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
