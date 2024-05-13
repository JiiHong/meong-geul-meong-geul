import { notFound } from 'next/navigation';
import WriteForm from '@/components/Board/WriteForm';
import { BoardCategory } from '@/types/board';

type Props = {
  params: {
    category: BoardCategory;
  };
};

const categorys = ['free', 'info', 'question'];

export default function WritePage({ params: { category } }: Props) {
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
