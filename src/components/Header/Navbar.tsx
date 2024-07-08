'use client';

import { UserSession } from '@/types/user';
import { useModalContext } from '@/context/ModalContext';
import Menu from './Menu';
import MobileMenu from './mobile/MobileMenu';
import LoginModal from '../AuthModal/LoingModal';

type Props = {
  user: UserSession | null;
};

export default function Navbar({ user }: Props) {
  const { loginOpen } = useModalContext();

  return (
    <>
      <nav className="md:hidden flex gap-4">
        <Menu user={user} />
      </nav>
      <div className="hidden md:flex">
        <MobileMenu user={user} />
      </div>
      {loginOpen && <LoginModal />}
    </>
  );
}
