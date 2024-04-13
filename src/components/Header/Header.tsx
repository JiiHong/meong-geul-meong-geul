import Link from 'next/link';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="sticky top-0 left-0 flex justify-center items-center w-full h-10 px-12 py-8 shadow-base rounded-full bg-white z-10 lg:px-6 lg:py-7">
      <div className="flex justify-between items-center w-full max-w-5xl">
        <Link href="/" className="text-3xl font-bold">
          {/* TODO: 로고 변경 */}
          멍글멍글
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
