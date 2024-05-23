import { useMemo } from 'react';
import Image from 'next/image';
import { defaultUserImage } from '@/constants/image';

type Size = 'small' | 'medium' | 'big';

type Props = {
  title: string;
  size?: Size;
  userImage?: string;
};

export default function UserImage({ title, size = 'small', userImage }: Props) {
  const containerSize = useMemo(() => translateContainerSize(size), [size]);
  const imageSize = useMemo(() => translateImageSize(size), [size]);

  return (
    <div
      className={`flex justify-center items-center shrink-0 border rounded-full overflow-hidden ${containerSize}`}
    >
      <Image
        src={userImage ?? defaultUserImage}
        alt={title}
        width={imageSize}
        height={imageSize}
        priority
        className="w-full h-full"
      />
    </div>
  );
}

function translateContainerSize(size: Size) {
  switch (size) {
    case 'small':
      return 'w-[25px] h-[25px]';
    case 'medium':
      return 'w-[45px] h-[45px]';
    case 'big':
      return 'w-[100px] h-[100px]';
    default:
      return 'w-[25px] h-[25px]';
  }
}

function translateImageSize(size: Size) {
  switch (size) {
    case 'small':
      return 25;
    case 'medium':
      return 45;
    case 'big':
      return 100;
    default:
      return 25;
  }
}
