import GoogleLoginButton from '@/components/AuthModal/GoogleLoginButton';
import Modal from './Modal';
import ModalPortal from './ModalPortal';
import { useModalContext } from '@/context/ModalContext';

export default function LoginModal() {
  const { toggleLoginOpen } = useModalContext();

  return (
    <ModalPortal>
      <Modal onClick={toggleLoginOpen}>
        <div className="flex justify-center items-center grow">
          <GoogleLoginButton />
        </div>
      </Modal>
    </ModalPortal>
  );
}
