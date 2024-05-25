import { UserSession } from '@/types/user';
import ImageForm from './ImageForm';

type Props = { user: UserSession };

export default async function ImageFieldset({ user }: Props) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-gray-800 font-bold">프로필 이미지</legend>
      <ImageForm user={user} />
    </fieldset>
  );
}
