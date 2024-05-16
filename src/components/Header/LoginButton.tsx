import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="px-4 py-2 text-base text-white font-bold rounded-3xl bg-gray-800 transition-all hover:-translate-y-1 hover:bg-gray-900 hover:brightness-120"
    >
      로그인
    </Link>
  );
}
