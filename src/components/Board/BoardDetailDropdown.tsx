type Props = { isActive: boolean };

export default function BoardDetailDropdown({ isActive }: Props) {
  return (
    <ul
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-20 py-2 mt-2 border rounded-md shadow-md bg-white ${isActive ? 'flex flex-col items-center gap-2' : 'hidden'}`}
    >
      <li className="text-sm w-full">
        <button className="block w-full py-1 hover:bg-gray-300">삭제</button>
      </li>
    </ul>
  );
}
