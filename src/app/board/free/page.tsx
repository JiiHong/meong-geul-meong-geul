import { headers } from 'next/headers';
import WriteButton from '@/components/Board/WriteButton';
import Posts from '@/components/Board/Posts';

export default async function FreeBoardPage() {
  const headersList = headers();
  const path = headersList.get('x-pathname') || '';
  const category = path.split('/')[2];

  return (
    <section>
      <Posts />
      <WriteButton />
    </section>
  );
}
