import { GoThumbsup } from 'react-icons/go';

type Props = { className: string };

export default function IconThumbsup({ className }: Props) {
  return <GoThumbsup className={`${className}`} />;
}
