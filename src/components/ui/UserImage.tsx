import Image from 'next/image';
import { defaultUserImage } from '@/constants/image';

type Props = {
  title: string;
  size?: number;
  userImage?: string;
};

export default function UserImage({ title, size, userImage }: Props) {
  return (
    <Image
      src={userImage ?? defaultUserImage}
      alt={title}
      width={size ?? 25}
      height={size ?? 25}
      className="rounded-full"
    />
  );
}
