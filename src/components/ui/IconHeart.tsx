import { IoIosHeartEmpty } from 'react-icons/io';

type Props = { className: string };

export default function IconHeart({ className }: Props) {
  return <IoIosHeartEmpty className={`text-red-500 ${className}`} />;
}
