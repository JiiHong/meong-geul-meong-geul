import { ChangeEvent } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  file: File | null;
};

export default function CustomFileInput({ onChange, file }: Props) {
  return (
    <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
      <label
        htmlFor="file"
        className="px-3 py-1 text-2xl text-white  bg-gray-600 cursor-pointer"
      >
        <MdOutlineAddPhotoAlternate />
      </label>
      <input
        type="file"
        name="file"
        id="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      <p className="text-sm text-gray-700">{file && file.name}</p>
    </div>
  );
}
