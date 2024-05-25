'use client';

import { createContext, useContext, useState } from 'react';

type ContextProps = {
  loginOpen: boolean;
  signupOpen: boolean;
  toggleLoginOpen: () => void;
  toggleSingupOpen: () => void;
};
type Props = { children: React.ReactNode };

const ModalContext = createContext<ContextProps>({
  loginOpen: false,
  signupOpen: false,
  toggleLoginOpen: () => {},
  toggleSingupOpen: () => {},
});

export function ModalContextProvider({ children }: Props) {
  const [loginOpen, setIsOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const toggleLoginOpen = () => setIsOpen((prev) => !prev);
  const toggleSingupOpen = () => setSignupOpen((prev) => !prev);

  return (
    <ModalContext.Provider
      value={{ loginOpen, signupOpen, toggleLoginOpen, toggleSingupOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}
