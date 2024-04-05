'use client';

import { logout } from '@/service/firebase/firebase-auth';

type Props = {
  isActive: boolean;
};

export default function UserDropdown({ isActive }: Props) {
  const handleClick = () => logout();

  return (
    <ul
      className={`absolute top-16 left-1/2 -translate-x-1/2 p-4 break-keep border bg-gray-50 shadow-lg rounded-lg after:absolute after:left-1/2 after:-top-[0.54rem] after:-translate-x-1/2 after:rotate-45 after:w-4 after:h-4 after:border-t after:border-l after:bg-gray-50 after:rounded-sm after:shadow-2xl [&_li]:px-4 [&_li]:py-1 [&_li]:text-sm [&_li]:text-gray-700 [&_li]:font-bold [&_li]:rounded-lg
    ${isActive ? 'flex flex-col items-center gap-4 ' : 'hidden'}`}
    >
      <li className="hover:bg-gray-400">마이페이지</li>
      <li className="hover:bg-gray-400 cursor-pointer" onClick={handleClick}>
        로그아웃
      </li>
    </ul>
  );
}
