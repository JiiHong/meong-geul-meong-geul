import Link from 'next/link';
import { navbarList } from './Navbar';

export default function DesktopMenu() {
  return (
    <div className="flex items-center gap-6 lg:hidden">
      <ul className="flex items-center gap-4">
        {navbarList.map(({ title, path }) => (
          <li
            key={crypto.randomUUID()}
            className="text-lg text-gray-400 font-bold transition-all hover:-translate-y-1 hover:text-gray-700"
          >
            <Link href={path} className="px-4 py-3">
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <button className="py-2 text-lg text-white font-bold rounded-3xl bg-gray-800 transition-all hover:-translate-y-1 hover:bg-gray-900 hover:brightness-120">
        <Link href="/login" className="px-4 py-3">
          로그인
        </Link>
      </button>
    </div>
  );
}
