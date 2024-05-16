import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import LoginButton from './LoginButton';

type NavbarList = {
  title: string;
  path: string;
};

export const navbarList: NavbarList[] = [
  { title: '정보게시판', path: '/board/info' },
  { title: '질문게시판', path: '/board/question' },
  { title: '자유게시판', path: '/board/free' },
];

export default function Navbar() {
  return (
    <nav className="flex gap-4">
      <DesktopMenu />
      <MobileMenu />
      <LoginButton />
      {/* {loginState === 'login' && <UserLoginImage />} */}
    </nav>
  );
}
