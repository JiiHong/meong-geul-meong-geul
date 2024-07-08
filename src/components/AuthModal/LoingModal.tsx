import GoogleLoginButton from '@/components/AuthModal/GoogleLoginButton';
import Modal from './Modal';
import ModalPortal from './ModalPortal';

export default function LoginModal() {
  return (
    <ModalPortal>
      <Modal>
        <div className="flex justify-center items-center grow">
          <GoogleLoginButton />
        </div>
      </Modal>
    </ModalPortal>
  );
}
