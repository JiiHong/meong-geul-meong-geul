import { ChangeEvent } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFileNull: () => void;
  file: File | null;
};

export default function CustomFileInput({
  onChange,
  setFileNull,
  file,
}: Props) {
  return (
    <div className="flex items-center border rounded-lg overflow-hidden">
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
      <div className="flex justify-between items-center w-full px-2">
        <p className="text-sm text-gray-700 truncate">{file && file.name}</p>
        {file && (
          <button
            type="button"
            className="text-lg text-red-700"
            onClick={setFileNull}
          >
            x
          </button>
        )}
      </div>
    </div>
  );
}
