import Link from 'next/link';

type NavbarList = {
  title: string;
  path: string;
};

const navbarList: NavbarList[] = [
  { title: '정보게시판', path: '/board/info' },
  { title: '질문게시판', path: '/board/question' },
  { title: '자유게시판', path: '/board/free' },
];

export default function Navbar() {
  return (
    <nav className="flex items-center gap-6">
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
    </nav>
  );
}
