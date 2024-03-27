import { IoCloseOutline } from 'react-icons/io5';
import LoginButton from './LoginButton';
import Menu from './Menu';

type Props = {
  isOpenMenu: boolean;
  onClick: () => void;
};

export default function MobileAside({ isOpenMenu, onClick }: Props) {
  return (
    <div
      className={`fixed top-0 right-0 flex flex-col w-80 h-full bg-white transition-all duration-500 ${isOpenMenu ? 'visible' : 'invisible translate-x-full'}`}
    >
      <button
        className="self-end m-2 text-gray-600 rounded-full hover:bg-gray-200"
        onClick={onClick}
      >
        <IoCloseOutline className="w-10 h-10" />
      </button>
      <Menu
        className={{ ul: 'p-8 space-y-6', li: 'pb-1 border-b border-gray-200' }}
        onClick={onClick}
      />
      <LoginButton onClick={onClick} />
    </div>
  );
}
