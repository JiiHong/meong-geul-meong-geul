'use client';

import CloseButton from '@/components/Header/CloseButton';

type Props = {
  children: React.ReactNode;
  backCount: number;
};

export default function Modal({ children, backCount }: Props) {
  const handleClick = () => window.history.go(-backCount);

  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen bg-[#00000066]">
      <div className="flex flex-col items-center w-3/5 min-w-72 max-w-xl h-3/5 rounded-2xl bg-white">
        <CloseButton onClick={handleClick} />
        <p className="text-3xl font-bold tracking-widest">멍글멍글</p>
        {children}
      </div>
    </div>
  );
}
