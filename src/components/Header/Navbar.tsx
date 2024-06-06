import { getServerSession } from 'next-auth';
import { authOptions } from '@/next-auth/options';
import DesktopMenu from './desktop/DesktopMenu';
import MobileMenu from './MobileMenu';

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
      <DesktopMenu session={session} />
      <MobileMenu session={session} />
    </nav>
  );
}
