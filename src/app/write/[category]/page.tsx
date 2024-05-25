import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import { BoardCategory } from '@/types/Post';
import { authOptions } from '@/next-auth/options';
import WriteForm from '@/components/Board/write/WriteForm';

type Props = {
  params: {
    category: BoardCategory;
  };
};

const categorys = ['free', 'info', 'question'];

export default async function WritePage({ params: { category } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) redirect(`/board/${category}`);
  if (!categorys.includes(category)) return notFound();

  return (
    <section>
      <WriteForm category={category} />
    </section>
  );
}

export function generateStaticParams() {
  return categorys.map((category) => ({ category }));
}
