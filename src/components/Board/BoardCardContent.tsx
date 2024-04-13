import Image from 'next/image';
import { Board } from '@/types/board';

type Props = Pick<Board, 'title' | 'content' | 'contentImage'>;

export default function BoardCardContent({
  title,
  content,
  contentImage,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5 h-full">
      <p className="px-2 mt-2 text-sm font-semibold">{title}</p>
      <div className="relative w-full h-full mb-4">
        {contentImage ? (
          <Image
            src={contentImage}
            alt={title}
            fill
            sizes="(max-width: 639px) 45vw, (max-width: 767) 25vw, 20vw"
          />
        ) : (
          <p className="px-2 h-full text-xs break-words">{content}</p>
        )}
      </div>
    </div>
  );
}
