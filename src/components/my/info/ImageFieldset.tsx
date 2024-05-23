import { getServerSession } from 'next-auth';
import { authOptions } from '@/next-auth/options';
import ImageForm from './ImageForm';
import { notFound } from 'next/navigation';

export default async function ImageFieldset() {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  return (
    <fieldset className="space-y-4">
      <legend className="text-gray-800 font-bold">프로필 이미지</legend>
      <ImageForm user={session.user} />
    </fieldset>
  );
}
