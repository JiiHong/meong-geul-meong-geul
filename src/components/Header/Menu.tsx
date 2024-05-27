'use client';

import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModalContext } from '@/context/ModalContext';
import { navbarList } from './Navbar';
import UserProfileImage from './UserProfileImage';
import LoginButton from './LoginButton';
import LoginModal from '../AuthModal/LoingModal';

type Props = {
  session: Session | null;
  onClick?: () => void;
  className: { ul: string; li?: string };
};

export default function Menu({ session, onClick, className }: Props) {
  const pathname = usePathname();
  const { loginOpen, toggleLoginOpen } = useModalContext();

  return (
    <>
      <ul className={className.ul}>
        {navbarList.map(({ title, path }) => (
          <li
            key={title}
            className={`text-lg font-bold transition-all hover:-translate-y-1 hover:text-gray-700 ${className.li} ${path === pathname ? 'text-gray-700' : 'text-gray-400'}`}
          >
            <Link href={path} className="px-4 py-3" onClick={onClick}>
              {title}
            </Link>
          </li>
        ))}
        <li className="md:self-center">
          {session ? (
            <UserProfileImage
              session={session}
              name={session.user.name}
              image={session.user.profileImage}
            />
          ) : (
            <LoginButton />
          )}
        </li>
      </ul>
      {loginOpen && <LoginModal onClick={toggleLoginOpen} />}
    </>
  );
}
