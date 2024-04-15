'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiPencilSimpleLine } from 'react-icons/pi';

export default function WriteButton() {
  const path = usePathname();
  const category = path.split('/')[2];

  return (
    <div className="fixed bottom-10 right-5 text-2xl text-white rounded-full bg-gray-800">
      <Link href={`/write/${category}`} className="block w-full h-full p-2">
        <PiPencilSimpleLine />
      </Link>
    </div>
  );
}
