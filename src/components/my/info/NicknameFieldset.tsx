import { UserSession } from '@/types/user';
import NicknameForm from './NicknameForm';

type Props = { user: UserSession };

export default function NicknameFieldset({ user }: Props) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-gray-800 font-bold">닉네임</legend>
      <NicknameForm user={user} />
    </fieldset>
  );
}
