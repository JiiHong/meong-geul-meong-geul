export default function Header() {
  return (
    <header className="sticky top-0 left-0 flex justify-center items-center w-full h-10 px-12 py-8 shadow-base rounded-full bg-white">
      <div className="flex justify-between items-center w-full max-w-5xl">
        <a href="/" className="text-3xl font-bold">
          {/* TODO: 로고 변경 */}
          멍글멍글
        </a>
      </div>
    </header>
  );
}
