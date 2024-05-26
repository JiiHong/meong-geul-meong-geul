'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const lists = [
  { title: '내 정보', path: 'info' },
  { title: '내가 쓴 글', path: 'myposts' },
  { title: '추천한 글', path: 'recommended' },
  { title: '댓글 단 글', path: 'commented' },
];

export default function MyPageNavbar() {
  const splitedPath = usePathname().split('/')[2];

  return (
    <ul className="flex flex-col md:flex-row">
      {lists.map(({ title, path }, index) => (
        <li
          key={index}
          className={`px-3 py-2 font-semibold hover:text-amber-500 ${path === splitedPath ? 'text-amber-500' : 'text-gray-600'}`}
        >
          <Link href={path} className="block">
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
