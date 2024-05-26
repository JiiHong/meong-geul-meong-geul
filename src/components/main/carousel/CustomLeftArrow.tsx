/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoIosArrowBack } from 'react-icons/io';

export default function CustomLeftArrow({ onClick }: any) {
  return (
    <button className="arrow left" onClick={onClick}>
      <IoIosArrowBack className="text-4xl" />
    </button>
  );
}
