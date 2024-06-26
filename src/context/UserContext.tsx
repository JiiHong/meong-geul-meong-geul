'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useSession } from 'next-auth/react';
import { UserSession } from '@/types/user';

type User = UserSession | null;

type ContextProps = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
});

export function UserContextProvider({ children }: Props) {
  const { data } = useSession();
  const [user, setUser] = useState<User>(null);

  useEffect(() => setUser(data ? data.user : null), [data]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
