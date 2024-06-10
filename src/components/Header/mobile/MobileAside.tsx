import { UserSession } from '@/types/user';
import Menu from '../Menu';
import CloseButton from '../CloseButton';

type Props = {
  user: UserSession | null;
  isOpenMenu: boolean;
  onClick: () => void;
};

export default function MobileAside({ user, isOpenMenu, onClick }: Props) {
  return (
    <div
      className={`fixed top-0 right-0 flex flex-col w-80 h-full bg-white transition-all duration-500 ${isOpenMenu ? 'visible' : 'invisible translate-x-full'}`}
    >
      <CloseButton onClick={onClick} />
      <Menu user={user} onClick={onClick} />
    </div>
  );
}
