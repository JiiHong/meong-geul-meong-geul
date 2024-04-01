import Menu from './Menu';
import CloseButton from './CloseButton';

type Props = {
  isOpenMenu: boolean;
  onClick: () => void;
};

export default function MobileAside({ isOpenMenu, onClick }: Props) {
  return (
    <div
      className={`fixed top-0 right-0 flex flex-col w-80 h-full bg-white transition-all duration-500 ${isOpenMenu ? 'visible' : 'invisible translate-x-full'}`}
    >
      <CloseButton onClick={onClick} />
      <Menu
        className={{
          ul: 'flex flex-col p-8 space-y-6',
          li: 'pb-1 border-b border-gray-200',
          buttonStyle: 'self-center',
        }}
        onClick={onClick}
      />
    </div>
  );
}
