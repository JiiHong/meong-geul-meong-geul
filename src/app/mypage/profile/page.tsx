import { Metadata } from 'next';
import { authOptions } from '@/next-auth/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ImageFieldset from '@/components/my/info/ImageFieldset';
import NicknameFieldset from '@/components/my/info/NicknameFieldset';

export const metadata: Metadata = {
  title: '내 정보',
  description: '프로필 사진, 닉네임',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  return (
    <section className="space-y-10">
      <ImageFieldset user={session.user} />
      <NicknameFieldset user={session.user} />
    </section>
  );
}
