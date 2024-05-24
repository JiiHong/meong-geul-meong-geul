import { authOptions } from '@/next-auth/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ImageFieldset from '@/components/my/info/ImageFieldset';
import NicknameFieldset from '@/components/my/info/NicknameFieldset';

export default async function InfoPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  return (
    <section className="space-y-10">
      <ImageFieldset />
      <NicknameFieldset user={session.user} />
    </section>
  );
}
