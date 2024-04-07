import GoogleLoginButton from '@/components/Header/GoogleLoginButton';
import Modal from './Modal';

export default function LoginModal() {
  return (
    <Modal>
      <div className="flex justify-center items-center grow">
        <GoogleLoginButton />
      </div>
    </Modal>
  );
}
