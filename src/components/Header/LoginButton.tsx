import Link from 'next/link';

type Props = {
  onClick?: () => void;
};

export default function LoginButton({ onClick }: Props) {
  return (
    <button
      className="py-2 text-base text-white font-bold rounded-3xl bg-gray-800 transition-all hover:-translate-y-1 hover:bg-gray-900 hover:brightness-120 self-center"
      onClick={onClick}
    >
      <Link href="/login" className="px-4 py-3">
        로그인
      </Link>
    </button>
  );
}
