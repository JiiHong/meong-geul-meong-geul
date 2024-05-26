/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoIosArrowForward } from 'react-icons/io';

export default function CustomRightArrow({ onClick }: any) {
  return (
    <button className="arrow right" onClick={onClick}>
      <IoIosArrowForward className="text-4xl" />
    </button>
  );
}
