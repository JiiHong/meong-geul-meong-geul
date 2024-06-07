import { Session } from 'next-auth';
import Menu from '../Menu';

type Props = { session: Session | null };

export default function DesktopMenu({ session }: Props) {
  return (
    <Menu
      session={session}
      className={{ ul: 'flex items-center gap-4 md:hidden' }}
    />
  );
}
