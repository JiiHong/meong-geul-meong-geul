import Image from 'next/image';
import { defaultUserImage } from '@/constants/image';

type Props = {
  title: string;
  userImage?: string;
};

export default function UserImage({ title, userImage }: Props) {
  return (
    <Image
      src={userImage ?? defaultUserImage}
      alt={title}
      width={25}
      height={25}
      className="rounded-full"
    />
  );
}
