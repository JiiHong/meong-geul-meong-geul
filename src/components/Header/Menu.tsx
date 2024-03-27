import Link from 'next/link';
import { navbarList } from './Navbar';

type Props = {
  onClick?: () => void;
  className: { ul: string; li?: string };
};

export default function Menu({ onClick, className }: Props) {
  return (
    <ul className={className.ul}>
      {navbarList.map(({ title, path }) => (
        <li
          key={crypto.randomUUID()}
          className={`text-lg text-gray-400 font-bold transition-all hover:-translate-y-1 hover:text-gray-700 ${className.li}`}
        >
          <Link href={path} className="px-4 py-3" onClick={onClick}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
