'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { onUserStateChange } from '@/service/firebase/firebase-auth';
import { DecodedIdToken } from 'firebase-admin/auth';

type ContextProps = {
  user: DecodedIdToken | null;
};
type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<ContextProps>({ user: null });

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<DecodedIdToken | null>(null);

  useEffect(() => onUserStateChange(setUser), []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
