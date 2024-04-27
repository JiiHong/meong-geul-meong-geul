'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import { navbarList } from './Navbar';
import LoginButton from './LoginButton';
import UserLoginImage from './UserLoginImage';
import { ClipLoader } from 'react-spinners';

type Props = {
  onClick?: () => void;
  className: { ul: string; li?: string; buttonStyle?: string };
};

export default function Menu({ onClick, className }: Props) {
  const pathname = usePathname();
  const { loginState } = useUserContext();

  return (
    <ul className={className.ul}>
      {navbarList.map(({ title, path }) => (
        <li
          key={crypto.randomUUID()}
          className={`text-lg font-bold transition-all hover:-translate-y-1 hover:text-gray-700 ${className.li} ${path === pathname ? 'text-gray-700' : 'text-gray-400'}`}
        >
          <Link href={path} className="px-4 py-3" onClick={onClick}>
            {title}
          </Link>
        </li>
      ))}
      <li className={className.buttonStyle}>
        {loginState === 'loading' && <ClipLoader color="#F9C175" size={25} />}
        {loginState === 'logout' && <LoginButton onClick={onClick} />}
        {loginState === 'login' && <UserLoginImage />}
      </li>
    </ul>
  );
}
