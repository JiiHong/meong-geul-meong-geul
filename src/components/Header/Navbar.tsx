import { getServerSession } from 'next-auth';
import { authOptions } from '@/next-auth/options';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import LoginButton from './LoginButton';
import UserProfileImage from './UserProfileImage';

type NavbarList = {
  title: string;
  path: string;
};

export const navbarList: NavbarList[] = [
  { title: '정보게시판', path: '/board/info' },
  { title: '질문게시판', path: '/board/question' },
  { title: '자유게시판', path: '/board/free' },
];

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex gap-4">
      <DesktopMenu />
      <MobileMenu />
      {session ? (
        <UserProfileImage
          session={session}
          name={session.user.name}
          image={session.user.profileImage}
        />
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}
