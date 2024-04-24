import WriteForm from '@/components/Board/WriteForm';
import { BoardCategory } from '@/types/board';

type Props = {
  params: {
    category: BoardCategory;
  };
};

export default function WritePage({ params: { category } }: Props) {
  return (
    <section>
      <WriteForm category={category} />
    </section>
  );
}

export function generateStaticParams() {
  const categorys = ['free', 'info', 'question'];
  return categorys.map((category) => ({ category }));
}
