import { LiaCommentDotsSolid } from 'react-icons/lia';

type Props = { className: string };

export default function IconComment({ className }: Props) {
  return <LiaCommentDotsSolid className={`${className}`} />;
}
