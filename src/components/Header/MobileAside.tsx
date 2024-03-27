import { IoCloseOutline } from 'react-icons/io5';
import Link from 'next/link';
import { navbarList } from './Navbar';

type Props = {
  isOpenMenu: boolean;
  onClick: () => void;
};

export default function MobileAside({ isOpenMenu, onClick }: Props) {
  return (
    <div
      className={`fixed top-0 right-0 flex flex-col w-80 h-full bg-white transition-all duration-500 ${isOpenMenu ? 'visible' : 'invisible translate-x-full'}`}
    >
      <button
        className="self-end m-2 text-gray-600 rounded-full hover:bg-gray-200"
        onClick={onClick}
      >
        <IoCloseOutline className="w-10 h-10" />
      </button>
      <ul className="p-8 space-y-6">
        {navbarList.map(({ title, path }) => (
          <li
            key={crypto.randomUUID()}
            className="pb-1 text-lg text-gray-400 font-bold border-b border-gray-200 transition-all hover:-translate-y-1 hover:text-gray-700"
          >
            <Link href={path} onClick={onClick}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className="py-2 text-base text-white font-bold rounded-3xl bg-gray-800 transition-all hover:-translate-y-1 hover:bg-gray-900 hover:brightness-120 self-center"
        onClick={onClick}
      >
        <Link href="/login" className="px-4 py-3">
          로그인
        </Link>
      </button>
    </div>
  );
}
