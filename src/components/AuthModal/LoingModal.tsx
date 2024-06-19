import GoogleLoginButton from '@/components/AuthModal/GoogleLoginButton';
import Modal from './Modal';
import ModalPortal from '../ModalPortal';

type Props = { onClick: () => void };

export default function LoginModal({ onClick }: Props) {
  return (
    <ModalPortal>
      <Modal onClick={onClick}>
        <div className="flex justify-center items-center grow">
          <GoogleLoginButton />
        </div>
      </Modal>
    </ModalPortal>
  );
}
