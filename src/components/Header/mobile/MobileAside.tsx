import { Session } from 'next-auth';
import Menu from '../Menu';
import CloseButton from '../CloseButton';

type Props = {
  session: Session | null;
  isOpenMenu: boolean;
  onClick: () => void;
};

export default function MobileAside({ session, isOpenMenu, onClick }: Props) {
  return (
    <div
      className={`fixed top-0 right-0 flex flex-col w-80 h-full bg-white transition-all duration-500 ${isOpenMenu ? 'visible' : 'invisible translate-x-full'}`}
    >
      <CloseButton onClick={onClick} />
      <Menu
        session={session}
        className={{
          ul: 'flex flex-col p-8 space-y-6',
          li: 'pb-1 border-b border-gray-200',
        }}
        onClick={onClick}
      />
    </div>
  );
}
