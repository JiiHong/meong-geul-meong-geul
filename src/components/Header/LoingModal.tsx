import GoogleLoginButton from '@/components/Header/GoogleLoginButton';
import Modal from './Modal';

export default function LoginModal() {
  return (
    <Modal backCount={1}>
      <div className="flex justify-center items-center grow">
        <GoogleLoginButton />
      </div>
    </Modal>
  );
}
