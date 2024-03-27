'use client';

import Link from 'next/link';
import { navbarList } from './Navbar';
import { usePathname } from 'next/navigation';

type Props = {
  onClick?: () => void;
  className: { ul: string; li?: string };
};

export default function Menu({ onClick, className }: Props) {
  const pathname = usePathname();

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
    </ul>
  );
}