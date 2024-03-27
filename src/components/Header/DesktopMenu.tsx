import LoginButton from './LoginButton';
import Menu from './Menu';

export default function DesktopMenu() {
  return (
    <div className="flex items-center gap-6 lg:hidden">
      <Menu className={{ ul: 'flex items-center gap-4' }} />
      <LoginButton />
    </div>
  );
}
