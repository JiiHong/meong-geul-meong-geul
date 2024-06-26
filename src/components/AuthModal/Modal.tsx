import CloseButton from '@/components/Header/CloseButton';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Modal({ children, onClick }: Props) {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-neutral-900/60 z-50">
      <div className="flex flex-col items-center w-3/5 min-w-72 max-w-xl h-3/5 rounded-2xl bg-white">
        <CloseButton onClick={onClick} />
        <p className="text-3xl font-bold tracking-widest">멍글멍글</p>
        {children}
      </div>
    </div>
  );
}
