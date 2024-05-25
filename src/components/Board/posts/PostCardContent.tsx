import Image from 'next/image';
import { Post } from '@/types/Post';

type Props = Pick<Post, 'title' | 'content' | 'contentImage'>;

export default function PostCardContent({
  title,
  content,
  contentImage,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5 h-full">
      <p className="px-2 pt-3 text-sm font-semibold truncate">{title}</p>
      <div className="relative w-full h-full pb-4 max-h-32 border-b">
        {contentImage ? (
          <Image
            src={contentImage}
            alt={title}
            fill
            sizes="(max-width: 639px) 45vw, (max-width: 767) 25vw, 20vw"
            className="object-contain"
          />
        ) : (
          <p className="px-2 h-full text-xs break-all line-clamp-[7]">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}
