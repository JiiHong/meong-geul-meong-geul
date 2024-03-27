import { IoMenu } from 'react-icons/io5';

export default function MobileMenu() {
  return (
    <div className="hidden lg:flex">
      <button className="text-3xl">
        <IoMenu />
      </button>
    </div>
  );
}
