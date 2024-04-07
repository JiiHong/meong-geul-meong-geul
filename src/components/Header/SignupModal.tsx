import Modal from './Modal';

export default function SignupModal() {
  return (
    <Modal>
      <form className="grow flex flex-col justify-center items-center gap-12">
        <input
          type="text"
          placeholder="닉네임"
          className="px-4 py-2 text-lg border rounded-lg -translate-y-10"
        />
        <button className="px-4 py-2 text-white rounded-lg bg-amber-500">
          가입하기
        </button>
      </form>
    </Modal>
  );
}
