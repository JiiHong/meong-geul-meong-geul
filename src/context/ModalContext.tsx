'use client';

import { createContext, useContext, useState } from 'react';

type ContextProps = {
  isOpen: boolean;
  toggleModal: () => void;
};
type Props = { children: React.ReactNode };

const ModalContext = createContext<ContextProps>({
  isOpen: false,
  toggleModal: () => {},
});

export function ModalContextProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <ModalContext.Provider value={{ isOpen, toggleModal: toggleOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}
