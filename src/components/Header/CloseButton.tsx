import { IoCloseOutline } from 'react-icons/io5';

type Props = {
  onClick: () => void;
};

export default function CloseButton({ onClick }: Props) {
  return (
    <button
      className="self-end m-2 text-gray-600 rounded-full hover:bg-gray-200"
      onClick={onClick}
    >
      <IoCloseOutline className="w-10 h-10" />
    </button>
  );
}
