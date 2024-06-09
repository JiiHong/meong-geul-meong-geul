'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserSession } from '@/types/user';
import { useModalContext } from '@/context/ModalContext';
import UserProfileImage from './UserProfileImage';
import LoginButton from './LoginButton';
import LoginModal from '../AuthModal/LoingModal';

type Props = {
  user: UserSession | null;
  onClick?: () => void;
};

type NavbarList = {
  title: string;
  path: string;
};

const navbarList: NavbarList[] = [
  { title: '정보게시판', path: '/board/info' },
  { title: '질문게시판', path: '/board/question' },
  { title: '자유게시판', path: '/board/free' },
];

export default function Menu({ user, onClick }: Props) {
  const pathname = usePathname();
  const { loginOpen, toggleLoginOpen } = useModalContext();

  return (
    <>
      <ul className="flex md:flex-col md:items-stretch items-center md:gap-0 gap-4 md:p-8 md:space-y-6">
        {navbarList.map(({ title, path }) => (
          <li
            key={title}
            className={`md:pb-1 text-lg font-bold md:border-b md:border-gray-200  hover:text-amber-500 ${pathname.includes(path.split('/')[2]) ? 'text-amber-500' : 'text-gray-700'}`}
          >
            <Link href={path} className="px-4 py-3" onClick={onClick}>
              {title}
            </Link>
          </li>
        ))}
        <li className="md:self-center">
          {user ? (
            <UserProfileImage
              user={user}
              name={user.name}
              image={user.profileImage}
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
