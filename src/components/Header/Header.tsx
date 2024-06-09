import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import { authOptions } from '@/next-auth/options';
import logo from '../../../public/logo.png';
import Menu from './Menu';
import MobileMenu from './mobile/MobileMenu';

export default async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;

  return (
    <header className="sticky top-0 left-0 flex justify-between items-center w-full max-w-5xl h-10 lg:px-6 px-12 lg:py-7 py-8 shadow-base rounded-full bg-white z-20">
      <Link href="/">
        <Image
          src={logo}
          alt="멍글멍글"
          width={130}
          height={35}
          priority
          className="sm:w-24 md:w-28"
        ></Image>
      </Link>
      <nav className="md:hidden flex gap-4">
        <Menu user={user} />
      </nav>
      <div className="hidden md:flex">
        <MobileMenu user={user} />
      </div>
    </header>
  );
}
