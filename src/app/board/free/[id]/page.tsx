import { headers } from 'next/headers';
import { fetchPost } from '@/service/firebase/firebase-firestore';
import { BoardCategory } from '@/types/board';
import UserImage from '@/components/UserImage';
import { formateFullTime } from '@/utils/day';
import Image from 'next/image';

export default async function FreeBoardDetailPage() {
  const headersList = headers();
  const path = (headersList.get('x-pathname') || '').split('/');
  const category = path[2] as BoardCategory;
  const id = path[3];
  const {
    title,
    name,
    content,
    viewCount,
    createdAt,
    userImage,
    contentImage,
  } = await fetchPost(category, id);

  return (
    <main className="pt-8">
      <section className="flex flex-col items-center p-8 rounded-3xl bg-white">
        <div className="w-4/5">
          <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
          <div className="flex items-center gap-4 pb-3 border-b">
            <UserImage title={name} userImage={userImage} size={40} />
            <div className="flex flex-col -space-y-2">
              <span className="text-lg">{name}</span>
              <div className="space-x-4">
                <span className="text-sm text-gray-400">
                  {formateFullTime(createdAt)}
                </span>
                <span className="text-sm text-gray-400">
                  조회수 {viewCount}
                </span>
              </div>
            </div>
          </div>
          <p className="py-6 text-xl break-words">{content}</p>
          {contentImage && (
            <Image src={contentImage} alt={title} width={450} height={450} />
          )}
        </div>
      </section>
    </main>
  );
}
