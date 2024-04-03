'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onUserStateChange } from '@/service/firebase/firebase-auth';

type ContextProps = {
  user: User | null;
};
type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<ContextProps>({ user: null });

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => onUserStateChange(setUser), []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
