import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  if (typeof window === 'undefined') return null;

  const node = document.getElementById('modal') as Element;

  return createPortal(children, node);
}
